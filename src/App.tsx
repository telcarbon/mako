import { SideNav } from 'components'
import { ComponentsPage } from 'Views/ComponentsPage'
import { Registration } from 'Views/Registration'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import classNames from 'classnames'
import { RegistrationNav } from 'Views/Registration/components/NavBar/RegistrationNav'

function AppRoutes() {
	const routes = useRoutes([
		{ path: '/', element: <ComponentsPage /> },
		{ path: '/registration/*', element: <Registration /> },
	])
	return routes
}
function App() {
	return (
		<Router>
			{/* <SideNav
				className={classNames(
					location.pathname.includes('registration')
						? 'bg-primary'
						: ''
				)}
			>
				{location.pathname.includes('registration') && (
					<RegistrationNav />
				)}
			</SideNav> */}
			<AppRoutes />
		</Router>
	)
}

export default App
