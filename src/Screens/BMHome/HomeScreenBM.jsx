import React, { useEffect, useState } from "react"
import Sidebar from "../../Components/Sidebar"
import axios from "axios"
import { url } from "../../Address/BaseUrl"
import { Message } from "../../Components/Message"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import LoanApplicationsTableViewBr from "../../Components/LoanApplicationsTableViewBr"

function HomeScreenBM() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""
	const [loading, setLoading] = useState(false)
	const [loanApplications, setLoanApplications] = useState(() => [])
	const [copyLoanApplications, setCopyLoanApplications] = useState(() => [])

	const fetchLoanApplications = async () => {
		setLoading(true)

		const creds = {
			prov_grp_code: 0,
			user_type: userDetails?.id,
			branch_code: userDetails?.brn_code,
		}

		await axios
			.post(`${url}/admin/fetch_bmfwd_dtls_web`, creds)
			.then((res) => {
				console.log("PPPPPPPPPPPPPPPPPPPP", res?.data)
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

	useEffect(() => {
		fetchLoanApplications()
	}, [])

	const setSearch = (word) => {
		setLoanApplications(
			copyLoanApplications?.filter(
				(e) =>
					e?.sl_no?.toString()?.toLowerCase().includes(word?.toLowerCase()) ||
					e?.group_name
						?.toString()
						?.toLowerCase()
						?.includes(word?.toLowerCase()) ||
					e?.prov_grp_code
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
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>
				<main className="px-4 h-auto my-10 mx-32">
					<LoanApplicationsTableViewBr
						flag="BM"
						loanAppData={loanApplications}
						title="Pending Groups"
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

export default HomeScreenBM
