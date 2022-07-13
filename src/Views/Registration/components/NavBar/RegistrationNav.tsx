import { NavLink, useMatch } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const navList = [
	{
		id: 1,
		label: 'Business Information',
		url: '/',
	},
	{
		id: 2,
		label: 'Business Representative Information',
		url: '/busines-rep-info',
	},
	{
		id: 3,
		label: 'Banking Information',
		url: '/banking-info',
	},
	{
		id: 4,
		label: 'Business Questionnaire',
		url: '/business-questionnaire',
	},
	{
		id: 5,
		label: 'Terms & Agreement',
		url: '/terms',
	},
]

export const RegistrationNav = () => {
	const match = useMatch('registration/*')
	return (
		<Nav className="mt-4 flex-column">
			<h5>Register your account</h5>
			{navList.map((list) => (
				<Nav.Item as="li" key={list.id}>
					<Nav.Link
						as={NavLink}
						to={`${match?.pathnameBase}${list.url}`}
					>
						{list.label}
					</Nav.Link>
				</Nav.Item>
			))}
		</Nav>
	)
}
