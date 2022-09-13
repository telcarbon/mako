import classNames from 'classnames'
import logo from 'assets/images/Logo_MRx_CareCheckIn.svg'
import { Link, useLocation } from 'react-router-dom'

export interface SideNavProps {
	children?: React.ReactNode | React.ReactNode[]
	className?: string
	hasContactInfo?: boolean
	hasRegisterLink?: boolean
}

export const SideNav = ({
	children,
	className,
	hasContactInfo,
	hasRegisterLink,
}: SideNavProps) => {
	const location = useLocation()
	return (
		<nav
			className={classNames(
				'navbar navbar-expand-md navbar-dark ps-4',
				className
			)}
		>
			<a className="navbar-brand text-secondary" href="/">
				<img src={logo} alt="logo" className="img-fluid pt-0 pt-md-4" />
			</a>
			{hasContactInfo && (
				<div
					className="d-lg-block d-none"
					style={{
						position: 'relative',
						left: '-13rem',
						top: '4rem',
					}}
				>
					<small>
						makorx@email.com <br />
						+1 1234 5678
					</small>
				</div>
			)}

			<div className="d-none d-sm-block">{children}</div>
			{hasRegisterLink &&
				!location.pathname.match('password') &&
				!location.pathname.match('verify') && (
					<div className="ms-auto pe-5 pt-4 d-none d-sm-block">
						<p className="small">
							No Account?{' '}
							<Link
								to={'/'}
								className="link-secondary ps-1 fw-bold"
							>
								Register Now
							</Link>
						</p>
					</div>
				)}
		</nav>
	)
}
