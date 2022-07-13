import classNames from 'classnames'
import logo from 'assets/images/logo.png'

export interface SideNavProps {
	children?: React.ReactNode | React.ReactNode[]
	className?: string
}

export const SideNav = ({ children, className }: SideNavProps) => {
	return (
		<nav
			className={classNames(
				'navbar navbar-expand-md navbar-dark fixed-left ps-4',
				className
			)}
		>
			<a className="navbar-brand text-secondary" href="#">
				<img src={logo} alt="logo" className="img-fluid pt-0 pt-md-4" />
			</a>
			<div className='d-none d-sm-block'>{children}</div>
		</nav>
	)
}
