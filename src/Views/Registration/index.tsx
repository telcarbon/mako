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
} from './types'
import { camelToUnderscore } from 'common/Util'

export const Registration = () => {
	const location = useLocation()
	const [businessRepInfo, setBusinessRepInfo] = useState<IBusinessRepInfo>()
	const [businessInfo, setBusinessInfo] = useState<IBusinessInfo>()
	const [bankingInfo, setBankingInfo] = useState<IBankDetailsInfo>()
	const [businessQs, setBusinessQs] = useState<IQuestionnareInfo>()

	console.log(camelToUnderscore(businessInfo), 'test')

	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Token 6590266c4ebaac0637ce259f741d462270075c65',
	}

	const handleSubmit = () => {
		if (businessInfo && businessInfo && businessQs && bankingInfo) {
			const credentials = {
				email: businessRepInfo?.email,
				password: businessRepInfo?.password,
			}

			const newPartner = {
				...businessInfo,
				unitFloorBuilding: `${businessInfo?.addressLineOne} ${businessInfo?.addressLineTwo}`,
			}
			delete newPartner.addressLineOne
			delete newPartner.addressLineTwo

			const personalInfo = {
				lastName: businessRepInfo?.lastName,
				firstName: businessRepInfo?.firstName,
				phoneNumber: businessRepInfo?.phoneNumber,
				salutation: businessRepInfo?.salutation,
				middleName: businessRepInfo?.middleName,
			}
			const config = {
				partner: camelToUnderscore(newPartner),
				business_representative: camelToUnderscore(personalInfo),
				auth_credentials: camelToUnderscore(credentials),
				bank_details: {
					stripe_response: {},
					...camelToUnderscore(bankingInfo),
				},
				questionnaires: [
					{
						plebotomy: true,
					},
					{
						licensed: true,
					},
				],
				// partner: {
				// 	street: 'Fortune Drive',
				// 	unit_floor_building: '141 Unit A',
				// 	state: 'PR',
				// 	city: 'Valenzula',
				// 	zip_code: 14400,
				// 	country: 'PH',
				// 	name: 'qweadf',
				// 	email: 'cmqwe@asdfasdf.com',
				// 	phone_number: '+12025550180',
				// 	npi: 1234567890,
				// 	ncpdp: 1234567,
				// 	type: 1,
				// },
				// auth_credentials: {
				// 	email: 'ralph.subrio@doodlepress.com.ph',
				// 	password: 'Letmein12@',
				// },
				// business_representative: {
				// 	first_name: 'Ralph',
				// 	last_name: 'Subrio',
				// 	phone_number: '+12025550180',
				// 	salutation: 'Mr',
				// },
				// bank_details: {
				// 	stripe_response: {},
				// 	bank_name: 'Visa',
				// 	bank_account_type: 'Checking',
				// 	account_name: 'Ralph Christian Subrio',
				// 	account_number: '000123456789',
				// 	aba_routing_number: '110000000',
				// },
				// questionnaires: [
				// 	{
				// 		plebotomy: true,
				// 	},
				// 	{
				// 		licensed: true,
				// 	},
				// ],
				//
			}

			console.log(config, 'config')

			// axios
			// 	.post(
			// 		'http://localhost:8000/api/registration/',

			// 		config,
			// 		{ headers }
			// 	)
			// 	.then((response) => {
			// 		console.log(response, ' response')
			// 	})
		}
	}

	return (
		<>
			<button onClick={() => handleSubmit()}>test</button>
			<SideNav
				className={
					!location.pathname.includes('success') ? 'bg-primary' : ''
				}
			>
				{!location.pathname.includes('success') && <RegistrationNav />}
			</SideNav>
			<Routes>
				<Route
					path={'/'}
					element={
						<BusinessInfo
							businessInfo={businessInfo}
							setBusinessInfo={setBusinessInfo}
						/>
					}
				/>
				<Route
					path={'/busines-rep-info'}
					element={
						<BusinessRepInfo
							businessRepInfo={businessRepInfo}
							setBusinessRepInfo={setBusinessRepInfo}
						/>
					}
				/>
				<Route
					path={'/banking-info'}
					element={
						<BankingInfo
							bankingInfo={bankingInfo}
							setBankingInfo={setBankingInfo}
						/>
					}
				/>
				<Route
					path={'/business-questionnaire'}
					element={
						<BusinessQuestionnaire
							businessQs={businessQs}
							setBusinessQs={setBusinessQs}
						/>
					}
				/>
				<Route path={'/terms'} element={<TermsAndAgreement />} />
				<Route path={'/success'} element={<RegistrationSuccess />} />
			</Routes>
		</>
	)
}
