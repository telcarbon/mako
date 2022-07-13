import { Link } from 'react-router-dom'
import { faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

export interface ContentHeaderProps {
	title: string
	backText?: string
	backLink?: any
	subtitle?: string
	useReactRouterLink?: boolean
}
export const ContentHeader = ({
	title,
	backText,
	backLink = '#',
	useReactRouterLink = false,
	subtitle,
}: ContentHeaderProps) => {
	return (
		<div className="content-header mt-0 mt-md-4 mb-0 mb-md-5">
			<div
				className="ms-0 ms-md-4"
				{...(!backText && {
					style: {
						display: 'unset',
					},
				})}
			>
				{backText && (
					<Link className="link-secondary" to={backLink}>
						<FontAwesomeIcon icon={faArrowLeft} className="pe-2" />
						{backText}
					</Link>
				)}
			</div>

			<h3 className="text-center mt-4">{title}</h3>
			{subtitle && <p className="small text-center">{subtitle}</p>}
		</div>
	)
}
