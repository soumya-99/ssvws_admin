import React from "react"
import Sidebar from "../../../Components/Sidebar"

function AdminDashboard() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""

	return (
		<div>
			<Sidebar mode={2} />
			<div className="text-3xl text-slate-800 p-10">
				Hi, I'm Dashboard of Admin! Coming soon...
			</div>
		</div>
	)
}

export default AdminDashboard
