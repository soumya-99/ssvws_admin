import React, { useEffect, useState } from "react"
import Sidebar from "../../../Components/Sidebar"
import axios from "axios"
import { url } from "../../../Address/BaseUrl"
import { Message } from "../../../Components/Message"
import {
	Spin,
	Button,
	Modal,
	Tooltip,
	DatePicker,
	Progress,
	Pagination,
} from "antd" // <-- Added Pagination here
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
import { printTableOutstandingReport } from "../../../Utils/printTableOutstandingReport"

const options = [
	{
		label: "Memberwise",
		value: "M",
	},
	{
		label: "Groupwise",
		value: "G",
	},
]

function OutstaningReportMain() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""
	const [loading, setLoading] = useState(false)
	const [searchType, setSearchType] = useState("M")
	const [fromDate, setFromDate] = useState()
	const [toDate, setToDate] = useState()
	const [reportData, setReportData] = useState([])
	const [progress, setProgress] = useState(0)
	const [metadataDtls, setMetadataDtls] = useState(null)
	const [breakFromLoop, setBreakFromLoop] = useState(false)

	// Pagination state for groupwise view
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 100 // Adjust the page size as needed

	const onChange = (e) => {
		console.log("radio1 checked", e)
		setSearchType(e)
	}

	const handleFetchReportOutstandingMemberwise = async () => {
		let min = 0
		const maxBatchSize = 50
		const increment = 5
		setLoading(true)

		const creds = {
			os_dt: formatDateToYYYYMMDD(fromDate),
			branch_code: userDetails?.brn_code,
			min: min,
			max: min + maxBatchSize,
		}

		await axios
			.post(`${url}/loan_outstanding_report_memberwise`, creds)
			.then((res) => {
				const data = res?.data?.msg || []
				if (data?.length === 0) {
					console.log(
						"--------------- LOOP BREAKS ---------------",
						data?.length
					)
					setProgress(100)
				}
				console.log("---------- DATA MEMWISE -----------", data)
				setReportData(data)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const handleFetchReportOutstandingGroupwise = async () => {
		setLoading(true)

		const creds = {
			supply_date: formatDateToYYYYMMDD(fromDate),
		}

		await axios
			.post(`${url}/loan_outstanding_report_groupwise`, creds)
			.then((res) => {
				const data = res?.data?.msg || []
				if (data.length === 0) {
					console.log(
						"--------------- LOOP BREAKS ---------------",
						data?.length
					)
				}
				console.log("---------- DATA GROUPWISE -----------", res?.data)
				setReportData(data)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const handleSubmit = () => {
		if (searchType === "M" && fromDate) {
			handleFetchReportOutstandingMemberwise()
		} else if (searchType === "G" && fromDate) {
			handleFetchReportOutstandingGroupwise()
		}
	}

	// Reset states when searchType changes
	useEffect(() => {
		setReportData([])
		setMetadataDtls(null)
		setCurrentPage(1)
		setProgress(0)
	}, [searchType])

	const exportToExcel = (data) => {
		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.json_to_sheet(data)
		XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
		const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" })
		const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" })
		saveAs(blob, "outstanding_report.xlsx")
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
					<div className="flex flex-row gap-3 mt-20 py-3 rounded-xl">
						<div className="text-3xl text-slate-700 font-bold">
							Outstanding Report
						</div>
					</div>

					<div className="text-slate-800 italic">
						Branch: {userDetails?.branch_name}
					</div>

					<div className="mb-2 flex justify-between items-center">
						<div>
							<Radiobtn
								data={options}
								val={searchType}
								onChangeVal={(value) => onChange(value)}
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
							<button
								className="inline-flex items-center px-4 py-2 text-sm font-small text-white border hover:border-green-600 border-teal-500 bg-teal-500 transition ease-in-out hover:bg-green-600 duration-300 rounded-full"
								onClick={handleSubmit}
							>
								<SearchOutlined /> <span className="ml-2">Search</span>
							</button>
						</div>
					</div>

					{/* Memberwise Results */}
					{searchType === "M" && reportData.length > 0 && (
						<div
							className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[500px]
                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-transparent
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
						>
							<div className="w-full text-xs dark:bg-gray-700 dark:text-gray-400">
								<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
									<thead className="w-full text-xs uppercase text-slate-50 bg-slate-800 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
										<tr>
											<th className="px-6 py-3 font-semibold">Sl. No.</th>
											<th className="px-6 py-3 font-semibold">Member Code</th>
											<th className="px-6 py-3 font-semibold">Member Name</th>
											<th className="px-6 py-3 font-semibold">Group Code</th>
											<th className="px-6 py-3 font-semibold">Group Name</th>
											<th className="px-6 py-3 font-semibold">Loan ID</th>
											<th className="px-6 py-3 font-semibold">
												Disbursement Date
											</th>
											<th className="px-6 py-3 font-semibold">Current R.O.I</th>
											<th className="px-6 py-3 font-semibold">Period Mode</th>
											<th className="px-6 py-3 font-semibold">Total EMI</th>
											<th className="px-6 py-3 font-semibold">Period</th>
											<th className="px-6 py-3 font-semibold">
												Installment End Date
											</th>
											<th className="px-6 py-3 font-semibold">Balance</th>
											<th className="px-6 py-3 font-semibold">OD Balance</th>
											<th className="px-6 py-3 font-semibold">
												Interest Balance
											</th>
											<th className="px-6 py-3 font-semibold">
												Total Outstanding
											</th>
										</tr>
									</thead>
									<tbody>
										{reportData.map((item, i) => (
											<tr
												key={i}
												className={
													i % 2 === 0 ? "bg-slate-200 text-slate-900" : ""
												}
											>
												<td className="px-6 py-3">{i + 1}</td>
												<td className="px-6 py-3">
													{item?.member_code || "---"}
												</td>
												<td className="px-6 py-3">
													{item?.client_name || "---"}
												</td>
												<td className="px-6 py-3">
													{item?.group_code || "---"}
												</td>
												<td className="px-6 py-3">
													{item?.group_name || "---"}
												</td>
												<td className="px-6 py-3">{item?.loan_id || "---"}</td>
												<td className="px-6 py-3">
													{item?.disb_dt
														? new Date(item?.disb_dt).toLocaleDateString(
																"en-GB"
														  )
														: "---"}
												</td>
												<td className="px-6 py-3">
													{parseFloat(item?.curr_roi)?.toFixed(2) || "---"}
												</td>
												<td className="px-6 py-3">
													{item?.period_mode || "---"}
												</td>
												<td className="px-6 py-3">
													{parseFloat(item?.tot_emi)?.toFixed(2) || "---"}
												</td>
												<td className="px-6 py-3">{item?.period || "---"}</td>
												<td className="px-6 py-3">
													{item?.instl_end_dt
														? new Date(item?.instl_end_dt).toLocaleDateString(
																"en-GB"
														  )
														: "---"}
												</td>
												<td className="px-6 py-3">{item?.balance || "0"}</td>
												<td className="px-6 py-3">
													{parseFloat(item?.od_balance)?.toFixed(2) || "0"}
												</td>
												<td className="px-6 py-3">
													{parseFloat(item?.intt_balance)?.toFixed(2) || "0"}
												</td>
												<td className="px-6 py-3">
													{parseFloat(+item?.total_outstanding)?.toFixed(2) ||
														"---"}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}

					{/* Groupwise Results with Pagination */}
					{searchType === "G" && reportData.length > 0 && (
						<>
							<div
								className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[500px]
                  [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  dark:[&::-webkit-scrollbar-track]:bg-transparent
                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
							>
								<div className="w-full text-xs dark:bg-gray-700 dark:text-gray-400">
									<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
										<thead className="w-full text-xs uppercase text-slate-50 bg-slate-800 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
											<tr>
												<th className="px-6 py-3 font-semibold">Sl. No.</th>
												<th className="px-6 py-3 font-semibold">Group Code</th>
												<th className="px-6 py-3 font-semibold">Group Name</th>
												<th className="px-6 py-3 font-semibold">CO ID</th>
												<th className="px-6 py-3 font-semibold">CO Name</th>
												<th className="px-6 py-3 font-semibold">Bank</th>
												<th className="px-6 py-3 font-semibold">Acc No. 1</th>
												<th className="px-6 py-3 font-semibold">Acc No. 2</th>
												<th className="px-6 py-3 font-semibold">
													Recovery Day
												</th>
												<th className="px-6 py-3 font-semibold">
													Principal Disbursement Amount
												</th>
												<th className="px-6 py-3 font-semibold">
													Principal Outstanding
												</th>
												<th className="px-6 py-3 font-semibold">
													Interest Outstanding
												</th>
												<th className="px-6 py-3 font-semibold">Outstanding</th>
											</tr>
										</thead>
										<tbody>
											{reportData
												.slice(
													(currentPage - 1) * pageSize,
													currentPage * pageSize
												)
												.map((item, i) => (
													<tr
														key={i}
														className={
															i % 2 === 0 ? "bg-slate-200 text-slate-900" : ""
														}
													>
														<td className="px-6 py-3">
															{i + 1 + (currentPage - 1) * pageSize}
														</td>
														<td className="px-6 py-3">
															{item?.group_code || "---"}
														</td>
														<td className="px-6 py-3">
															{item?.group_name || "---"}
														</td>
														<td className="px-6 py-3">
															{item?.co_id || "---"}
														</td>
														<td className="px-6 py-3">
															{item?.co_name || "---"}
														</td>
														<td className="px-6 py-3">
															{item?.bank_name || "---"}
														</td>
														<td className="px-6 py-3">
															{item?.acc_no1 || "---"}
														</td>
														<td className="px-6 py-3">
															{item?.acc_no2 || "---"}
														</td>
														<td className="px-6 py-3">
															{item?.recovery_day || "---"}
														</td>
														<td className="px-6 py-3">
															{parseFloat(item?.prn_disb_amt)?.toFixed(2) ||
																"---"}
														</td>
														<td className="px-6 py-3">
															{parseFloat(item?.prn_outstanding)?.toFixed(2) ||
																"---"}
														</td>
														<td className="px-6 py-3">
															{parseFloat(item?.intt_outstanding)?.toFixed(2) ||
																"---"}
														</td>
														<td className="px-6 py-3">
															{parseFloat(item?.outstanding)?.toFixed(2) ||
																"---"}
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>
							{/* Pagination Component */}
							<div className="flex justify-end my-4">
								<Pagination
									current={currentPage}
									pageSize={pageSize}
									total={reportData.length}
									onChange={(page) => setCurrentPage(page)}
									showSizeChanger={false}
								/>
							</div>
						</>
					)}

					{reportData.length !== 0 && (
						<div className="flex gap-4">
							<Tooltip title="Export to Excel">
								<button
									onClick={() => exportToExcel(reportData)}
									className="mt-5 justify-center items-center rounded-full text-green-900 disabled:text-green-300"
								>
									<FileExcelOutlined style={{ fontSize: 30 }} />
								</button>
							</Tooltip>
							<Tooltip title="Print">
								<button
									onClick={() =>
										printTableOutstandingReport(
											reportData,
											"Outstanding Report",
											searchType,
											userDetails?.branch_name,
											fromDate,
											toDate
										)
									}
									className="mt-5 justify-center items-center rounded-full text-pink-600 disabled:text-pink-300"
								>
									<PrinterOutlined style={{ fontSize: 30 }} />
								</button>
							</Tooltip>
						</div>
					)}
				</main>
			</Spin>
		</div>
	)
}

export default OutstaningReportMain
