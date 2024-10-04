import React from "react"
import { Outlet } from "react-router-dom"

function ChooseComp() {
	console.log("Choose comp")

	return (
		<div>
			<Outlet />
		</div>
	)
}

export default ChooseComp
