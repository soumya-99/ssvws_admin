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
import { printTableRegular } from "../../../Utils/printTableRegular"

// const { RangePicker } = DatePicker
// const dateFormat = "YYYY/MM/DD"

function DemandVsCollectionMain() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""
	const [loading, setLoading] = useState(false)

	const [fromDate, setFromDate] = useState()
	const [toDate, setToDate] = useState()
	const [reportData, setReportData] = useState(() => [])
	// const [reportTxnData, setReportTxnData] = useState(() => [])
	// const [tot_sum, setTotSum] = useState(0)
	// const [search, setSearch] = useState("")

	const [metadataDtls, setMetadataDtls] = useState(
		() => userDetails?.branch_name
	)

	const handleFetchReport = async () => {
		setLoading(true)
		const creds = {
			from_dt: formatDateToYYYYMMDD(fromDate),
			to_dt: formatDateToYYYYMMDD(toDate),
			branch_code: userDetails?.brn_code,
		}

		await axios
			.post(`${url}/dmd_vs_collec_report`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.msg)
				// setTotSum(res?.data?.msg.reduce((n, { credit }) => n + credit, 0))
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const handleSubmit = () => {
		if (
			fromDate &&
			toDate
			// &&
			// new Date(fromDate)?.toLocaleDateString()?.length === 10 &&
			// new Date(toDate)?.toLocaleDateString()?.length === 10
		) {
			handleFetchReport()
		}
	}

	const exportToExcel = (data) => {
		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.json_to_sheet(data)
		XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
		const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" })
		const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" })
		saveAs(blob, `Demand_Vs_Collection_${metadataDtls}.xlsx`)
	}

	const s2ab = (s) => {
		const buf = new ArrayBuffer(s.length)
		const view = new Uint8Array(buf)
		for (let i = 0; i < s.length; i++) {
			view[i] = s.charCodeAt(i) & 0xff
		}
		return buf
	}

	let totCred = 0
	let totDisbAmt = 0
	let totCurrDmdAmt = 0
	let totOvdDmdAmt = 0
	let totCollec = 0
	let totCurrPrin = 0
	let totOvdPrin = 0

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
							DEMAND VS. COLLECTION
						</div>
					</div>

					<div className="mb-2 flex justify-start gap-5 items-center">
						{/* R.I.P Sweet bro */}

						{/* <div>
							<div className="text-slate-800">Choose Date:</div>
							<RangePicker
								className="p-2 shadow-md"
								format={dateFormat}
								onChange={(dates, dateStrings) => {
									console.log("-------dates", dates)
									console.log("-------dateStrings", dateStrings)
									setFromDate(dateStrings[0])
									setToDate(dateStrings[1])
								}}
							/>
						</div> */}
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

						<div>
							<button
								className={`inline-flex items-center px-4 py-2 mt-0 ml-0 sm:mt-0 text-sm font-small text-center text-white border hover:border-green-600 border-teal-500 bg-teal-500 transition ease-in-out hover:bg-green-600 duration-300 rounded-full  dark:focus:ring-primary-900`}
								onClick={() => {
									handleSubmit()
								}}
							>
								<SearchOutlined /> <spann class={`ml-2`}>Search</spann>
							</button>
						</div>
					</div>

					{/* For Recovery/Collection Results MR */}

					{reportData.length > 0 && (
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
								<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
									<thead className="w-full text-xs uppercase text-slate-50 bg-slate-800 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
										<tr className="text-center">
											<th scope="col" className="px-6 py-3 font-semibold ">
												Sl. No.
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Branch Code
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												From
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												To
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Member Code
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Group Code
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Loan ID
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Disbursed Date
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Disbursed Amount
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Current ROI
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Period
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Period Mode
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Installment Start Date
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Installment End Date
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Total EMI
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Current DMD Amount
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Overdue DMD Amount
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Collection Amount
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Current Principal
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Overdue Principal
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Interest Amount
											</th>
										</tr>
									</thead>
									<tbody>
										{reportData?.map((item, i) => {
											// totCred += +item?.tot_credit
											// totDebit += +item?.tot_debit
											// totOut += +item?.tot_outstanding
											totDisbAmt += +item?.disbursed_amount
											totCurrDmdAmt += +item?.curr_dmd_amt
											totOvdDmdAmt += +item?.ovd_dmd_amt
											totCollec += +item?.coll_amt
											totCurrPrin += +item?.current_principal
											totOvdPrin += +item?.overdue_principal

											return (
												<tr
													key={i}
													className={
														i % 2 === 0
															? "bg-slate-200 text-slate-900 text-center"
															: "text-center"
													}
												>
													<td className="px-6 py-3">{i + 1}</td>
													<td className="px-6 py-3">
														{item?.branch_code || "---"}
													</td>
													<td className="px-6 py-3">
														{item?.from_dt
															? new Date(item?.from_dt)?.toLocaleDateString(
																	"en-GB"
															  )
															: "Err" || "---"}
													</td>
													<td className="px-6 py-3">
														{item?.to_dt
															? new Date(item?.to_dt)?.toLocaleDateString(
																	"en-GB"
															  )
															: "Err" || "---"}
													</td>
													<td className="px-6 py-3">
														{item?.member_code || "---"}
													</td>
													<td className="px-6 py-3">
														{item?.group_code || "---"}
													</td>
													<td className="px-6 py-3">
														{item?.loan_id || "---"}
													</td>
													<td className="px-6 py-3">
														{item?.disbursed_date
															? new Date(
																	item?.disbursed_date
															  )?.toLocaleDateString("en-GB")
															: "Err" || "---"}
													</td>
													<td className="px-6 py-3">
														{parseFloat(item?.disbursed_amount)?.toFixed(2) ||
															"0"}
													</td>
													<td className="px-6 py-3">
														{item?.current_roi || "---"}
													</td>
													<td className="px-6 py-3">{item?.period || "---"}</td>
													<td className="px-6 py-3">
														{item?.period_mode || "---"}
													</td>
													<td className="px-6 py-3">
														{item?.installment_start_date
															? new Date(
																	item?.installment_start_date
															  )?.toLocaleDateString("en-GB")
															: "Err" || "---"}
													</td>
													<td className="px-6 py-3">
														{item?.installment_end_date
															? new Date(
																	item?.installment_end_date
															  )?.toLocaleDateString("en-GB")
															: "Err" || "---"}
													</td>
													<td className="px-6 py-3">
														{parseFloat(item?.total_emi)?.toFixed(2) || "0"}
													</td>
													<td className="px-6 py-3">
														{parseFloat(item?.curr_dmd_amt)?.toFixed(2) || "0"}
													</td>
													<td className="px-6 py-3">
														{parseFloat(item?.ovd_dmd_amt)?.toFixed(2) || "0"}
													</td>
													<td className="px-6 py-3">
														{parseFloat(item?.coll_amt)?.toFixed(2) || "0"}
													</td>
													<td className="px-6 py-3">
														{parseFloat(item?.current_principal)?.toFixed(2) ||
															"0"}
													</td>
													<td className="px-6 py-3">
														{parseFloat(item?.overdue_principal)?.toFixed(2) ||
															"0"}
													</td>
													<td className="px-6 py-3">
														{parseFloat(item?.interest_amount)?.toFixed(2) ||
															"0"}
													</td>
												</tr>
											)
										})}
										<tr className="bg-slate-700 text-slate-50 text-center text-sm sticky bottom-0">
											<td colSpan={1}>TOTAL:</td>
											<td colSpan={7}></td>
											<td colSpan={1}>{totDisbAmt}/-</td>
											<td colSpan={6}></td>
											<td colSpan={1}>{totCurrDmdAmt?.toFixed(2)}/-</td>
											<td colSpan={1}>{totOvdDmdAmt?.toFixed(2)}/-</td>
											<td colSpan={1}>{totCollec?.toFixed(2)}/-</td>
											<td colSpan={1}>{totCurrPrin?.toFixed(2)}/-</td>
											<td colSpan={1}>{totOvdPrin?.toFixed(2)}/-</td>
											<td colSpan={12}></td>
										</tr>
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
											"Demand vs. Collection Report",
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

export default DemandVsCollectionMain
