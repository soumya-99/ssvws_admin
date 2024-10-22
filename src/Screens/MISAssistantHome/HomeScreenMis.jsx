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
		label: "Received",
		value: "S",
	},
	{
		label: "Approved",
		value: "A",
	},
	{
		label: "Rejected",
		value: "R",
	},
]

function HomeScreenMis() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""
	const [loading, setLoading] = useState(false)
	const [loanApplications, setLoanApplications] = useState(() => [])
	const [copyLoanApplications, setCopyLoanApplications] = useState(() => [])

	const [approvalStatus, setApprovalStatus] = useState("S")

	const fetchLoanApplications = async () => {
		setLoading(true)
		// const creds = {
		// 	// prov_grp_code: 0,
		// 	// user_type: userDetails?.id,
		// 	// branch_code: userDetails?.brn_code,
		// 	approval_status: approvalStatus,
		// }

		await axios
			.get(
				`${url}/admin/fetch_form_fwd_bm_web?approval_status=${approvalStatus}&branch_code=${userDetails?.brn_code}`
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
				console.log("ERRR", err)
			})
		setLoading(false)
	}

	const onChange = (e) => {
		console.log("radio1 checked", e)
		setApprovalStatus(e)
	}

	useEffect(() => {
		fetchLoanApplications()
	}, [])

	useEffect(() => {
		fetchLoanApplications()
	}, [approvalStatus])

	const setSearch = (word) => {
		setLoanApplications(
			copyLoanApplications?.filter(
				(e) =>
					e?.member_code
						?.toString()
						?.toLowerCase()
						.includes(word?.toLowerCase()) ||
					e?.form_no
						?.toString()
						?.toLowerCase()
						?.includes(word?.toLowerCase()) ||
					e?.client_name
						?.toString()
						?.toLowerCase()
						?.includes(word?.toLowerCase())
			)
		)
	}

	return (
		<div>
			<Sidebar mode={1} />
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>
				<main className="px-4 h-auto my-10 mx-32">
					<Radiobtn
						data={options}
						val={approvalStatus}
						onChangeVal={(value) => {
							onChange(value)
						}}
					/>
					<LoanApplicationsTableViewBr
						flag="MIS"
						loanAppData={loanApplications}
						title="GRT Forms"
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

export default HomeScreenMis
