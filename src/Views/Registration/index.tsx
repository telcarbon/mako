import { createContext, useState } from 'react'
import axios from 'axios'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SideNav } from 'components'
import { BankingInfo } from './components/BankingInfo'
import { BusinessInfo } from './components/BusinessInfo'
import { BusinessQuestionnaire } from './components/BusinessQuestionnaire'
import { BusinessRepInfo } from './components/BusinessRepInfo'
import { RegistrationNav } from './components/NavBar/RegistrationNav'
import { TermsAndAgreement } from './components/TermsAndAgreement'
import { RegistrationSuccess } from './components/RegistrationSuccess'
import {
	IBankDetailsInfo,
	IBusinessInfo,
	IBusinessRepInfo,
	IQuestionnareInfo,
	ITermsInfo,
} from './types'
import { camelToUnderscore, convertQs } from 'common/Util'

export const Registration = () => {
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
	const [bankingInfo, setBankingInfo] = useState<IBankDetailsInfo>()
	const [businessQs, setBusinessQs] = useState<IQuestionnareInfo>({
		plebotomy: null,
		licensed: null,
		phlebotomist: [{ phlebotomistName: '' }],
		trainExistingStaff: null,
		offerClia: null,
		isCliaWaivedSite: null,
		hasParkingLot: null,
		offerPrescription: null,
	})
	const [termsInfo, setTermsInfo] = useState<ITermsInfo>()
	const [currentStep, setCurrentStep] = useState<Number>(0)

	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Token d5a100a2099c66cd2060fd3951bad9db82e1704f',
	}

	const handleChangeStep = (value: any) => {
		if (value > currentStep) {
			setCurrentStep(value)
		}
	}

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

			// const newPartner = {
			// 	...businessInfo,
			// 	phoneNumber: `+1${businessInfo?.phoneNumber}`,
			// }

			const convertedQuestionnaire = convertQs(businessQs)

			const params = {
				partner: camelToUnderscore(businessInfo),
				business_representative: camelToUnderscore(personalInfo),
				auth_credentials: camelToUnderscore(credentials),
				bank_details: {
					stripe_response: {},
					...camelToUnderscore(bankingInfo),
				},
				questionnaires: convertedQuestionnaire,
				// terms: camelToUnderscore(termsInfo),
			}

			axios
				.post('http://localhost:8000/api/registration/', params, {
					headers,
				})
				.then((response) => {
					console.log(response, ' response')
				})
		}
	}

	return (
		<>
			{/* <button onClick={() => handleSubmit()}>test</button> */}
			<SideNav
				className={
					!location.pathname.includes('success') ? 'bg-primary' : ''
				}
			>
				{!location.pathname.includes('success') && (
					<RegistrationNav currentStep={currentStep} />
				)}
			</SideNav>
			<Routes>
				<Route
					path={'/'}
					element={
						<BusinessInfo
							businessInfo={businessInfo}
							setBusinessInfo={setBusinessInfo}
							setCurrentStep={handleChangeStep}
						/>
					}
				/>
				<Route
					path={'/busines-rep-info'}
					element={
						<BusinessRepInfo
							businessRepInfo={businessRepInfo}
							setBusinessRepInfo={setBusinessRepInfo}
							setCurrentStep={handleChangeStep}
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
						/>
					}
				/>
				<Route
					path={'/terms'}
					element={
						<TermsAndAgreement
							onSubmit={handleSubmit}
							termsInfo={termsInfo}
							setTermsInfo={setTermsInfo}
						/>
					}
				/>
				<Route
					path={'/success'}
					element={
						<RegistrationSuccess email={businessInfo?.email} />
					}
				/>
			</Routes>
		</>
	)
}
