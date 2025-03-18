import React, { useEffect, useState } from "react"
import Sidebar from "../../../Components/Sidebar"
import axios from "axios"
import { url } from "../../../Address/BaseUrl"
import { Message } from "../../../Components/Message"
import { Spin, Button, Modal, Tooltip, DatePicker } from "antd"
import dayjs from "dayjs"
import {
	LoadingOutlined,
	SearchOutlined,
	PrinterOutlined,
	FileExcelOutlined,
} from "@ant-design/icons"
import Radiobtn from "../../../Components/Radiobtn"
import TDInputTemplateBr from "../../../Components/TDInputTemplateBr"
import { formatDateToYYYYMMDD } from "../../../Utils/formateDate"

import { saveAs } from "file-saver"
import * as XLSX from "xlsx"
import { printTableLoanStatement } from "../../../Utils/printTableLoanStatement"
import { printTableLoanTransactions } from "../../../Utils/printTableLoanTransactions"
import DynamicTailwindTable from "../../../Components/Reports/DynamicTailwindTable"

// const { RangePicker } = DatePicker
// const dateFormat = "YYYY/MM/DD"

// const options = [
// 	{
// 		label: "Disbursement",
// 		value: "D",
// 	},
// 	{
// 		label: "Collection",
// 		value: "R",
// 	},
// ]

const options2 = [
	{
		label: "Groupwise",
		value: "G",
	},
	{
		label: "Fundwise",
		value: "F",
	},
	{
		label: "CO-wise",
		value: "C",
	},
	{
		label: "Memberwise",
		value: "M",
	},
]

