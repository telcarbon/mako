import { createContext, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SideNav } from 'components'
import { BankingInfo } from './components/BankingInfo'
import { BusinessInfo } from './components/BusinessInfo'
import { BusinessQuestionnaire } from './components/BusinessQuestionnaire'
import { BusinessRepInfo } from './components/BusinessRepInfo'
import { RegistrationNav } from './components/NavBar/RegistrationNav'
import { TermsAndAgreement } from './components/TermsAndAgreement'
import { RegistrationSuccess } from './components/RegistrationSuccess'
import { IBusinessInfo } from './types'

export const Registration = () => {
	const location = useLocation()
	const [businessInfo, setBusinessInfo] = useState<IBusinessInfo>()

	return (
		<>
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
					element={<BusinessRepInfo />}
				/>
				<Route path={'/banking-info'} element={<BankingInfo />} />
				<Route
					path={'/business-questionnaire'}
					element={<BusinessQuestionnaire />}
				/>
				<Route path={'/terms'} element={<TermsAndAgreement />} />
				<Route path={'/success'} element={<RegistrationSuccess />} />
			</Routes>
		</>
	)
}
