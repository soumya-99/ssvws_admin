import React, { useEffect, useState } from "react"
import Sidebar from "../../Components/Sidebar"
import axios from "axios"
import { url } from "../../Address/BaseUrl"
import { Message } from "../../Components/Message"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import LoanApplicationsTableViewBr from "../../Components/LoanApplicationsTableViewBr"
import Radiobtn from "../../Components/Radiobtn"

const options = [
	{
		label: "Pending",
		value: "U",
	},
	{
		label: "Approved",
		value: "S",
	},
]

function DashboardBM() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""

	return (
		<div>
			<Sidebar mode={2} />
			<div>Hi</div>
		</div>
	)
}

export default DashboardBM
