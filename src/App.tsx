import {
	BrowserRouter as Router,
	Navigate,
	useNavigate,
	useRoutes,
} from 'react-router-dom'
import { Booking } from 'Views/Booking'
// import { Booking } from 'Views/Booking'
import { Registration } from 'Views/Registration'
import { User } from 'Views/User'

function AppRoutes() {
	const navigate = useNavigate()

	// useEffect(() => navigate(`/`), [])

	const routes = useRoutes([
		{ path: '/*', element: <Registration /> },
		{ path: '/user/*', element: <User /> },
		{ path: '/booking/*', element: <Booking /> },
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
