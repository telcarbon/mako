import { faCalendar, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import {
	MediaQueryType,
	MediaQueryUnit,
	useMediaQuery,
} from 'common/MediaQuery'
import {
	findDataById,
	formatDate,
	getMinBookingTime,
	getStartAndEndTime,
	transformDateToStringMonth,
	WEEKDAY_NAMES,
} from 'common/Util'
import { Button } from 'components'
import moment from 'moment'
import { useState } from 'react'
import { Col, Row, Accordion, Badge, Spinner } from 'react-bootstrap'
import Slider from 'react-slick'
import { RemoveServiceModal } from './RemoveServiceModal'

interface ITimeAccordionProps {
	data: any
	partnerDetail: any
	serviceDetail: any
	availableTime: any
	isLoading: any
	setDate: any
	setTime: any
	minBookingTime: any
	setMinBookingTime: any
	deleteAppt: any
}

export const TimeAccordion = ({
	data,
	partnerDetail,
	serviceDetail,
	availableTime,
	isLoading,
	setDate,
	setTime,
	minBookingTime,
	setMinBookingTime,
	deleteAppt,
}: ITimeAccordionProps) => {
	const [showRemoveServiceModal, setShowRemoveServiceModal] =
		useState<boolean>(false)

	const smallDevices = useMediaQuery({
		mediaQueryType: MediaQueryType.MAX_WIDTH,
		value: 768,
		unit: MediaQueryUnit.PX,
	})

	const getConfigDays = () => {
		const daysConfig =
			partnerDetail?.partner_configuration[0]?.configuration?.map(
				(item: any) => item.days
			)

		return daysConfig?.map((data: any) => data?.day)
	}

	const checkTimeIfDisable = (itm: any, checkTime: boolean = false) => {
		const today = new Date()
		var todayMoment = formatDate(today)
		const timeData = checkTime ? getMinBookingTime() : minBookingTime

		if (checkTime) {
			setMinBookingTime(timeData)
		}
		const pastTime =
			data.bookingDate === todayMoment
				? timeData
					? itm.time <= timeData
					: false
				: false

		const hasAvailSlot = itm.available_slots <= 0
		return hasAvailSlot || pastTime
	}

	const renderSlides = () => {
		const today = new Date()
		var todayMoment = formatDate(today)
		var lastLoopDate = today

		return [...Array(100)].map((itm, key) => {
			var x = key === 0 ? 0 : 1
			var currDate = new Date(
				lastLoopDate.setDate(lastLoopDate.getDate() + x)
			)
			var dayOfTheWeek = WEEKDAY_NAMES[currDate.getDay()]
				.slice(0, 3)
				.toLocaleUpperCase()

			var currDateMoment = formatDate(currDate)
			var startingDate = todayMoment === currDateMoment
			var selectedDate = data.bookingDate === currDateMoment
			lastLoopDate = currDate
			const blockDates =
				partnerDetail?.partner_configuration[0]?.configuration_block_dates?.map(
					(item: any) => item.block_date
				)

			const checkIfWeekend =
				currDate.getDay() === 6 || currDate.getDay() === 0

			const isBlockedDate = blockDates.includes(currDateMoment)
			const isDayActive = getConfigDays().includes(
				moment(currDate).format('dddd')
			)

			return (
				<div
					key={key}
					className={classNames('date-card', {
						'date-selected': selectedDate,
						'date-current': startingDate,
						'date-disabled':
							checkIfWeekend || isBlockedDate || !isDayActive,
					})}
					onClick={() => setDate(data.id, currDateMoment)}
				>
					<small>{dayOfTheWeek}</small>
					<h3>{currDate.getDate()}</h3>
				</div>
			)
		})
	}

	const getTimeAndSlot = () => {
		if (availableTime && data.bookingDate) {
			const list = findDataById(data.id, availableTime)
			if (list && list[data.bookingDate]?.length > 0) {
				return Object.values(list[data.bookingDate])
			}
		}
		return []
	}

	return (
		<>
			<Row className="justify-content-center mb-4 pb-2">
				<Col lg={10}>
					<Accordion className="border-2 border-dark position-relative">
						<button
							type="button"
							className="icon-only position-absolute pt-4 mt-1 ms-2"
							onClick={() => {
								setShowRemoveServiceModal(true)
							}}
						>
							<FontAwesomeIcon
								icon={faCircleXmark}
								fontSize={'1.4rem'}
								className="text-secondary"
							/>
						</button>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Col lg={8} className="ms-4 ps-2">
									<h6 className="fw-bold mt-2 mb-0">
										{data?.name}
									</h6>
									<small>${data?.price}</small>
								</Col>
								<Col className="me-auto text-end">
									<h6 className="fw-bold me-3 mt-2">
										{data.bookingDate && data.bookingTime
											? [
													getStartAndEndTime(
														data.bookingTime,
														serviceDetail?.duration
													),
													moment(
														data.bookingDate
													).format('ddd, MMM DD'),
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
												data.bookingDate
											)}
										</h5>
										<FontAwesomeIcon
											icon={faCalendar}
											className="text-secondary me-2"
											size="1x"
										/>
									</div>
								</div>
								<h5 className="text-end me-3 mb-1 mb-lg-0">
									<Badge bg="secondary">
										WEEKENDS timeslots COMING SOON!
									</Badge>
								</h5>
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
									{isLoading ? (
										<div className="text-center my-5 py-5">
											<Spinner
												animation="border"
												role="status"
												variant="secondary"
											>
												<span className="visually-hidden">
													Loading...
												</span>
											</Spinner>
										</div>
									) : getTimeAndSlot()?.length > 0 ? (
										<>
											<h6>
												Showing available time slots for
												{` ${transformDateToStringMonth(
													data.bookingDate
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
																			data.bookingTime ===
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
																		setTime(
																			data.id,
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
											{data.bookingDate &&
												`There's no available time slots for ${transformDateToStringMonth(
													data.bookingDate
												)}`}
										</h6>
									)}
								</div>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
			</Row>
			<RemoveServiceModal
				show={showRemoveServiceModal}
				setShow={setShowRemoveServiceModal}
				onClick={() => deleteAppt(data.id, data.serviceId)}
			/>
		</>
	)
}
