import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { PrimeReactProvider } from "primereact/api"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { ConfigProvider } from "antd"
import { useEffect } from "react"
import axios from "axios"
import { routePaths } from "./Assets/Data/Routes"
import useIdleTimer from "./Hooks/useIdleTimer"
import { Message } from "./Components/Message"
import { url } from "./Address/BaseUrl"

function App() {
	const navigate = useNavigate()
	const location = useLocation()
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""

	useIdleTimer()

	const checkSessionId = async () => {
		const creds = {
			emp_id: userDetails?.emp_id,
			session_id: localStorage.getItem("session_id"),
		}
		try {
			const res = await axios.post(`${url}/check_session_id`, creds)
			console.log("Session ID STATUS:", res?.data)
			if (!res?.data?.match) {
				Message("error", "Session expired. Please login again.")
				localStorage.clear()
				navigate(routePaths.LANDING)
			} else {
				console.log("Session ID is valid", res?.data)
			}
		} catch (err) {
			console.log("Error checking session ID:", err)
		}
	}

	useEffect(() => {
		checkSessionId()
	}, [location.pathname])

	useEffect(() => {
		if (localStorage.length > 0) {
			navigate(routePaths.BM_HOME)
		} else {
			navigate(routePaths.LANDING)
		}
	}, [navigate])

	console.log("app")
	return (
		<PrimeReactProvider>
			<ConfigProvider
				theme={{
					components: {
						Steps: { colorPrimary: "#22543d" },
						Button: { colorPrimary: "#da4167", colorPrimaryHover: "#da4167cc" },
						Menu: {
							itemBg: "#A31E21",
							itemSelectedBg: "#DA4167",
							itemSelectedColor: "#FBEC21",
							itemHoverColor: "#FFFFFF",
						},
						Segmented: {
							itemActiveBg: "#A31E21",
							itemSelectedBg: "#A31E21",
							itemSelectedColor: "white",
						},
						FloatButton: {
							colorPrimary: "#eb8d00",
							colorPrimaryHover: "#eb8d00",
							margin: 30,
						},
					},
				}}
			>
				<Outlet />
			</ConfigProvider>
		</PrimeReactProvider>
	)
}

export default App
