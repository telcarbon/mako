import { SideNav } from 'components'
import { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Navigate,
	useNavigate,
	useRoutes,
} from 'react-router-dom'
import { Login } from 'Views/Login'
import { Registration } from 'Views/Registration'

function AppRoutes() {
	const navigate = useNavigate()

	// useEffect(() => navigate(`/`), [])

	const routes = useRoutes([
		{ path: '/*', element: <Registration /> },
		{ path: '/login', element: <Login /> },
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
