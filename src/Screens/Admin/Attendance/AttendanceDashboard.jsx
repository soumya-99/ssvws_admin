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

// const { RangePicker } = DatePicker
// const dateFormat = "YYYY/MM/DD"

function AttendanceDashboard() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""
	const [loading, setLoading] = useState(false)

	// const [openModal, setOpenModal] = useState(false)
	// const [approvalStatus, setApprovalStatus] = useState("S")
	const [searchType, setSearchType] = useState(() => "D")
	const [searchType2, setSearchType2] = useState(() => "M")

	const [fromDate, setFromDate] = useState()
	const [toDate, setToDate] = useState()
	const [reportData, setReportData] = useState(() => [])
	const [branch, setBranch] = useState(() => "")
	const [branches, setBranches] = useState(() => [])
	// const [reportTxnData, setReportTxnData] = useState(() => [])
	// const [tot_sum, setTotSum] = useState(0)
	// const [search, setSearch] = useState("")

	const [metadataDtls, setMetadataDtls] = useState(() => "")

	const handleFetchBranches = async () => {
		setLoading(true)
		await axios
			.get(`${url}/fetch_all_branch_dt`)
			.then((res) => {
				console.log("QQQQQQQQQQQQQQQQ", res?.data)
				setBranches(res?.data?.msg)
			})
			.catch((err) => {
				console.log("?????????????????????", err)
			})

		setLoading(false)
	}

	useEffect(() => {
		handleFetchBranches()
	}, [])

	const handleFetchReport = async () => {
		setLoading(true)
		const creds = {
			from_date: formatDateToYYYYMMDD(fromDate),
			to_date: formatDateToYYYYMMDD(toDate),
			branch_id: branch.split(",")[0],
		}
		console.log("KKKKKKKKKKKKKKKKKKK======", branch)
		await axios
			.post(`${url}/adminreport/attendance_report_admin`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.msg)
				setMetadataDtls(branch.split(",")[1])
				console.log("KKKKKKKKKKKKKKKKKKK", branch)
				// setTotSum(res?.data?.msg.reduce((n, { credit }) => n + credit, 0))
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const handleSubmit = () => {
		if (fromDate && toDate && branch) {
			handleFetchReport()
		}
	}

	// useEffect(() => {
	// 	setReportData(() => [])
	// 	// setMetadataDtls(() => null)
	// 	totalCash = 0
	// 	totalUPI = 0
	// 	totalCashAmount = 0
	// 	totalUPIAmount = 0
	// 	totalCreditAmount = 0
	// 	totalDisbAmt = 0
	// }, [searchType, searchType2])

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

	// let totalRecovery = 0
	// let totalCredit = 0
	// let totalDebit = 0
	// let totalCreditGrpwise = 0
	// let totalDebitGrpwise = 0

	const [activeDescriptionId, setActiveDescriptionId] = useState(null)

	const toggleDescription = (userId) => {
		setActiveDescriptionId((prevId) => (prevId === userId ? null : userId))
	}

	// const users = [
	// 	{
	// 		id: "user1",
	// 		name: "Amanda Smith",
	// 		email: "amanda.smith@example.com",
	// 		status: "Active",
	// 		statusColor: "bg-green-500",
	// 		role: "Marketing Coordinator",
	// 		image:
	// 			"https://images.unsplash.com/photo-1560329072-17f59dcd30a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW4lMjBmYWNlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60",
	// 		description:
	// 			"Amanda Smith is a young professional in the field of marketing. She has skills in planning and executing creative digital marketing campaigns. In her free time, Amanda enjoys playing the piano and exploring nature.",
	// 	},
	// 	{
	// 		id: "user2",
	// 		name: "Michael Williams",
	// 		email: "michael.williams@example.com",
	// 		status: "Inactive",
	// 		statusColor: "bg-yellow-500",
	// 		role: "Software Engineer",
	// 		image:
	// 			"https://images.pexels.com/photos/1054048/pexels-photo-1054048.jpeg?auto=compress&cs=tinysrgb&w=600",
	// 		description:
	// 			"Michael Williams is a software engineer with an in-depth knowledge of web and application development. He is often involved in creating innovative technological solutions. During his leisure time, Michael enjoys playing video games and participating in local chess tournaments.",
	// 	},
	// 	{
	// 		id: "user3",
	// 		name: "Sophia Brown",
	// 		email: "sophia.brown@example.com",
	// 		status: "Suspend",
	// 		statusColor: "bg-red-500",
	// 		role: "Freelance Writer",
	// 		image:
	// 			"https://images.pexels.com/photos/3756907/pexels-photo-3756907.jpeg?auto=compress&cs=tinysrgb&w=600",
	// 		description:
	// 			"Sophia Brown is a prolific freelance writer, crafting informative articles and creative content for various clients. In her life, she's always seeking new inspiration by attending art exhibitions and literary events.",
	// 	},
	// ]

	let totalCash = 0
	let totalUPI = 0
	let totalCashAmount = 0
	let totalUPIAmount = 0

	let totalCreditAmount = 0

	//////////////////////////////////

	let totalDisbAmt = 0

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
							ATTENDANCE DASHBOARD
						</div>
					</div>

					<div className="grid grid-cols-3 gap-5 mt-5">
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

						<div>
							<TDInputTemplateBr
								placeholder="Branch..."
								type="text"
								label="Branch"
								name="branch"
								formControlName={branch.split(",")[0]}
								handleChange={(e) => {
									console.log("***********========", e)
									// setBranch(
									// 	e.target.value +
									// 		"," +
									// 		branches.filter((i) => i.branch_code == e.target.value)[0]
									// 			?.branch_name
									// )
									setBranch(
										e.target.value +
											"," +
											[
												{ branch_code: "A", branch_name: "All Branches" },
												...branches,
											].filter((i) => i.branch_code == e.target.value)[0]
												?.branch_name
									)
									console.log(branches)
									console.log(
										e.target.value +
											"," +
											[
												{ branch_code: "A", branch_name: "All Branches" },
												...branches,
											].filter((i) => i.branch_code == e.target.value)[0]
												?.branch_name
									)
								}}
								mode={2}
								// data={branches?.map((item, i) => ({
								// 	code: item?.branch_code,
								// 	name: item?.branch_name,
								// }))}
								data={[
									{ code: "A", name: "All Branches" },
									...branches?.map((item, i) => ({
										code: item?.branch_code,
										name: item?.branch_name,
									})),
								]}
							/>
						</div>

						<div>
							<button
								className={`inline-flex items-center px-4 py-2 mt-0 ml-0 sm:mt-0 text-sm font-small text-center text-white border hover:border-green-600 border-teal-500 bg-teal-500 transition ease-in-out hover:bg-green-600 duration-300 rounded-full  dark:focus:ring-primary-900`}
								onClick={() => {
									handleSubmit()
								}}
							>
								<SearchOutlined /> <span class={`ml-2`}>Search</span>
							</button>
						</div>
					</div>

					{/* For Recovery/Collection Results MR */}

					{reportData?.length > 0 && (
						<div
							className={`relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-[500px]
                                [&::-webkit-scrollbar]:w-1
                                [&::-webkit-scrollbar-track]:rounded-full
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-thumb]:bg-gray-300
                                dark:[&::-webkit-scrollbar-track]:bg-transparent
                                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                            `}
						>
							<div
								className={`w-full text-xs dark:bg-gray-700 dark:text-gray-400`}
							>
								<table className="w-full table-auto">
									<thead>
										<tr className="text-sm font-normal text-slate-50 border-t border-b text-left bg-slate-800">
											<th className="px-4 py-2 text-left">Sl. No.</th>
											<th className="px-4 py-2 text-left">Employee ID</th>
											<th className="px-4 py-2 text-left">Name</th>
											<th className="px-4 py-2 text-left">Clock In</th>
											<th className="px-4 py-2 text-left">Clock Out</th>
											<th className="px-4 py-2 text-left"></th>
										</tr>
									</thead>
									<tbody className="text-sm font-normal text-gray-700">
										{reportData?.map((user, i) => (
											<React.Fragment key={user.id}>
												<tr
													className={`cursor-pointer border-b border-gray-200 hover:bg-gray-100 ${
														i % 2 === 0 ? "bg-slate-200 text-slate-900" : ""
													}`}
													onClick={() => toggleDescription(i)}
												>
													<td className="px-4 py-2 text-left">{i + 1}</td>
													<td className="px-4 py-2 text-left">{user.emp_id}</td>
													<td className="px-4 py-2 text-left">
														{user.emp_name}
													</td>
													<td className="px-4 py-2 text-left">
														{new Date(user?.in_date_time)
															?.toLocaleTimeString("en-GB", {
																hour: "2-digit",
																minute: "2-digit",
																hour12: true,
															})
															.replace("am", "AM")
															.replace("pm", "PM")}
													</td>
													<td className="px-4 py-2 text-left">
														{new Date(user?.out_date_time)
															?.toLocaleTimeString("en-GB", {
																hour: "2-digit",
																minute: "2-digit",
																hour12: true,
															})
															.replace("am", "AM")
															.replace("pm", "PM")}
													</td>
													<td className="p-2 text-left">
														<div
															className={`text-white bg-gray-100 border rounded-lg px-2 py-2 text-center inline-flex items-center ${
																activeDescriptionId === i ? "flipped-icon" : ""
															}`}
														>
															<svg
																className={`w-4 h-4 transition-transform ${
																	activeDescriptionId === i ? "rotate-180" : ""
																}`}
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 24 24"
															>
																<path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path>
															</svg>
														</div>
													</td>
												</tr>
												{activeDescriptionId === i && (
													<tr
														className="py-2 px-2 border-t border-gray-200 transition-all duration-300 ease-in-out transform"
														style={{
															height: activeDescriptionId === i ? "auto" : "0",
															opacity: activeDescriptionId === i ? "1" : "0",
														}}
													>
														<td colSpan="4" className="p-4">
															<h4 className="font-medium text-base text-blue-500 underline mb-2">
																Description
															</h4>
															<p className="text-sm text-gray-600">
																{user.description}
															</p>
														</td>
													</tr>
												)}
											</React.Fragment>
										))}
									</tbody>
								</table>
							</div>
						</div>
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
											"Attendance Report",
											searchType,
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

export default AttendanceDashboard
