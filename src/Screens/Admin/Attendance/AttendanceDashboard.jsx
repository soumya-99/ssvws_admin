import React, { useEffect, useState } from "react"
import Sidebar from "../../../Components/Sidebar"
import axios from "axios"
import { url } from "../../../Address/BaseUrl"
import { Message } from "../../../Components/Message"
import { Spin, Button, Modal, Tooltip, DatePicker, Popconfirm } from "antd"
import {
	LoadingOutlined,
	SearchOutlined,
	PrinterOutlined,
	FileExcelOutlined,
	CheckCircleOutlined,
} from "@ant-design/icons"
import TDInputTemplateBr from "../../../Components/TDInputTemplateBr"
import { formatDateToYYYYMMDD } from "../../../Utils/formateDate"

import { saveAs } from "file-saver"
import * as XLSX from "xlsx"
import { printTableRegular } from "../../../Utils/printTableRegular"

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
				setMetadataDtls(branch)
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

	const exportToExcel = (data) => {
		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.json_to_sheet(data)
		XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
		const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" })
		const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" })
		saveAs(blob, `attendance_report_${metadataDtls}.xlsx`)
	}

	const s2ab = (s) => {
		const buf = new ArrayBuffer(s.length)
		const view = new Uint8Array(buf)
		for (let i = 0; i < s.length; i++) {
			view[i] = s.charCodeAt(i) & 0xff
		}
		return buf
	}

	const [activeDescriptionId, setActiveDescriptionId] = useState(null)

	const toggleDescription = (userId) => {
		setActiveDescriptionId((prevId) => (prevId === userId ? null : userId))
	}

	const [remarksForDelete, setRemarksForDelete] = useState(() => "")

	const handleRejectAttendance = async (empId, inDateTime) => {
		setLoading(true)
		const creds = {
			emp_id: empId,
			in_date_time: inDateTime,
			attn_reject_remarks: remarksForDelete,
			rejected_by: userDetails?.emp_id,
		}

		await axios
			.post(`${url}/adminreport/reject_atten`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				Message("success", "Attendance Rejected Successfully")
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const confirm = async (empId, inDateTime) => {
		if (!remarksForDelete) {
			Message("error", "Please provide remarks for rejection")
			return
		}

		await handleRejectAttendance(empId, inDateTime)
			.then(() => {
				// fetchLoanApplications("R")
				setRemarksForDelete("")
			})
			.catch((err) => {
				console.log("Err in RecoveryMemberApproveTable.jsx", err)
			})
	}

	const cancel = (e) => {
		console.log(e)
		setRemarksForDelete("")
		// message.error('Click on No');
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
														className={`transition-all duration-300 ease-in-out transform ${
															activeDescriptionId === i
																? "max-h-screen opacity-100"
																: "max-h-0 opacity-0"
														} overflow-hidden`}
														style={{
															height: activeDescriptionId === i ? "auto" : "0",
															opacity: activeDescriptionId === i ? "1" : "0",
														}}
													>
														<td colSpan={6} className="p-0">
															<div className="m-4 p-6 bg-white rounded-2xl shadow-md">
																<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
																	<div>
																		<h4 className="font-medium text-lg text-blue-600 mb-2">
																			Clock In Location
																		</h4>
																		<p className="text-sm text-gray-700">
																			{user?.in_addr}
																		</p>
																	</div>
																	<div>
																		<h4 className="font-medium text-lg text-blue-600 mb-2">
																			Clock Out Location
																		</h4>
																		<p className="text-sm text-gray-700">
																			{user?.out_addr}
																		</p>
																	</div>
																	<div>
																		<h4 className="font-medium text-lg text-blue-600 mb-2">
																			Attendance Status
																		</h4>
																		<p
																			className={`text-sm ${
																				user?.attan_status === "A"
																					? "text-green-500"
																					: user?.attan_status === "R"
																					? "text-red-500"
																					: "text-gray-700"
																			}`}
																		>
																			{user?.attan_status === "A"
																				? "Approved"
																				: user?.attan_status === "R"
																				? "Rejected"
																				: "Pending"}
																		</p>
																	</div>
																	<div>
																		<h4 className="font-medium text-lg text-blue-600 mb-2">
																			Clock Status
																		</h4>
																		<span
																			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
																				user?.clock_status === "I"
																					? "bg-green-100 text-green-800"
																					: user?.clock_status === "O"
																					? "bg-blue-100 text-blue-800"
																					: user?.clock_status === "E"
																					? "bg-yellow-100 text-yellow-800"
																					: "bg-red-100 text-red-800"
																			}`}
																		>
																			{user?.clock_status === "I" ? (
																				<span className="mr-1">✅</span>
																			) : user?.clock_status === "O" ? (
																				<span className="mr-1">🕒</span>
																			) : user?.clock_status === "E" ? (
																				<span className="mr-1">🐌</span>
																			) : (
																				<span className="mr-1">⌛</span>
																			)}
																			{user?.clock_status === "I"
																				? "Proper In"
																				: user?.clock_status === "O"
																				? "Proper Out"
																				: user?.clock_status === "E"
																				? "Early Out"
																				: "Late In"}
																		</span>
																	</div>
																	<div>
																		<h4 className="font-medium text-lg text-blue-600 mb-2">
																			Rejection Remarks
																		</h4>
																		<p className="text-sm text-gray-700">
																			{user?.attn_reject_remarks || "N/A"}
																		</p>
																	</div>
																	<div>
																		<h4 className="font-medium text-lg text-blue-600 mb-2">
																			Late In
																		</h4>
																		<span
																			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
																				user?.late_in === "Y"
																					? "bg-red-100 text-red-800"
																					: "bg-green-100 text-green-800"
																			}`}
																		>
																			{user?.late_in === "Y" ? (
																				<span className="mr-1">🐌</span>
																			) : (
																				<span className="mr-1">•</span>
																			)}
																			{user?.late_in === "Y"
																				? "Late"
																				: "On Time"}
																		</span>
																	</div>
																	<div>
																		<h4 className="font-medium text-lg text-blue-600 mb-2">
																			Early Out
																		</h4>
																		<span
																			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
																				user?.early_out === "Y"
																					? "bg-red-100 text-red-800"
																					: "bg-green-100 text-green-800"
																			}`}
																		>
																			{user?.early_out === "Y" ? (
																				<span className="mr-1">🐌</span>
																			) : (
																				<span className="mr-1">•</span>
																			)}
																			{user?.early_out === "Y"
																				? "Early Out"
																				: "On Time"}
																		</span>
																	</div>
																	<div className="flex items-center">
																		<Popconfirm
																			title={`Reject Attendance for ${user?.emp_name}`}
																			description={
																				<>
																					<div>
																						Are you sure you want to reject this
																						attendance?
																					</div>
																					<TDInputTemplateBr
																						placeholder="Type remarks for rejection..."
																						type="text"
																						label="Reason for Rejection*"
																						name="remarksForDelete"
																						formControlName={remarksForDelete}
																						handleChange={(e) =>
																							setRemarksForDelete(
																								e.target.value
																							)
																						}
																						mode={3}
																					/>
																				</>
																			}
																			onConfirm={() =>
																				confirm(
																					user?.emp_id,
																					user?.in_date_time
																				)
																			}
																			onCancel={cancel}
																			okText="Reject"
																			cancelText="Cancel"
																		>
																			<button className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-red-500 border border-red-500 rounded-full hover:bg-red-600 hover:border-red-600 transition ease-in-out duration-300">
																				<CheckCircleOutlined />
																				<span className="ml-2">
																					Reject Attendance
																				</span>
																			</button>
																		</Popconfirm>
																	</div>
																</div>
															</div>
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
										printTableRegular(
											reportData,
											"Attendance Report",
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
