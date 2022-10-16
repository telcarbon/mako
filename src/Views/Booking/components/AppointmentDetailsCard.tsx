import {
	faLocationDot,
	faClock,
	faCalendar,
	faDollar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Badge } from 'react-bootstrap'

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
				<div className="d-flex justify-content-between">
					<h6 className="fw-bold">{service}</h6>
					{!isConfirmed ? (
						<p className="small mb-0">${price}</p>
					) : (
						<span className="badge bg-primary text-secondary pt-2">
							Confirmed
						</span>
					)}
				</div>
				<p
					className={classNames(`small`, {
						'fw-bold': reference,
					})}
				>
					{description || reference}
				</p>
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
