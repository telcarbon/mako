import { UserContext } from 'App'
import setBodyClass, { formatDate } from 'common/Util'
import { SideNav } from 'components'
import React, { createContext, useContext, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { NotFound } from 'Views/NotFound'
import { Appointment } from './Appointment'
import { ConfirmAppointment } from './Confirm'
import { BookingDetails } from './Details'
import { SelectBranch } from './SelectBranch'
import { SelectTime } from './SelectTime'
import { IAppointment, IBranch } from './types'

interface BookingContextProps {
	appointmentInfo: any
	setAppointmentInfo: any
	selectBranchInfo: any
	setSelectBranchInfo: any
	headers: any
}

export const BookingContext = createContext<BookingContextProps>({
	appointmentInfo: null,
	setAppointmentInfo: () => {},
	selectBranchInfo: null,
	setSelectBranchInfo: () => {},
	headers: null,
})

export const Booking = () => {
	const { accessToken } = useContext(UserContext)

	console.log(accessToken === '', 'test')

	// if (accessToken === '') {
	// 	console.log('sample')
	// 	return <NotFound />
	// 	navigate('/error-404')
	// }

	const [appointmentInfo, setAppointmentInfo] = useState<IAppointment>({
		state: 'North Carolina',
		city: '',
		service: 0,
	})

	const [selectBranchInfo, setSelectBranchInfo] = useState<IBranch>({
		branch: 0,
	})
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken}`,
	}
	const [bookingDate, setbookingDate] = useState<any>(null) // yyyy-mm-dd
	return (
		<>
			<button
				onClick={() => {
					console.log(appointmentInfo)
				}}
			>
				test
			</button>
			<SideNav className="fixed-left bg-primary" />
			<BookingContext.Provider
				value={{
					appointmentInfo,
					setAppointmentInfo,
					selectBranchInfo,
					setSelectBranchInfo,
					headers,
				}}
			>
				<Routes>
					<Route path="/" element={<Appointment />} />
					<Route path="/select-branch" element={<SelectBranch />} />
					<Route
						path="/select-time"
						element={
							<SelectTime
								bookingDate={bookingDate}
								setbookingDate={setbookingDate}
							/>
						}
					/>
					<Route
						path="/confirm-appointment"
						element={<ConfirmAppointment />}
					/>
					<Route path="/details" element={<BookingDetails />} />
				</Routes>
			</BookingContext.Provider>
		</>
	)
}
