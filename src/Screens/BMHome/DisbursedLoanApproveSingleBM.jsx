import React, { useEffect, useState } from "react"
import Sidebar from "../../Components/Sidebar"
import axios from "axios"
import { url } from "../../Address/BaseUrl"
import { Message } from "../../Components/Message"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import Radiobtn from "../../Components/Radiobtn"
import DisburseApproveTable from "../../Components/DisburseApproveTable"

// const options = [
// 	{
// 		label: "Disburse",
// 		value: "D",
// 	},
// 	{
// 		label: "Recovery",
// 		value: "R",
// 	},
// ]

function DisbursedLoanApproveSingleBM() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""
	const [loading, setLoading] = useState(false)
	const [loanApplications, setLoanApplications] = useState(() => [])
	const [copyLoanApplications, setCopyLoanApplications] = useState(() => [])

	const [loanType, setLoanType] = useState("D")
	// const [value2, setValue2] = useState("S")

	const fetchLoanApplications = async (loanType) => {
		setLoading(true)

		// const creds = {
		// 	prov_grp_code: 0,
		// 	user_type: userDetails?.id,
		// 	branch_code: userDetails?.brn_code,
		// }

		await axios
			.post(`${url}/admin/fetch_loan_trans_dtls`, {
				tr_type: loanType,
				branch_code: userDetails?.brn_code,
			})
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
		fetchLoanApplications(loanType)
	}, [loanType])

	const setSearch = (word) => {
		
		
		setLoanApplications(
			copyLoanApplications?.filter(
				(e) =>
					// console.log(word, 'wordwordwordword', e);
					e?.client_name
						?.toString()
						?.toLowerCase()
						.includes(word?.toLowerCase()) ||
					e?.loan_id
						?.toString()
						?.toLowerCase()
						?.includes(word?.toLowerCase())
				
			)
		)
	}

	const onChange = (e) => {
		console.log("radio1 checked", e)
		setLoanType(e)
	}

	useEffect(() => {
		fetchLoanApplications(loanType)
	}, [loanType])

	return (
		<div>
			<Sidebar mode={2} />
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>
				<main className="px-4 h-auto my-16 mx-32">
					{/* <Radiobtn data={options} val={"U"} onChangeVal={onChange1} /> */}

					{/* <Radiobtn
						data={options}
						val={loanType}
						onChangeVal={(value) => {
							onChange(value)
						}}
					/> */}

					<div className="flex flex-row gap-3 mt-20  py-3 rounded-xl">
						<div className="text-3xl text-slate-700 font-bold">
						Disburse
						</div>
					</div>

					<DisburseApproveTable
							flag="BM"
							loanAppData={loanApplications}
							title="Approve Loan"
							setSearch={(data) => setSearch(data)}
							approvalStat={loanType}
						/>

						

					{/* {loanType === "D" ? (
						<DisburseApproveTable
							flag="BM"
							loanAppData={loanApplications}
							title="Approve Loan"
							setSearch={(data) => setSearch(data)}
							approvalStat={loanType}
						/>
					) : loanType === "R" ? (
						<RecoveryApproveTable
							flag="BM"
							loanAppData={loanApplications}
							title="Approve Transaction"
							setSearch={(data) => setSearch(data)}
							loanType={loanType}
							fetchLoanApplications={fetchLoanApplications}
						/>
					) : null} */}
					
				</main>
			</Spin>
		</div>
	)
}

export default DisbursedLoanApproveSingleBM
