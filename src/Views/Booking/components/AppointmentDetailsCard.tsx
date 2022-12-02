import {
	faLocationDot,
	faClock,
	faCalendar,
	faDollar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

interface AppointmentDetailsCardProps {
	service: string
	price: string
	description?: string
	reference?: string
	location: string
	partner?: string
	time: any
	date: any
	title?: string
	isConfirmed?: boolean
}

export const AppointmentDetailsCard = ({
	service,
	price,
	description,
	reference,
	location,
	partner,
	time,
	date,
	title,
	isConfirmed,
}: AppointmentDetailsCardProps) => {
	return (
		<>
			{title && <h5>{title}</h5>}
			<div className="custom-card my-3">
				<div
					className={classNames('d-flex justify-content-between', {
						'mb-3': !reference,
					})}
				>
					<div className="d-flex flex-column">
						<h6 className="fw-bold mb-0">{service}</h6>
						{service.includes('Modern') && (
							<p className="small fst-italic mb-0 fw-bold">
								Book a time slot for each spot you need checked.
								For example, if you have a spot on your arm and
								your leg you want checked, you will need to book
								two separate time slots for each spot.
							</p>
						)}
					</div>
					{!isConfirmed ? (
						<p className="small mb-0">${price}</p>
					) : (
						<span className="badge bg-primary text-secondary py-2 align-self-baseline">
							Confirmed
						</span>
					)}
				</div>
				{reference && (
					<p
						className={classNames(`small`, {
							'fw-bold': reference,
						})}
					>
						{description || reference}
					</p>
				)}

				<div className="d-lg-flex">
					<div className="equal-width">
						<FontAwesomeIcon
							icon={faLocationDot}
							className="text-secondary me-2"
							size="1x"
						/>
						<span>
							<strong className="pe-2">{partner}</strong>
							<small className="pe-2">{location}</small>
						</span>
					</div>
					<div className="equal-width mt-md-0 mt-2">
						<FontAwesomeIcon
							icon={faClock}
							className="text-secondary me-2 "
							size="1x"
						/>
						<span>
							<strong>{time}</strong>
						</span>
					</div>
				</div>
				<div className="d-lg-flex mt-2">
					<div className="equal-width">
						<FontAwesomeIcon
							icon={faCalendar}
							className="text-secondary me-2"
							size="1x"
						/>
						<span>
							<strong>{date}</strong>
						</span>
					</div>
					{isConfirmed && (
						<div className="equal-width mt-md-0 mt-2">
							<FontAwesomeIcon
								icon={faDollar}
								className="text-secondary me-1"
								size="1x"
							/>
							<span>{price}</span>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
