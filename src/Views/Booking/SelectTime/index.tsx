import { useEffect, useState, useRef } from 'react'
import Slider from 'react-slick'
import { ContentHeader, SubmitButton, AccordionWrap } from 'components'
import { Col, Container, Row, Card, Button, Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { mockData } from './mockData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

export const SelectTime = () => {
	const navigate = useNavigate()

	const renderSlides = () =>
		mockData.map((data) => (
			<div className="date-card">
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
									<h6 className="fw-bold">title</h6>
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
								<div className='mx-3 mb-3'>
									<p className="mb-0 fw-bold">Select a date</p>
									<div className="d-flex justify-content-between">
										<h4>September 23, 2022</h4>
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
									// infinite={false}
									className="custom-slider"
								>
									{renderSlides()}
								</Slider>
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
				>
					Next
				</SubmitButton>
			</div>
		</Container>
	)
}