function LoanTransactionsMain() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""
	const [loading, setLoading] = useState(false)

	// const [searchType, setSearchType] = useState(() => "D")
	const [searchType2, setSearchType2] = useState(() => "G")

	const [fromDate, setFromDate] = useState()
	const [toDate, setToDate] = useState()
	const [reportData, setReportData] = useState(() => [])

	const [metadataDtls, setMetadataDtls] = useState(
		() => userDetails?.branch_name
	)
	const [funds, setFunds] = useState([])
	const [selectedFund, setSelectedFund] = useState("")
	const [cos, setCOs] = useState([])
	const [selectedCO, setSelectedCO] = useState("")

	// const onChange = (e) => {
	// 	console.log("radio1 checked", e)
	// 	setSearchType(e)
	// }

	const onChange2 = (e) => {
		console.log("radio1 checked", e)
		setSearchType2(e)
	}

	const handleFetchTxnReportGroupwise = async () => {
		setLoading(true)
		const creds = {
			from_dt: formatDateToYYYYMMDD(fromDate),
			to_dt: formatDateToYYYYMMDD(toDate),
			branch_code: userDetails?.brn_code,
		}

		await axios
			.post(`${url}/transaction_report_groupwise`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.transaction_group_data?.msg)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const getFunds = () => {
		setLoading(true)
		axios
			.get(`${url}/get_fund`)
			.then((res) => {
				console.log("FUNDSSSS ======>", res?.data)
				setFunds(res?.data?.msg)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
				setLoading(false)
			})
		setLoading(false)
	}

	const handleFundChange = (e) => {
		const selectedId = e.target.value
		setSelectedFund(selectedId)
	}

	const handleFetchTxnReportFundwise = async () => {
		setLoading(true)
		const creds = {
			from_dt: formatDateToYYYYMMDD(fromDate),
			to_dt: formatDateToYYYYMMDD(toDate),
			branch_code: userDetails?.brn_code,
			fund_id: selectedFund,
		}

		await axios
			.post(`${url}/transaction_report_fundwise`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.transaction_fund_data?.msg)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const getCOs = () => {
		setLoading(true)
		const creds = {
			branch_code: userDetails?.brn_code,
		}
		axios
			.post(`${url}/fetch_brn_co`, creds)
			.then((res) => {
				console.log("COs ======>", res?.data)
				setCOs(res?.data?.msg)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
				setLoading(false)
			})
		setLoading(false)
	}

	const handleCOChange = (e) => {
		const selectedId = e.target.value
		setSelectedCO(selectedId)
	}

	const handleFetchTxnReportCOwise = async () => {
		setLoading(true)
		const creds = {
			from_dt: formatDateToYYYYMMDD(fromDate),
			to_dt: formatDateToYYYYMMDD(toDate),
			branch_code: userDetails?.brn_code,
			co_id: selectedCO,
		}

		await axios
			.post(`${url}/transaction_report_cowise`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.transaction_co_data?.msg)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const handleFetchTxnReportMemberwise = async () => {
		setLoading(true)
		const creds = {
			from_dt: formatDateToYYYYMMDD(fromDate),
			to_dt: formatDateToYYYYMMDD(toDate),
			branch_code: userDetails?.brn_code,
		}

		await axios
			.post(`${url}/transaction_report_memberwise`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.transaction_member_data?.msg)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const searchData = () => {
		if (searchType2 === "G" && fromDate && toDate) {
			handleFetchTxnReportGroupwise()
		} else if (searchType2 === "F" && fromDate && toDate) {
			handleFetchTxnReportFundwise()
		} else if (searchType2 === "C" && fromDate && toDate) {
			handleFetchTxnReportCOwise()
		} else if (searchType2 === "M" && fromDate && toDate) {
			handleFetchTxnReportMemberwise()
		}
	}

	useEffect(() => {
		setReportData([])
		setMetadataDtls(null)
		if (searchType2 === "F") {
			getFunds()
		}
		if (searchType2 === "C") {
			getCOs()
		}
	}, [searchType2])

	const exportToExcel = (data) => {
		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.json_to_sheet(data)
		XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
		const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" })
		const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" })
		saveAs(blob, `loan_txn_report_${metadataDtls}.xlsx`)
	}

	const s2ab = (s) => {
		const buf = new ArrayBuffer(s.length)
		const view = new Uint8Array(buf)
		for (let i = 0; i < s.length; i++) {
			view[i] = s.charCodeAt(i) & 0xff
		}
		return buf
	}

	return (
		<div>
			<Sidebar mode={2} />
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-slate-800 dark:text-gray-400"
				spinning={loading}
			>
				<main className="px-4 pb-5 bg-slate-50 rounded-lg shadow-lg h-auto my-10 mx-32">
					<div className="flex flex-row gap-3 mt-20  py-3 rounded-xl">
						<div className="text-3xl text-slate-700 font-bold">
							LOAN TRANSACTIONS
						</div>
					</div>

					<div className="mb-2 flex justify-start gap-5 items-center">
						<div>
							<Radiobtn
								data={options2}
								val={searchType2}
								onChangeVal={(value) => {
									onChange2(value)
								}}
							/>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-5 mt-5 items-end">
						<div>
							<TDInputTemplateBr
								placeholder="From Date"
								type="date"
								label="From Date"
								name="fromDate"
								formControlName={fromDate}
								handleChange={(e) => setFromDate(e.target.value)}
								min={"1900-12-31"}
								mode={1}
							/>
						</div>
						<div>
							<TDInputTemplateBr
								placeholder="To Date"
								type="date"
								label="To Date"
								name="toDate"
								formControlName={toDate}
								handleChange={(e) => setToDate(e.target.value)}
								min={"1900-12-31"}
								mode={1}
							/>
						</div>

						{searchType2 === "F" && (
							<div>
								<TDInputTemplateBr
									placeholder="Select Fund..."
									type="text"
									label="Fundwise"
									name="fund_id"
									handleChange={handleFundChange}
									data={funds.map((dat) => ({
										code: dat.fund_id,
										name: `${dat.fund_name}`,
									}))}
									mode={2}
									disabled={false}
								/>
							</div>
						)}
						{searchType2 === "C" && (
							<div>
								<TDInputTemplateBr
									placeholder="Select CO..."
									type="text"
									label="CO-wise"
									name="co_id"
									handleChange={handleCOChange}
									data={cos.map((dat) => ({
										code: dat.co_id,
										name: `${dat.emp_name}`,
									}))}
									mode={2}
									disabled={false}
								/>
							</div>
						)}

						<div>
							<button
								className={`inline-flex items-center px-4 py-2 mt-0 ml-0 sm:mt-0 text-sm font-small text-center text-white border hover:border-green-600 border-teal-500 bg-teal-500 transition ease-in-out hover:bg-green-600 duration-300 rounded-full  dark:focus:ring-primary-900`}
								onClick={() => {
									searchData()
								}}
							>
								<SearchOutlined /> <spann class={`ml-2`}>Search</spann>
							</button>
						</div>
					</div>

					{searchType2 === "M" && reportData.length > 0 && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[15, 16, 17]}
								colRemove={[5, 10, 18, 22]}
							/>
						</>
					)}

					{/* Groupwise Results with Pagination */}
					{searchType2 === "G" && reportData.length > 0 && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[7, 8]}
								// headersMap={groupwiseOutstandingHeader}
							/>
						</>
					)}

					{/* Fundwise Results with Pagination */}
					{searchType2 === "F" && reportData.length > 0 && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[9, 10]}
								// headersMap={fundwiseOutstandingHeader}
							/>
						</>
					)}

					{/* COwise Results with Pagination */}
					{searchType2 === "C" && reportData.length > 0 && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[6, 7]}
								// headersMap={cowiseOutstandingHeader}
							/>
						</>
					)}

					{/* ///////////////////////////////////////////////////////////////// */}

					{reportData.length !== 0 && (
						<div className="flex gap-4">
							<Tooltip title="Export to Excel">
								<button
									onClick={() => exportToExcel(reportData)}
									className="mt-5 justify-center items-center rounded-full text-green-900"
								>
									<FileExcelOutlined
										style={{
											fontSize: 30,
										}}
									/>
								</button>
							</Tooltip>
							<Tooltip title="Print">
								<button
									onClick={() =>
										printTableLoanTransactions(
											reportData,
											"Loan Transaction",
											searchType2,
											metadataDtls,
											fromDate,
											toDate
										)
									}
									className="mt-5 justify-center items-center rounded-full text-pink-600"
								>
									<PrinterOutlined
										style={{
											fontSize: 30,
										}}
									/>
								</button>
							</Tooltip>
						</div>
					)}
				</main>
			</Spin>
		</div>
	)
}

export default LoanTransactionsMain
