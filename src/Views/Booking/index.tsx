import { SideNav } from 'components'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Appointment } from './Appointment'
import { ConfirmAppointment } from './Confirm'
import { BookingDetails } from './Details'
import { SelectBranch } from './SelectBranch'
import { SelectTime } from './SelectTime'

export const Booking = () => {
	return (
		<>
			<SideNav className="fixed-left bg-primary" />
			<Routes>
				<Route path="/" element={<Appointment />} />
				<Route path="/select-branch" element={<SelectBranch />} />
				<Route path="/select-time" element={<SelectTime />} />
				<Route
					path="/confirm-appointment"
					element={<ConfirmAppointment />}
				/>
				<Route
					path="/details"
					element={<BookingDetails />}
				/>
			</Routes>
		</>
	)
}
