import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	capitalizeFirst,
	formatDate,
	getMinBookingTime,
	getStartAndEndTime,
} from 'common/Util'
import {
	ContentHeader,
	Form,
	FormField,
	FormSearchSelect,
	LoadingMaskWrap,
	SubmitButton,
} from 'components'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import 'react-phone-number-input/style.css'
import { Link, useNavigate } from 'react-router-dom'
import { BookingContext } from '..'
import { AppointmentDetailsCard } from '../components/AppointmentDetailsCard'
import { UnselectedPatientModal } from '../components/UnselectedPatientModal'

export const ConfirmAppointment = () => {
	const [showBookingTimeError, setShowBookingTimeError] = useState(false)
	const [unselectedPatient, setUnselectedPatient] = useState<any[]>([])
	const [showUnselectedPatientModal, setShowUnselectedPatientModal] =
		useState<boolean>(false)
	const {
		handleSubmitAll,
		serviceDetail,
		partnerDetail,
		serviceCounters,
		bookingInfo,
		patientDetail,
		isLoading,
	} = useContext(BookingContext)
	const navigate = useNavigate()

	const useFormInstance = useForm({
		defaultValues: {
			termsOfUse: false,
			consentToTreatment: false,
			isModal: false,
		},
	})
	const {
		getValues,
		setValue,
		register,
		formState: { isSubmitting },
		watch,
		control,
	} = useFormInstance

	// const checkIfPastTime = () => {
	// 	const today = new Date()
	// 	var todayMoment = formatDate(today)
	// 	const currentTime = getMinBookingTime()

	// 	let hasPassed = false
	// 	if (bookingDate === todayMoment) {
	// 		hasPassed = bookingTime <= currentTime
	// 	}
	// 	setShowBookingTimeError(hasPassed)
	// 	return hasPassed
	// }

	useEffect(() => {
		if (unselectedPatient.length > 0) {
			setShowUnselectedPatientModal(true)
		}
	}, [unselectedPatient])

	const handleSubmit = async (isModal: boolean) => {
		const formValues: any = getValues()
		let unselected: any = []

		if (patientDetail.personalInfo.length > 1) {
			const appts: number[] = bookingInfo
				.map((m: any) => formValues[`appointment_${m.id}`])
				.filter((f: any) => f !== undefined)
			// patientDetail.personalInfo.map((m: any, i: number) => {
			// 	if (!appts.includes(m.id)) {
			// 		unselected.push({
			// 			id: m.id,
			// 			name: `${m.firstName} ${m.lastName}`,
			// 		})
			// 	}
			// })

			patientDetail.personalInfo.map((m: any, i: number) => {
				if (!appts.includes(i + 1)) {
					unselected.push({
						id: i + 1,
						name: `${m.firstName} ${m.lastName}`,
					})
				}
			})

			setUnselectedPatient(unselected)
		} else {
			formValues['appointment_1'] = patientDetail.personalInfo.length
		}

		// const pastTime = checkIfPastTime()
		// if (!pastTime) {
		// 	handleSubmitAll(formValues)

		if (unselected.length === 0 || formValues['isModal']) {
			setShowUnselectedPatientModal(false)
			// handleSubmitAll(formValues)
		}

		// }
	}

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
						<h5>Who are these appointments for?</h5>
						{bookingInfo &&
							bookingInfo.map((info: any, i: number) => (
								<AppointmentDetailsCard
									key={i}
									service={info.name}
									price={info.price}
									partner={partnerDetail?.name}
									location={`${partnerDetail.street}${
										partnerDetail.unit_floor_building ===
										null
											? ''
											: ` ${partnerDetail.unit_floor_building}`
									}, ${partnerDetail.city}, NC, ${
										partnerDetail.zip_code
									}`}
									time={getStartAndEndTime(
										info.bookingTime,
										info.duration
									)}
									date={moment(info.bookingDate).format(
										'dddd, MMMM DD, YYYY'
									)}
								>
									<FormField name={`appointment_${info.id}`}>
										<FormSearchSelect
											name={`appointment_${info.id}`}
											register={register}
											placeholder="Patient Name"
											options={patientDetail.personalInfo.map(
												(patient: any, i: number) => {
													return {
														label: [
															capitalizeFirst(
																patient.firstName
															),
															capitalizeFirst(
																patient.lastName
															),
														].join(' '),
														// value: patient.id,
														value: i + 1,
													}
												}
											)}
											{...(patientDetail.personalInfo
												.length === 1 && {
												defaultValue: {
													label: [
														patientDetail
															.personalInfo[0]
															.firstName,
														patientDetail
															.personalInfo[0]
															.lastName,
													].join(' '),
													// value: patientDetail
													// 	.patient[0].id,
													value: i + 1,
												},
											})}
											disabled={
												patientDetail.personalInfo
													.length === 1
											}
										/>
									</FormField>
								</AppointmentDetailsCard>
							))}

						<>
							<div className="mt-5 d-flex justify-content-center">
								{/* <FormField name="terms">
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
								</FormField> */}
								<div className="footer">
									<SubmitButton
										pending={isSubmitting}
										pendingText="Submitting"
										className="text-center"
										disabled={isSubmitting}
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
			<UnselectedPatientModal
				show={showUnselectedPatientModal}
				setShow={setShowUnselectedPatientModal}
				name={unselectedPatient}
				setValue={setValue}
				onClick={handleSubmit}
				disableProceed={
					unselectedPatient.length ===
					patientDetail.personalInfo.length
				}
			/>
			{isLoading && <LoadingMaskWrap />}
		</Container>
	)
}
