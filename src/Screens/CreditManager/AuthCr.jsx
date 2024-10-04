import React from "react"
import { Outlet } from "react-router-dom"

function AuthCr() {
	console.log("auth")

	return (
		<div>
			<Outlet />
		</div>
	)
}

export default AuthCr
