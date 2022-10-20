import { useState } from 'react'
import axios from 'axios'
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom'
import { SideNav } from 'components'
import { BankingInfo } from './components/BankingInfo'
import { BusinessInfo } from './components/BusinessInfo'
import { BusinessQuestionnaire } from './components/BusinessQuestionnaire'
import { BusinessRepInfo } from './components/BusinessRepInfo'
import { RegistrationNav } from './components/NavBar/RegistrationNav'
import { TermsAndAgreement } from './components/TermsAndAgreement'
import { RegistrationResult } from './components/RegistrationResult'
import {
	IBankDetailsInfo,
	IBusinessInfo,
	IBusinessRepInfo,
	IQuestionnareInfo,
	ITermsInfo,
} from './types'
import { convertFieldsToSnakeCase, convertQs } from 'common/Util'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { API_URL, STRIPE_PK, TOKEN } from 'shared/config'

export const Registration = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [businessRepInfo, setBusinessRepInfo] = useState<IBusinessRepInfo>()
	const [businessInfo, setBusinessInfo] = useState<IBusinessInfo>({
		name: '',
		type: 0,
		street: '',
		unitFloorBuilding: '',
		email: '',
		phoneNumber: '',
		city: '',
		state: '',
		zipCode: '',
		country: 'US',
		npi: '',
		ncpdp: '',
	})
	const [bankingInfo, setBankingInfo] = useState<IBankDetailsInfo>({
		bankName: '',
		bankAccountType: '',
		accountName: '',
		accountNumber: '',
		abaRoutingNumber: '',
	})
	const [businessQs, setBusinessQs] = useState<IQuestionnareInfo>({
		plebotomy: null,
		licensed: null,
		phlebotomist: [{ phlebotomistName: '' }],
		trainExistingStaff: null,
		offerClia: null,
		isCliaWaivedSite: null,
		hasParkingLot: null,
		offerPrescription: null,
		cliaCertification: [],
		hasPublicBathroom: null,
	})
	const [termsInfo, setTermsInfo] = useState<ITermsInfo>()
	const [stripeToken, setStripeToken] = useState<string>('')
	const [currentStep, setCurrentStep] = useState<Number>(0)
	const [isSuccess, setIsSuccess] = useState<any>('')
	const [apiErrorMsg, setApiErrorMsg] = useState<string>('')

	const headers = {
		'Content-Type': 'multipart/data',
		Authorization: `Token ${TOKEN}`,
	}

	const handleChangeStep = (value: any) => {
		if (value > currentStep) {
			setCurrentStep(value)
		}
	}

	const stripePromise = loadStripe(`${STRIPE_PK}`)

	const handleSubmit = () => {
		if (businessInfo && businessRepInfo && businessQs && bankingInfo) {
			const credentials = {
				email: businessRepInfo?.email,
				password: businessRepInfo?.password,
			}

			const personalInfo = {
				lastName: businessRepInfo?.lastName,
				firstName: businessRepInfo?.firstName,
				phoneNumber: businessRepInfo?.phoneNumber,
				salutation: businessRepInfo?.salutation,
				middleName: businessRepInfo?.middleName,
			}

			const convertedQuestionnaire = convertQs(businessQs)

			const params = {
				partner: convertFieldsToSnakeCase(businessInfo),
				business_representative: convertFieldsToSnakeCase(personalInfo),
				auth_credentials: convertFieldsToSnakeCase(credentials),
				bank_details: {
					credit_card_token: stripeToken || null,
					...convertFieldsToSnakeCase(bankingInfo),
				},
				questionnaires: convertedQuestionnaire,
				// terms: camelToUnderscore(termsInfo),
			}

			const formData = new FormData()

			formData.append('data', JSON.stringify(params))
			formData.append(
				'clia_certification',
				businessQs.cliaCertification[0]
			)

			axios
				.post(`${API_URL}/registration/`, formData, {
					headers,
				})
				.then((response) => {
					if (response.status === 201) {
						setIsSuccess(true)
						navigate('/success')
					} else {
						setIsSuccess(false)
						navigate('/error')
					}
				})
				.catch((err) => {
					console.log(err, 'error')
					setIsSuccess(false)
					setApiErrorMsg(err.response.data[0])
					navigate('/error')
				})
		}
	}

	console.log('currentStep', currentStep)

	return (
		<>
			<Elements stripe={stripePromise}>
				<SideNav
					className={
						!location.pathname.includes('success') &&
						!location.pathname.includes('error')
							? 'bg-primary fixed-left'
							: 'fixed-top'
					}
				>
					{!location.pathname.includes('success') &&
						!location.pathname.includes('error') && (
							<RegistrationNav currentStep={currentStep} />
						)}
				</SideNav>
				<Routes>
					<Route
						path="/"
						element={
							<BusinessInfo
								businessInfo={businessInfo}
								setBusinessInfo={setBusinessInfo}
								setCurrentStep={handleChangeStep}
							/>
						}
					/>
					<Route
						path="/busines-rep-info"
						element={
							<BusinessRepInfo
								businessRepInfo={businessRepInfo}
								setBusinessRepInfo={setBusinessRepInfo}
								setCurrentStep={handleChangeStep}
								currentStep={currentStep}
							/>
						}
					/>
					<Route
						path={'/banking-info'}
						element={
							<BankingInfo
								bankingInfo={bankingInfo}
								setBankingInfo={setBankingInfo}
								setCurrentStep={handleChangeStep}
								setStripeToken={setStripeToken}
								stripeToken={stripeToken}
								currentStep={currentStep}
							/>
						}
					/>
					<Route
						path={'/business-questionnaire'}
						element={
							<BusinessQuestionnaire
								businessQs={businessQs}
								setBusinessQs={setBusinessQs}
								setCurrentStep={setCurrentStep}
								currentStep={currentStep}
							/>
						}
					/>
					<Route
						path={'/terms'}
						element={
							<TermsAndAgreement
								onSubmit={handleSubmit}
								setTermsInfo={setTermsInfo}
								setCurrentStep={setCurrentStep}
								currentStep={currentStep}
							/>
						}
					/>
					<Route
						path={'/success'}
						element={
							<RegistrationResult
								email={businessRepInfo?.email}
								success={isSuccess}
								setCurrentStep={setCurrentStep}
							/>
						}
					/>
					<Route
						path={'/error'}
						element={
							<RegistrationResult
								email={businessInfo?.email}
								success={isSuccess}
								errorMsg={apiErrorMsg?.split(':')[1]}
								setCurrentStep={setCurrentStep}
							/>
						}
					/>
					<Route
						path="*"
						element={<Navigate to="/page-not-found" replace />}
					/>
				</Routes>
			</Elements>
		</>
	)
}
