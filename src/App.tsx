import { createContext, useEffect, useState } from 'react'
import {
	BrowserRouter as Router,
	Navigate,
	useNavigate,
	useRoutes,
} from 'react-router-dom'
import { Booking } from 'Views/Booking'
import { NotFound } from 'Views/NotFound'
// import { Booking } from 'Views/Booking'
import { Registration } from 'Views/Registration'
import { User } from 'Views/User'

interface UserContextProps {
	accessToken: any
	setAccessToken: any
}

export const UserContext = createContext<UserContextProps>({
	accessToken: null,
	setAccessToken: () => {},
})

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
	const [accessToken, setAccessToken] = useState<string>('')

	return (
		<Router>
			<UserContext.Provider value={{ accessToken, setAccessToken }}>
				<AppRoutes />
			</UserContext.Provider>
		</Router>
	)
}

export default App
