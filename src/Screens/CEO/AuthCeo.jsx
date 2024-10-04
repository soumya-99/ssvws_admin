import React from "react"
import { Outlet } from "react-router-dom"

function AuthCeo() {
	console.log("auth")

	return (
		<div>
			<Outlet />
		</div>
	)
}

export default AuthCeo
