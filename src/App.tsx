import {
	BrowserRouter as Router,
	useNavigate,
	useRoutes,
} from 'react-router-dom'
import { Booking } from 'Views/Booking'
import { NotFound } from 'Views/NotFound'
import { Registration } from 'Views/Registration'
import { User } from 'Views/User'

function AppRoutes() {
	const navigate = useNavigate()

	const routes = useRoutes([
		{ path: '/*', element: <Registration /> },
		{ path: '/user/*', element: <User /> },
		{ path: '/booking/*', element: <Booking /> },
		{ path: '/error-404', element: <NotFound /> },
	])
	return routes
}
function App() {
	return (
		<Router>
			<AppRoutes />
		</Router>
	)
}

export default App
