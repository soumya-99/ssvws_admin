import React, { useEffect, useState } from "react"
import Sidebar from "../../../Components/Sidebar"
import axios from "axios"
import { url } from "../../../Address/BaseUrl"
import { Message } from "../../../Components/Message"
import { Spin, Button, Modal } from "antd"
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons"
import Radiobtn from "../../../Components/Radiobtn"
import TDInputTemplateBr from "../../../Components/TDInputTemplateBr"
import { formatDateToYYYYMMDD } from "../../../Utils/formateDate"

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

function LoanStatementMain() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""
	const [loading, setLoading] = useState(false)

	const [openModal, setOpenModal] = useState(false)
	// const [approvalStatus, setApprovalStatus] = useState("S")
	const [searchType, setSearchType] = useState(() => "M")

	const [fromDate, setFromDate] = useState()
	const [toDate, setToDate] = useState()
	const [reportData, setReportData] = useState(() => [])
	const [reportTxnData, setReportTxnData] = useState(() => [])
	// const [tot_sum, setTotSum] = useState(0)
	const [search, setSearch] = useState("")

	const onChange = (e) => {
		console.log("radio1 checked", e)
		setSearchType(e)
	}

	const handleFetchReportForMembers = async () => {
		setLoading(true)
		const creds = {
			memb: search,
		}

		await axios
			.post(`${url}/loan_statement_memb_dtls`, creds)
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

	useEffect(() => {
		if (searchType && search.length > 2) {
			handleFetchReportForMembers()
		}
	}, [searchType, search])

	const handleFetchLoanView = async (loanId) => {
		setLoading(true)
		const creds = {
			from_dt: formatDateToYYYYMMDD(fromDate),
			to_dt: formatDateToYYYYMMDD(toDate),
			loan_id: loanId || "",
		}

		await axios
			.post(`${url}/loan_statement_report`, creds)
			.then((res) => {
				console.log("RESSSSS XX======>>>>", res?.data)
				setReportTxnData(res?.data?.msg)
				// setTotSum(res?.data?.msg.reduce((n, { credit }) => n + credit, 0))
			})
			.catch((err) => {
				console.log("ERRRR>>>>>>>", err)
			})

		setLoading(false)
	}

	// useEffect(() => {}, [fromDate, toDate])

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
						<div className="text-3xl text-teal-700">LOAN STATEMENTS</div>
					</div>

					<div className="mb-2">
						<Radiobtn
							data={options}
							val={searchType}
							onChangeVal={(value) => {
								onChange(value)
							}}
						/>
					</div>

					<div class="my-4 mx-auto">
						<TDInputTemplateBr
							placeholder={
								searchType === "M" ? `Member Name / ID` : `Group Name / ID`
							}
							type="text"
							label={
								searchType === "M" ? `Member Name / ID` : `Group Name / ID`
							}
							name="search_val"
							handleChange={(txt) => setSearch(txt.target.value)}
							formControlName={search}
							mode={1}
						/>
					</div>

					{reportData.length > 0 && (
						<div className="grid grid-cols-2 gap-5 mt-5">
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
						</div>
					)}

					{reportData.length > 0 && (
						<div
							className={`relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-96`}
						>
							<div
								className={`w-full text-xs dark:bg-gray-700 dark:text-gray-400`}
							>
								<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
									<thead className="w-full text-xs uppercase text-slate-50 bg-slate-800 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
										<tr>
											<th scope="col" className="px-6 py-3 font-semibold ">
												{searchType === "M" ? "Member Code" : "Group Code"}
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												{searchType === "M" ? "Member Name" : "Group Name"}
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Loan ID
											</th>
											<th scope="col" className="px-6 py-3 font-semibold ">
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{reportData?.map((item, i) => {
											return (
												<tr
													key={i}
													className={
														i % 2 === 0 ? "bg-slate-200 text-slate-900" : ""
													}
												>
													<td className="px-6 py-3">{item?.member_code}</td>
													<td className="px-6 py-3">{item?.client_name}</td>
													<td className="px-6 py-3">{item?.loan_id}</td>
													<td className="px-6 py-3">
														<button
															// onClick={() => handleFetchLoanView(item?.loan_id)}
															onClick={async () => {
																await handleFetchLoanView(item?.loan_id)
																setOpenModal(true)
															}}
															className="text-pink-600 disabled:text-pink-400 disabled:cursor-not-allowed"
															disabled={!fromDate || !toDate}
														>
															View
														</button>
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</div>
					)}

					{/* ///////////////////////////////////////////////////////////////// */}

					<Modal
						title="View Transaction Details"
						centered
						open={openModal}
						onOk={() => setOpenModal(false)}
						onCancel={() => setOpenModal(false)}
						width={1500}
					>
						{reportTxnData.length > 0 && (
							<div
								className={`relative overflow-x-auto shadow-md sm:rounded-lg mt-5 max-h-96`}
							>
								<div
									className={`w-full text-xs dark:bg-gray-700 dark:text-gray-400`}
								>
									<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
										<thead className="w-full text-xs uppercase text-slate-50 bg-slate-800 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
											<tr>
												<th scope="col" className="px-6 py-3 font-semibold ">
													Txn. Date
												</th>
												<th scope="col" className="px-6 py-3 font-semibold ">
													Txn. No.
												</th>
												<th scope="col" className="px-6 py-3 font-semibold ">
													Credit
												</th>
												<th scope="col" className="px-6 py-3 font-semibold ">
													Debit
												</th>
												<th scope="col" className="px-6 py-3 font-semibold ">
													Bank Charge
												</th>
												<th scope="col" className="px-6 py-3 font-semibold ">
													Processing Charge
												</th>
												<th scope="col" className="px-6 py-3 font-semibold ">
													Balance
												</th>
												<th scope="col" className="px-6 py-3 font-semibold ">
													Txn. Type
												</th>
												<th scope="col" className="px-6 py-3 font-semibold ">
													Txn. Mode
												</th>
											</tr>
										</thead>
										<tbody>
											{reportTxnData?.map((item, i) => {
												return (
													<tr
														key={i}
														className={
															i % 2 === 0 ? "bg-slate-200 text-slate-900" : ""
														}
													>
														<td className="px-6 py-3">
															{new Date(item?.trans_date)?.toLocaleDateString(
																"en-GB"
															)}
														</td>
														<td className="px-6 py-3">{item?.trans_no}</td>
														<td className="px-6 py-3">{item?.credit}</td>
														<td className="px-6 py-3">{item?.debit}</td>
														<td className="px-6 py-3">{item?.bank_charge}</td>
														<td className="px-6 py-3">{item?.proc_charge}</td>
														<td className="px-6 py-3">{item?.balance}</td>
														<td className="px-6 py-3">
															{item?.tr_type === "D"
																? "Disbursement"
																: item?.tr_type === "R"
																? "Recovery"
																: "Error"}
														</td>
														<td className="px-6 py-3">
															{item?.tr_mode === "C"
																? "Cash"
																: item?.tr_mode === "B"
																? "UPI"
																: "Error"}
														</td>
													</tr>
												)
											})}
										</tbody>
									</table>
								</div>
							</div>
						)}
					</Modal>
				</main>
			</Spin>
		</div>
	)
}

export default LoanStatementMain
