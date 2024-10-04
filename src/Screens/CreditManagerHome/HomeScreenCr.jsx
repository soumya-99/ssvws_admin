import React, { useEffect, useState } from "react"
import { Chart } from "primereact/chart"

import { motion } from "framer-motion"
import { Segmented } from "antd"
import {
	InfoCircleOutlined,
	SettingOutlined,
	CloseOutlined,
	SolutionOutlined,
	ProjectOutlined,
	BellOutlined,
	UserAddOutlined,
	SwapOutlined,
	InboxOutlined,
	UserSwitchOutlined,
	FileSearchOutlined,
	BarChartOutlined,
	ExceptionOutlined,
} from "@ant-design/icons"
import { Flex, Progress } from "antd"
import { WidthFull } from "@mui/icons-material"
import DialogBox from "../../Components/DialogBox"
import { routePaths } from "../../Assets/Data/Routes"
import { Link } from "react-router-dom"
import Sidebar from "../../Components/Sidebar"
import LoanApplicationsTableView from "../../Components/LoanApplicationsTableView"
import axios from "axios"
import { url } from "../../Address/BaseUrl"
import { Message } from "../../Components/Message"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import LoanApplicationsTableViewBr from "../../Components/LoanApplicationsTableViewBr"
import LoanApplicationsTableViewCr from "../../Components/LoanApplicationsTableViewCr"

function HomeScreenCr() {
	const [loading, setLoading] = useState(false)
	const [loanApplications, setLoanApplications] = useState(() => [])
	const [copyLoanApplications, setCopyLoanApplications] = useState(() => [])

	const fetchLoanApplications = async () => {
		setLoading(true)
		await axios
			.get(
				`${url}/credit/fetch_credit_pen_dtls?user_id=${+JSON.parse(
					localStorage.getItem("cr_mgr_details")
				)?.id}`
			)
			.then((res) => {
				if (res?.data?.suc === 1) {
					setLoanApplications(res?.data?.msg)
					setCopyLoanApplications(res?.data?.msg)

					console.log("PPPPPPPPPPPPPPPPPPPP", res?.data)
				} else {
					Message("error", "No incoming loan applications found.")
				}
			})
			.catch((err) => {
				Message("error", "Some error occurred while fetching loans!")
			})
		setLoading(false)
	}

	useEffect(() => {
		fetchLoanApplications()
	}, [])

	const setSearch = (word) => {
		setLoanApplications(
			copyLoanApplications?.filter(
				(e) =>
					e?.sl_no?.toString()?.toLowerCase().includes(word?.toLowerCase()) ||
					e?.application_no
						?.toString()
						?.toLowerCase()
						?.includes(word?.toLowerCase()) ||
					e?.member_name
						?.toString()
						?.toLowerCase()
						?.includes(word?.toLowerCase())
			)
		)
	}

	return (
		<div>
			<Sidebar mode={2} />
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-teal-800 dark:text-gray-400"
				spinning={loading}
			>
				<main className="px-4 h-auto my-10 mx-32">
					<LoanApplicationsTableViewCr
						loanAppData={loanApplications}
						title="Pending Applications"
						setSearch={(data) => setSearch(data)}
					/>
					{/* <DialogBox
					visible={visible}
					flag={flag}
					onPress={() => setVisible(false)}
				/> */}
				</main>
			</Spin>
		</div>
	)
}

export default HomeScreenCr
