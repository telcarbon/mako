import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import classNames from 'classnames'
import setBodyClass, { formatDate } from 'common/Util'
import {
	Button,
	ContentHeader,
	Form,
	FormField,
	FormRadioGroup,
	FormTextInput,
	LoadingMaskWrap,
	SubmitButton,
} from 'components'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from 'shared/config'
import * as Yup from 'yup'
import { BookingContext } from '..'
import { AppointmentStatus, cancelOptions, IAppointmentDetails } from '../types'

export const CancelAppointment = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const [appointmentDetails, setAppointmentDetails] =
		useState<IAppointmentDetails>()

	const { headers } = useContext(BookingContext)

	setBodyClass(['full-width'])

	const validationSchema = Yup.object().shape({
		reason: Yup.string().required('Please select an option.').nullable(),
		others: Yup.string().when('reason', {
			is: (value: string) => value === 'Other',
			then: Yup.string().required('Please enter a reason.').nullable(),
		}),
	})

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			reason: '',
			others: '',
		},
	})

	const { getValues, register, watch } = useFormInstance

	const isOtherSelected = watch('reason') === 'Other'

	const handleSubmit = async () => {
		const formValues = getValues()

		const params = {
			status: AppointmentStatus.CANCEL,
			notes: isOtherSelected ? formValues.others : formValues.reason,
		}
		setIsLoading(true)
		axios
			.patch(`${API_URL}/appointment/${id}/`, params, {
				headers,
			})
			.then((response) => {
				if (response.data.status === AppointmentStatus.CANCEL) {
					setIsLoading(false)
					navigate('../cancel-appointment-success')
				}
			})
			.catch((err) => {
				console.log(err, 'error')
			})
	}

	const getAppointmentDetails = () => {
		axios
			.get(`${API_URL}/appointment/${id}/`, {
				headers,
			})
			.then((response) => {
				if (response.data) {
					const appointmentData: IAppointmentDetails = {
						status: response?.data?.status,
						scheduled_time: response?.data?.scheduled_time,
						scheduled_date: response?.data?.scheduled_date,
					}

					setAppointmentDetails(appointmentData)
				}
			})
			.catch((err) => {
				console.log(err, 'error')
			})
	}

	useEffect(() => {
		getAppointmentDetails()
	}, [id])

	console.log(appointmentDetails, 'appointment')

	const isCancelled = appointmentDetails?.status === AppointmentStatus.CANCEL

	const hasPassed = () => {
		const today = new Date()
		var todayMoment = formatDate(today)
		const newDt = moment(today).toDate()
		const time = appointmentDetails?.scheduled_time
		const date = appointmentDetails?.scheduled_date

		const datePassed = date!! < todayMoment

		const currentTime = `${newDt
			.getHours()
			.toString()
			.padStart(2, '0')}:${newDt
			.getMinutes()
			.toString()
			.padStart(2, '0')}:00`

		if (datePassed) {
			return datePassed
		} else {
			const timePassed =
				date === todayMoment ? time!! <= currentTime : false

			return timePassed
		}
	}

	return (
		<Container
			fluid
			className={classNames({
				'v-middle': isCancelled || hasPassed(),
				'pt-5 mt-3': !isCancelled && !hasPassed(),
			})}
		>
			{!isCancelled && !hasPassed() ? (
				<>
					<ContentHeader
						title="Cancel your Appointment"
						subtitle="Please select reason for cancellation"
					/>
					<Form
						useFormInstance={useFormInstance}
						onSubmit={handleSubmit}
					>
						<Row className="my-4 justify-content-center ">
							<Col lg={3}>
								<FormField
									name="reason"
									className="mb-0"
									label=""
								>
									{cancelOptions.map((option, index) => (
										<FormRadioGroup
											name={'reason'}
											register={register}
											value={option.label}
											key={index}
											labelClassname="d-flex mb-2"
											className="radio-default me-3 ms-2"
										>
											{option.label}
										</FormRadioGroup>
									))}
								</FormField>
								{isOtherSelected && (
									<FormField
										name="others"
										className="col ms-4 ps-3"
									>
										<FormTextInput
											placeholder="Enter reason"
											name="others"
											register={register}
										/>
									</FormField>
								)}
							</Col>
						</Row>
						<div className="footer center">
							<SubmitButton
								pending={isLoading}
								pendingText="Submitting"
								disabled={isLoading}
							>
								Submit
							</SubmitButton>
						</div>
					</Form>
				</>
			) : isCancelled ? (
				<Row className="justify-content-center align-items-center vh-100">
					<Col lg={6} className="text-center">
						<h3 className="text-center mb-4">
							This appointment is already cancelled
						</h3>
						<p>
							Please book again if you require another appointment
							schedule
						</p>
						<Button className="mt-5" onClick={() => navigate('..')}>
							Back to Booking
						</Button>
					</Col>
				</Row>
			) : (
				<Row className="justify-content-center align-items-center vh-100">
					<Col lg={6} className="text-center">
						<h3 className="text-center mb-4">
							Your appointment time has passed.
						</h3>
						<p>
							You may not cancel your appointment anymore. Please
							book again <br /> if you require another appointment
							schedule.
						</p>
						<Button className="mt-5" onClick={() => navigate('..')}>
							Back to Booking
						</Button>
					</Col>
				</Row>
			)}

			{isLoading && <LoadingMaskWrap />}
		</Container>
	)
}
