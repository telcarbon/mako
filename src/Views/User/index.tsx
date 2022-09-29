import { Route, Routes } from 'react-router-dom'
import setBodyClass from 'common/Util'
import { SideNav } from 'components'
import { ForgotPassword } from './ForgotPassword'
import { Login } from './Login'
import { ResetPassword } from './ResetPassword'
import { ResetPasswordSuccess } from './ResetPasswordSuccess'
import { VerifyEmail } from './VerifyEmail'

export const User = () => {
	setBodyClass(['full-width'])
	return (
		<>
			<SideNav
				className={`fixed-top bg-lg-primary`}
				hasContactInfo
				hasRegisterLink
			/>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/verify-email" element={<VerifyEmail />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route
					path="/reset-password-success"
					element={<ResetPasswordSuccess />}
				/>
			</Routes>
		</>
	)
}
