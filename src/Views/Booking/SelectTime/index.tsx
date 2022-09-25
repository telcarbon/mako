import Slider from 'react-slick'
import { ContentHeader, SubmitButton } from 'components'
import { Col, Container, Row, Card, Button, Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import {
	formatDate,
	transformDateToStringMonth,
	WEEKDAY_NAMES,
} from 'common/Util'

interface ISelectTimeProps {
	bookingDate?: any // new Date format
	setbookingDate: (value: any) => void
}

export const SelectTime = ({
	bookingDate,
	setbookingDate,
}: ISelectTimeProps) => {
	const navigate = useNavigate()
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
			return (
				<div
					key={key}
					className={classNames('date-card', {
						'date-selected': selectedDate,
						'date-current': startingDate,
					})}
					onClick={() => setbookingDate(currDateMoment)}
				>
					<small>{dayOfTheWeek}</small>
					<h3>{currDate.getDate()}</h3>
				</div>
			)
		})
	}

	return (
		<Container fluid>
			<ContentHeader
				title="Select Appointment Time"
				backText="Back"
				backLink={-1}
			/>

			<Row className="justify-content-center">
				<Col lg={10}>
					<Accordion className="border-2 border-dark">
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Col lg={9}>
									<h6 className="fw-bold">Flu Test</h6>
									<p className="small mb-0">
										this is a sample label
									</p>
								</Col>
								<Col className="me-auto text-end">
									<h6 className="fw-bold me-3 mt-2">
										Select a time slot
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
									dots={false}
									slidesToShow={7}
									infinite={false}
									className="custom-slider"
								>
									{renderSlides()}
								</Slider>

								{bookingDate && (
									<div className="time-available-display">
										<h6>
											Showing available time slots
											{` ${transformDateToStringMonth(
												bookingDate
											)}`}
										</h6>

										<p className="small mt-3">Morning</p>

										<ul className="time-slot">
											<li>9:00 AM - 9:30 AM</li>
											<li className="time-selected">
												9:30 AM - 10:00 AM
											</li>
											<li className="time-disabled">
												10:00 AM - 10:30 AM
											</li>
											<li>10:30 AM - 11:00 AM</li>
											<li>11:00 AM - 11:30 AM</li>
										</ul>
									</div>
								)}
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
					onClick={() => navigate('/booking/confirm-appointment')}
					disabled={bookingDate === null}
				>
					Next
				</SubmitButton>
			</div>
		</Container>
	)
}
