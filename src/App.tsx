import { useEffect } from 'react'
import {
	BrowserRouter as Router,
	useNavigate,
	useRoutes,
} from 'react-router-dom'
import { Registration } from 'Views/Registration'

function AppRoutes() {
	const navigate = useNavigate()

	useEffect(() => navigate(`/registration`), [])

	const routes = useRoutes([
		{ path: '/registration/*', element: <Registration /> },
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
