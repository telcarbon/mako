import Slider from 'react-slick'
import { ContentHeader, SubmitButton } from 'components'
import { Col, Container, Row, Card, Button, Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import {
	formatDate,
	getStartAndEndTime,
	isEmpty,
	transformDateToStringMonth,
	WEEKDAY_NAMES,
} from 'common/Util'
import { useContext, useEffect, useState } from 'react'
import { BookingContext } from '..'
import axios from 'axios'
import { API_URL } from 'shared/config'
import moment from 'moment'
import {
	useMediaQuery,
	MediaQueryType,
	MediaQueryUnit,
} from 'common/MediaQuery'

export const SelectTime = () => {
	const {
		bookingDate,
		setBookingDate,
		headers,
		partnerInfo,
		appointmentInfo,
		bookingTime,
		setBookingTime,
		serviceDetail,
	} = useContext(BookingContext)

	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [availableTime, setAvailableTime] = useState<any>()
	const [currentTime, setCurrentTime] = useState<string>()

	const smallDevices = useMediaQuery({
		mediaQueryType: MediaQueryType.MAX_WIDTH,
		value: 768,
		unit: MediaQueryUnit.PX,
	})

	const renderSlides = () => {
		const today = new Date()
		var todayMoment = formatDate(today)
		var lastLoopDate = today

		return [...Array(100)].map((data, key) => {
			var x = key === 0 ? 0 : 1
			var currDate = new Date(
				lastLoopDate.setDate(lastLoopDate.getDate() + x)
			)
			var dayOfTheWeek = WEEKDAY_NAMES[currDate.getDay()]
				.slice(0, 3)
				.toLocaleUpperCase()

			var currDateMoment = formatDate(currDate)
			var startingDate = todayMoment === currDateMoment
			var selectedDate = bookingDate === currDateMoment
			lastLoopDate = currDate

			const checkIfWeekend =
				currDate.getDay() === 6 || currDate.getDay() === 0

			return (
				<div
					key={key}
					className={classNames('date-card', {
						'date-selected': selectedDate,
						'date-current': startingDate,
						'date-disabled': startingDate || checkIfWeekend,
					})}
					onClick={() => setBookingDate(currDateMoment)}
				>
					<small>{dayOfTheWeek}</small>
					<h3>{currDate.getDate()}</h3>
				</div>
			)
		})
	}

	const handleSubmit = async () => {
		navigate('/booking/confirm-appointment')
	}

	const getCurrentTime = () => {
		const dt = new Date()
		return `${dt.getHours().toString().padStart(2, '0')}:${dt
			.getMinutes()
			.toString()
			.padStart(2, '0')}:00`
	}

	const getAvailableTimeRequest = () => {
		setCurrentTime(getCurrentTime())
		const partner = partnerInfo.partner
		const service = appointmentInfo.service
		axios
			.get(
				`${API_URL}/appointment/get_date/?partner=${partner}&service=${service}&date=${bookingDate}`,
				{
					headers,
				}
			)
			.then((response) => {
				if (!isEmpty(response.data)) {
					setAvailableTime(response.data)
				}
			})
	}

	const getTimeAndSlot = () => {
		if (
			availableTime &&
			bookingDate &&
			availableTime[bookingDate]?.length > 0
		) {
			return Object.values(availableTime[bookingDate])
		}
		return []
	}

	const getStartAndEndTime = (time: any) => {
		const startTime = moment(time, 'hh:mm').format('LT')
		const endTime = moment(time, 'hh:mm').add('15', 'minutes').format('LT')
		return `${startTime} - ${endTime}`
	}

	useEffect(() => {
		if (!isEmpty(bookingDate)) {
			getAvailableTimeRequest()
			// setBookingTime(null)
		}
	}, [bookingDate])

	const checkTimeIfDisable = (itm: any, checkTime: boolean = false) => {
		const timeData = checkTime ? getCurrentTime() : currentTime
		if (checkTime) {
			setCurrentTime(timeData)
		}
		const pastTime = timeData ? itm.time <= timeData : false
		const hasAvailSlot = itm.available_slot === 0
		return hasAvailSlot || pastTime
	}

	return (
		<Container fluid>
			<ContentHeader
				title="Select Appointment Time"
				backText="Back"
				backLink={-1}
			/>

			<Row className="justify-content-center mb-5">
				<Col lg={10}>
					<Accordion className="border-2 border-dark">
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Col lg={8}>
									<h6 className="fw-bold mt-2">
										{serviceDetail?.name}
									</h6>
									{/* <p className="small mb-0">
										this is a sample label
									</p> */}
								</Col>
								<Col className="me-auto text-end">
									<h6 className="fw-bold me-3 mt-2">
										{bookingDate && bookingTime
											? [
													getStartAndEndTime(
														bookingTime,
														serviceDetail?.duration
													),
													moment(bookingDate).format(
														'ddd, MMM DD'
													),
											  ].join(', ')
											: 'Select time slot'}
									</h6>
								</Col>
							</Accordion.Header>
							<Accordion.Body>
								<div className="mx-3 mb-3">
									<h6 className="mb-1">Select a date</h6>
									<div className="d-flex justify-content-between">
										<h5>
											{transformDateToStringMonth(
												bookingDate
											)}
										</h5>
										<FontAwesomeIcon
											icon={faCalendar}
											className="text-secondary me-2"
											size="1x"
										/>
									</div>
								</div>

								<Slider
									swipeToSlide
									dots={false}
									slidesToShow={smallDevices ? 3 : 7}
									infinite={false}
									className="custom-slider"
								>
									{renderSlides()}
								</Slider>

								<div className="time-available-display">
									{getTimeAndSlot()?.length > 0 ? (
										<>
											<h6>
												Showing available time slots for
												{` ${transformDateToStringMonth(
													bookingDate
												)}`}
											</h6>

											<ul className="time-slot row mt-4">
												{getTimeAndSlot()?.map(
													(
														item: any,
														index: number
													) => (
														<li
															className="col-lg-3"
															key={index}
														>
															<div
																className={classNames(
																	{
																		'time-selected':
																			bookingTime ===
																			item.time,
																		'time-disabled':
																			checkTimeIfDisable(
																				item
																			),
																	}
																)}
																onClick={() => {
																	if (
																		!checkTimeIfDisable(
																			item,
																			true
																		)
																	) {
																		setBookingTime(
																			item.time
																		)
																	}
																}}
															>
																{getStartAndEndTime(
																	item.time,
																	serviceDetail?.duration
																)}
															</div>
														</li>
													)
												)}
											</ul>
										</>
									) : (
										<h6>
											{bookingDate &&
												`There's no available time slots for ${transformDateToStringMonth(
													bookingDate
												)}`}
										</h6>
									)}
								</div>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
			</Row>
			<div className="footer w-75">
				<SubmitButton
					pending={false}
					pendingText="Saving"
					className="col-lg-auto pull-right"
					onClick={handleSubmit}
					// disabled={!bookingDate || !bookingTime}
					type="button"
				>
					Next
				</SubmitButton>
			</div>
		</Container>
	)
}
