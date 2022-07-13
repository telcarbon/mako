import {
	Route,
	Routes
} from 'react-router-dom'
import { SideNav } from 'components'
import { BankingInfo } from './components/BankingInfo'
import { BusinessInfo } from './components/BusinessInfo'
import { BusinessQuestionnaire } from './components/BusinessQuestionnaire'
import { BusinessRepInfo } from './components/BusinessRepInfo'
import { RegistrationNav } from './components/NavBar/RegistrationNav'
import { TermsAndAgreement } from './components/TermsAndAgreement'

export const Registration = () => {
	return (
		<>
			<SideNav className="bg-primary">
				<RegistrationNav />
			</SideNav>
			<Routes>
				<Route path={'/'} element={<BusinessInfo />} />
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
			</Routes>
		</>
	)
}
