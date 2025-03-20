import React, { useState, createContext } from "react"
import axios from "axios"
import { url } from "../Address/BaseUrl"

export const loadingContext = createContext()

const loaderProvider = {}

function Democontext({ children }) {
	const [loading, setLoading] = useState(false)
	loaderProvider.loading = loading
	loaderProvider.setLoading = setLoading

	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""

	const handleLogOut = async () => {
		setLoading(true)
		const creds = {
			emp_id: userDetails?.emp_id,
			session_id: localStorage.getItem("session_id"),
			modified_by: userDetails?.emp_id,
		}

		await axios
			.post(`${url}/logout`, creds)
			.then((res) => {
				if (res.data.suc === 1) {
					localStorage.clear()
				} else {
					console.error("Logout failed:", res.data.msg)
				}
			})
			.catch((err) => {
				console.error(err)
			})
		setLoading(false)
	}

	return (
		<loadingContext.Provider value={{ loading, handleLogOut }}>
			{children}
		</loadingContext.Provider>
	)
}

export { Democontext, loaderProvider }
