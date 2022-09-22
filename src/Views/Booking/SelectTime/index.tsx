import { useEffect, useState, useRef } from 'react'
import Slider from 'react-slick'
import { ContentHeader, SubmitButton } from 'components'
import { Col, Container, Row, Card, Button, Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { mockData } from './mockData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

export const SelectTime = () => {
	const navigate = useNavigate()

	const [selectedDate, setSelectedDate] = useState<any>(null)

	console.log(selectedDate)

	const renderSlides = () =>
		mockData.map((data) => (
			<div
				className={classNames('date-card', {
					'date-selected': selectedDate === data.id,
					'date-current': data.isCurrentDay,
				})}
				onClick={() => setSelectedDate(data.id)}
			>
				<small>{data.weekday.slice(0, 3).toLocaleUpperCase()}</small>
				<h3>{data.date}</h3>
			</div>
		))

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
										<h5>September 23, 2022</h5>
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

								{selectedDate && (
									<div className="time-available-display">
										<h6>
											Showing available time slots for
											September 23, 2022
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
				>
					Next
				</SubmitButton>
			</div>
		</Container>
	)
}
