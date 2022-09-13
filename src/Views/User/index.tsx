import { SideNav } from 'components'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { BusinessInfo } from 'Views/Registration/components/BusinessInfo'
import { ForgotPassword } from './ForgotPassword'
import { Login } from './Login'
import { ResetPassword } from './ResetPassword'
import { ResetPasswordSuccess } from './ResetPasswordSuccess'
import { VerifyEmail } from './VerifyEmail'

export const User = () => {
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
				<Route path="/reset-password-success" element={<ResetPasswordSuccess />} />
			</Routes>
		</>
	)
}
