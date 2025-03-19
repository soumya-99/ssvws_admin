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
import { printTableOutstandingReport } from "../../../Utils/printTableOutstandingReport"
import DynamicTailwindTable from "../../../Components/Reports/DynamicTailwindTable"
import {
	cowiseOutstandingHeader,
	fundwiseOutstandingHeader,
	groupwiseOutstandingHeader,
} from "../../../Utils/Reports/headerMap"

const options = [
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

function OutstaningReportMain() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""
	const [loading, setLoading] = useState(false)
	const [searchType, setSearchType] = useState("G")
	const [fromDate, setFromDate] = useState()
	const [toDate, setToDate] = useState()
	const [reportData, setReportData] = useState([])
	const [metadataDtls, setMetadataDtls] = useState(null)
	const [fetchedReportDate, setFetchedReportDate] = useState(() => "")
	const [funds, setFunds] = useState([])
	const [selectedFund, setSelectedFund] = useState("")
	const [cos, setCOs] = useState([])
	const [selectedCO, setSelectedCO] = useState("")

	const onChange = (e) => {
		console.log("radio1 checked", e)
		setSearchType(e)
	}

	const handleFetchReportOutstandingMemberwise = async () => {
		setLoading(true)

		const creds = {
			branch_code: userDetails?.brn_code,
			supply_date: formatDateToYYYYMMDD(fromDate),
		}

		await axios
			.post(`${url}/loan_outstanding_report_memberwise`, creds)
			.then((res) => {
				const data = res?.data?.outstanding_member_data?.msg || []
				if (data.length === 0) {
					console.log("--------------- NO DATA ---------------", data?.length)
				}

				console.log("---------- DATA MEMBERWISE -----------", res?.data)
				setFetchedReportDate(
					new Date(res?.data?.balance_date).toLocaleDateString("en-GB")
				)
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
			branch_code: userDetails?.brn_code,
			supply_date: formatDateToYYYYMMDD(fromDate),
		}

		await axios
			.post(`${url}/loan_outstanding_report_groupwise`, creds)
			.then((res) => {
				const data = res?.data?.outstanding_data?.msg || []
				if (data.length === 0) {
					console.log(
						"--------------- LOOP BREAKS ---------------",
						data?.length
					)
				}

				console.log("---------- DATA GROUPWISE -----------", res?.data)
				setFetchedReportDate(
					new Date(res?.data?.balance_date).toLocaleDateString("en-GB")
				)
				setReportData(data)
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

	const handleFetchReportOutstandingFundwise = async () => {
		setLoading(true)

		const creds = {
			supply_date: formatDateToYYYYMMDD(fromDate),
			branch_code: userDetails?.brn_code,
			fund_id: selectedFund,
		}

		await axios
			.post(`${url}/loan_outstanding_report_fundwise`, creds)
			.then((res) => {
				const data = res?.data?.outstanding_fund_data?.msg || []
				if (data.length === 0) {
					console.log("--------------- NO DATA ---------------", data?.length)
				}

				console.log("---------- DATA FUNDWISE -----------", res?.data)
				setFetchedReportDate(
					new Date(res?.data?.balance_date).toLocaleDateString("en-GB")
				)
				setReportData(data)
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

	const handleFetchReportOutstandingCOwise = async () => {
		setLoading(true)

		const creds = {
			supply_date: formatDateToYYYYMMDD(fromDate),
			branch_code: userDetails?.brn_code,
			co_id: selectedCO,
		}

		await axios
			.post(`${url}/loan_outstanding_report_cowise`, creds)
			.then((res) => {
				const data = res?.data?.outstanding_co_data?.msg || []
				if (data.length === 0) {
					console.log("--------------- NO DATA ---------------", data?.length)
				}

				console.log("---------- DATA CO-wise -----------", res?.data)
				setFetchedReportDate(
					new Date(res?.data?.balance_date).toLocaleDateString("en-GB")
				)
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
		} else if (searchType === "F" && fromDate) {
			handleFetchReportOutstandingFundwise()
		} else if (searchType === "C" && fromDate) {
			handleFetchReportOutstandingCOwise()
		}
	}

	// Reset states when searchType changes
	useEffect(() => {
		setReportData([])
		setMetadataDtls(null)
		if (searchType === "F") {
			getFunds()
		}
		if (searchType === "C") {
			getCOs()
		}
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
						Branch: {userDetails?.branch_name} as on {fetchedReportDate}
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
						{searchType === "F" && (
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

						{searchType === "C" && (
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
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[33, 34, 35]}
								dateTimeExceptionCols={[6]}
							/>
						</>
					)}

					{/* Groupwise Results with Pagination */}
					{searchType === "G" && reportData.length > 0 && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[8, 9, 10]}
								headersMap={groupwiseOutstandingHeader}
							/>
						</>
					)}

					{/* Fundwise Results with Pagination */}
					{searchType === "F" && reportData.length > 0 && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[5, 6, 7]}
								headersMap={fundwiseOutstandingHeader}
							/>
						</>
					)}

					{/* COwise Results with Pagination */}
					{searchType === "C" && reportData.length > 0 && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[4, 5, 6]}
								headersMap={cowiseOutstandingHeader}
							/>
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
