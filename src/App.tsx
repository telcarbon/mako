import { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Navigate,
	useNavigate,
	useRoutes,
} from 'react-router-dom'
import { Registration } from 'Views/Registration'

function AppRoutes() {
	const navigate = useNavigate()

	useEffect(() => navigate(`/`), [])

	const routes = useRoutes([{ path: '/*', element: <Registration /> }])
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
