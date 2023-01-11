import { ContentHeader, SubmitButton } from 'components'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { filterDataNotEqualToId, getMinBookingTime, isEmpty } from 'common/Util'
import { useContext, useEffect, useState } from 'react'
import { BookingContext } from '..'
import axios from 'axios'
import { API_URL } from 'shared/config'
import { slotMockdata } from '../mockData'
import { TimeAccordion } from '../components/TimeAccordion'

export const SelectTime = () => {
	const {
		headers,
		partnerInfo,
		serviceDetail,
		partnerDetail,
		bookingInfo,
		setBookingInfo,
		serviceCounters,
		setServiceCounters,
		appointmentInfo,
		setAppointmentInfo,
	} = useContext(BookingContext)

	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [availableTime, setAvailableTime] = useState<any>()
	const [minBookingTime, setMinBookingTime] = useState<string>()

	const handleSubmit = async () => {
		navigate('../confirm-appointment')
	}

	const getAvailableTimeRequest = () => {
		// FOR MOCK DATA
		// setAvailableTime(slotMockdata)

		setMinBookingTime(getMinBookingTime())
		const partner = partnerInfo.partner
		const service = appointmentInfo.service
		setIsLoading(true)
		axios
			.get(
				`${API_URL}/appointment/get_date/?partner=${partner}&service=${service}&date=${bookingInfo?.bookingDate}`,
				//,
				{
					headers,
				}
			)
			.then((response) => {
				if (!isEmpty(response.data)) {
					setAvailableTime(response.data)
				}
				setTimeout(() => {
					setIsLoading(false)
				}, 250)
			})
			.catch((err) => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		getAvailableTimeRequest()
	}, [bookingInfo.bookingDate])

	const setDate = (id: number, bookingDate: any): void => {
		setBookingInfo(
			bookingInfo.map((m: any) =>
				m.id === id ? { ...m, bookingDate } : m
			)
		)
	}

	const setTime = (id: number, bookingTime: any): void => {
		setBookingInfo(
			bookingInfo.map((m: any) =>
				m.id === id ? { ...m, bookingTime } : m
			)
		)
	}
	const delService = (data: any, serviceId: number): any => {
		const newService = filterDataNotEqualToId(serviceId, serviceCounters)
		const newMulti = appointmentInfo.multiServices.filter(
			(f: any) => f != String(serviceId)
		)
		setAppointmentInfo({ ...appointmentInfo, multiServices: newMulti })
		return newService
	}

	const deleteAppt = (id: number, serviceId: number): void => {
		setBookingInfo(filterDataNotEqualToId(id, bookingInfo))

		setServiceCounters(
			serviceCounters.map((m: any) =>
				m.id === serviceId
					? m.counter === 1
						? { ...delService(m, serviceId) }
						: { ...m, counter: m.counter - 1 }
					: m
			)
		)
	}

	const checkAllBooking = (): boolean => {
		return bookingInfo.some(
			(s: any) => s.bookingDate === null || s.bookingTime === null
		)
	}

	return (
		<Container fluid>
			<ContentHeader
				title="Select Appointment Time"
				backText="Back"
				backLink={-1}
			/>

			{bookingInfo &&
				bookingInfo.map((m: any) => (
					<TimeAccordion
						key={m.id}
						data={m}
						partnerDetail={partnerDetail}
						serviceDetail={serviceDetail}
						availableTime={availableTime}
						isLoading={isLoading}
						setDate={setDate}
						setTime={setTime}
						minBookingTime={minBookingTime}
						setMinBookingTime={setMinBookingTime}
						deleteAppt={deleteAppt}
					/>
				))}

			<div className="footer w-75">
				<SubmitButton
					pending={false}
					pendingText="Saving"
					className="col-lg-auto pull-right"
					onClick={handleSubmit}
					disabled={checkAllBooking()}
					type="button"
				>
					Next
				</SubmitButton>
			</div>
		</Container>
	)
}
