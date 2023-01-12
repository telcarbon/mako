import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDate, getMinBookingTime, getStartAndEndTime } from 'common/Util'
import {
	ContentHeader,
	Form,
	FormCheckBox,
	FormField,
	LoadingMaskWrap,
	SubmitButton,
} from 'components'
import moment from 'moment'
import { useContext, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import 'react-phone-number-input/style.css'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from 'shared/config'
import { BookingContext } from '..'
import { AppointmentDetailsCard } from '../components/AppointmentDetailsCard'

export const ConfirmAppointment = () => {
	const [showBookingTimeError, setShowBookingTimeError] = useState(false)
	const {
		handleSubmitAll,
		serviceDetail,
		partnerDetail,
		bookingTime,
		bookingDate,
		serviceCounters,
	} = useContext(BookingContext)
	const navigate = useNavigate()

	const useFormInstance = useForm({
		defaultValues: {
			termsOfUse: false,
			consentToTreatment: false,
		},
	})

	const {
		getValues,
		register,
		formState: { isSubmitting },
		watch,
	} = useFormInstance

	const checkIfPastTime = () => {
		const today = new Date()
		var todayMoment = formatDate(today)
		const currentTime = getMinBookingTime()

		let hasPassed = false
		if (bookingDate === todayMoment) {
			hasPassed = bookingTime <= currentTime
		}
		setShowBookingTimeError(hasPassed)
		return hasPassed
	}

	const handleSubmit = async () => {
		const formValues = getValues()
		const pastTime = checkIfPastTime()
		if (!pastTime) {
			handleSubmitAll(formValues)
			return new Promise(() => {
				setTimeout(() => {
					navigate('../details')
				}, 2000)
			})
		}
	}

	const allTermsHasFalse = watch([
		'termsOfUse',
		'consentToTreatment',
	]).includes(false)

	return (
		<Container fluid>
			<ContentHeader
				title="Confirm Appointment"
				backText="Back"
				backLink={-1}
			/>
			<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
				<Row className="justify-content-center">
					<Col lg={10}>
						<div className="bg-primary p-4">
							<FontAwesomeIcon
								icon={faCircleExclamation}
								className="text-secondary me-2"
								size="1x"
							/>
							<span>
								You have <strong>5 minutes</strong> to complete
								and submit this form. Failure to do so will
								release your chosen time slots.
							</span>
						</div>
					</Col>
				</Row>
				<Row className="my-5 justify-content-center">
					<Col lg={8}>
						<AppointmentDetailsCard
							title="Appointment Details"
							service={serviceCounters?.name}
							price={serviceDetail?.price}
							// description={'This is a sample description'}
							partner={partnerDetail?.name}
							// partner={`${partnerDetail?.name} - ${partnerDetail?.type?.name}`}
							location={`${partnerDetail.street}${
								partnerDetail.unit_floor_building === null
									? ''
									: ` ${partnerDetail.unit_floor_building}`
							}, ${partnerDetail.city}, NC, ${
								partnerDetail.zip_code
							}`}
							time={getStartAndEndTime(
								bookingTime,
								serviceDetail?.duration
							)}
							date={moment(bookingDate).format(
								'dddd, MMMM DD, YYYY'
							)}
						/>

						<>
							<div className="mt-5 d-flex justify-content-center">
								<FormField name="terms">
									<FormCheckBox
										name="consentToTreatment"
										register={register}
										value={'consentToTreatment'}
									>
										I agree with{' '}
										<a
											className="link-secondary"
											href={`${BASE_URL}/static/pdf/MakoRx_CareConnect_ConsentToTreatment_10.13.22.pdf`}
											target="_blank"
										>
											Consent to Treatment
										</a>
										.
									</FormCheckBox>
									<FormCheckBox
										name="termsOfUse"
										register={register}
										value={'termsOfUse'}
										className="my-2"
									>
										I agree with the{' '}
										<a
											className="link-secondary"
											href={`${BASE_URL}/static/pdf/MakoRx_CareConnect_TermsAndConditions_10.13.22.pdf`}
											target="_blank"
										>
											Terms and Conditions
										</a>
										.
									</FormCheckBox>
								</FormField>
								<div className="footer">
									<SubmitButton
										pending={isSubmitting}
										pendingText="Submitting"
										className="text-center"
										disabled={
											allTermsHasFalse || isSubmitting
										}
									>
										Submit
									</SubmitButton>
								</div>
							</div>
						</>

						{showBookingTimeError && (
							<Alert variant="danger" className="mt-4">
								The appointment time you selected has already
								passed. Please go{' '}
								<Link
									className="link-danger"
									to={'../select-time'}
								>
									back
								</Link>{' '}
								and choose another timeslot for your
								appointment.
							</Alert>
						)}
					</Col>
				</Row>
			</Form>
			{isSubmitting && <LoadingMaskWrap />}
		</Container>
	)
}
