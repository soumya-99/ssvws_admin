import React from "react"
import { Descriptions } from "antd"
const ProfileInfo = () => {
	const items = [
		{
			key: "1",
			label: "Name",
			children: <p>{localStorage.getItem("user_name")}</p>,
		},
		{
			key: "2",
			label: "Phone",
			children: <p>{localStorage.getItem("user_phone")}</p>,
		},
		{
			key: "3",
			label: "Email",
			children: <p>{localStorage.getItem("email")}</p>,
		},
		{
			key: "4",
			label: "Department",
			children: <p>{localStorage.getItem("dept_name")}</p>,
		},
		{
			key: "5",
			label: "Designation",
			children: <p>{localStorage.getItem("desig_name")}</p>,
		},
		{
			key: "6",
			label: "Type",
			children: (
				<p>
					{localStorage.getItem("user_type") == "AD"
						? "Admin"
						: localStorage.getItem("user_type") == "PM"
						? "Purchase Manager"
						: localStorage.getItem("user_type") == "PuM"
						? "Purchase Manager"
						: localStorage.getItem("user_type") == "WM"
						? "Warehouse Manager"
						: "General User"}
				</p>
			),
		},
	]
	return (
		<>
			<Descriptions
				title="Your profile"
				labelStyle={{ color: "#014737", fontWeight: "bold" }}
				items={items}
			/>
		</>
	)
}

export default ProfileInfo
