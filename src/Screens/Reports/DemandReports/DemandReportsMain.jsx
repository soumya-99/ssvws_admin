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
import DynamicTailwindTable from "../../../Components/Reports/DynamicTailwindTable"
import Select from "react-select"
import {
	branchwiseDemandReportHeader,
	cowiseDemandReportHeader,
	fundwiseDemandReportHeader,
	groupwiseDemandReportHeader,
	memberwiseDemandReportHeader,
} from "../../../Utils/Reports/headerMap"

// const { RangePicker } = DatePicker
// const dateFormat = "YYYY/MM/DD"

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
	{
		label: "Branchwise",
		value: "B",
	},
]

function DemandReportsMain() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""
	const [loading, setLoading] = useState(false)

	const [fromDate, setFromDate] = useState()
	const [toDate, setToDate] = useState()
	const [reportData, setReportData] = useState(() => [])
	const [searchType, setSearchType] = useState(() => "G")
	const [choosenMonth, setChoosenMonth] = useState(() => "")
	const [choosenYear, setChoosenYear] = useState(() => "")
	const [funds, setFunds] = useState([])
	const [selectedFund, setSelectedFund] = useState("")
	const [co, setCo] = useState(() => "")

	const [cos, setCos] = useState([])
	const [branches, setBranches] = useState([])
	const [selectedCO, setSelectedCO] = useState("")
	const [selectedOptions, setSelectedOptions] = useState([])
	const [selectedCOs, setSelectedCOs] = useState([])
	// const [reportTxnData, setReportTxnData] = useState(() => [])
	// const [tot_sum, setTotSum] = useState(0)
	// const [search, setSearch] = useState("")

	const [metadataDtls, setMetadataDtls] = useState(
		() => userDetails?.branch_name
	)

	const onChange = (e) => {
		console.log("radio1 checked", e)
		setSearchType(e)
	}

	// const handleFetchCO = async () => {
	// 	setLoading(true)
	// 	const creds = {
	// 		branch_code: userDetails?.brn_code,
	// 	}

	// 	await axios
	// 		.post(`${url}/fetch_branch_co`, creds)
	// 		.then((res) => {
	// 			console.log("++++++++++++++", res?.data?.msg)
	// 			setCos(res?.data?.msg)
	// 		})
	// 		.catch((err) => {
	// 			console.log("Some err while fetching Cos...")
	// 		})
	// 	setLoading(false)
	// }

	// useEffect(() => {
	// 	setReportData([])
	// 	if (searchType === "C") {
	// 		handleFetchCO()
	// 	}
	// }, [searchType])

	// "Memberwise"
	const handleFetchMemberwiseReport = async () => {
		setLoading(true)

		const branchCodes = selectedOptions?.map((item, i) => item?.value)

		const creds = {
			send_month: choosenMonth,
			send_year: choosenYear,
			branch_code:
				branchCodes?.length === 0 ? [userDetails?.brn_code] : branchCodes,
		}

		await axios
			.post(`${url}/loan_demand_report_memberwise`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.memberwise_demand_data?.msg)
				// setTotSum(res?.data?.msg.reduce((n, { credit }) => n + credit, 0))
				setMetadataDtls(`${userDetails?.brn_code}, Memberwise`)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	// "Groupwise"
	const handleFetchGroupwiseReport = async () => {
		setLoading(true)

		const branchCodes = selectedOptions?.map((item, i) => item?.value)

		const creds = {
			send_month: choosenMonth,
			send_year: choosenYear,
			branch_code:
				branchCodes?.length === 0 ? [userDetails?.brn_code] : branchCodes,
		}

		await axios
			.post(`${url}/loan_demand_report_groupwise`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.groupwise_demand_data?.msg)
				// setTotSum(res?.data?.msg.reduce((n, { credit }) => n + credit, 0))
				setMetadataDtls(`${userDetails?.brn_code}, Groupwise`)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	// "Branchwise"
	const handleFetchBranchwiseReport = async () => {
		setLoading(true)

		const branchCodes = selectedOptions?.map((item, i) => item?.value)

		const creds = {
			send_month: choosenMonth,
			send_year: choosenYear,
			branch_code:
				branchCodes?.length === 0 ? [userDetails?.brn_code] : branchCodes,
		}

		await axios
			.post(`${url}/loan_demand_report_branchwise`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.branchwise_demand_data?.msg)
				// setTotSum(res?.data?.msg.reduce((n, { credit }) => n + credit, 0))
				setMetadataDtls(`${userDetails?.brn_code}, Groupwise`)
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

	// "Fundwise"
	const handleFetchFundwiseReport = async () => {
		setLoading(true)

		const branchCodes = selectedOptions?.map((item, i) => item?.value)

		const creds = {
			send_month: choosenMonth,
			send_year: choosenYear,
			branch_code:
				branchCodes?.length === 0 ? [userDetails?.brn_code] : branchCodes,
			fund_id: selectedFund,
		}

		await axios
			.post(`${url}/loan_demand_report_fundwise`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.fundwise_demand_data?.msg)
				// setTotSum(res?.data?.msg.reduce((n, { credit }) => n + credit, 0))
				setMetadataDtls(`${userDetails?.brn_code}, Groupwise`)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const getCOs = () => {
		setLoading(true)

		const branchCodes = selectedOptions?.map((item, i) => item?.value)

		const creds = {
			branch_code:
				branchCodes?.length === 0 ? [userDetails?.brn_code] : branchCodes,
		}
		axios
			.post(`${url}/fetch_brn_co_demand`, creds)
			.then((res) => {
				console.log("COs ======>", res?.data)
				setCos(res?.data?.msg)
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

	// "COwise"
	const handleFetchCOwiseReport = async () => {
		setLoading(true)

		const branchCodes = selectedOptions?.map((item, i) => item?.value)
		const coCodes = selectedCOs?.map((item, i) => item?.value)

		const creds = {
			branch_code:
				branchCodes?.length === 0 ? [userDetails?.brn_code] : branchCodes,
			send_month: choosenMonth,
			send_year: choosenYear,
			co_id: coCodes?.length === 0 ? [co?.split(",")[0]] : coCodes,
		}

		await axios
			.post(`${url}/loan_demand_report_cowise`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.cowise_demand_data?.msg)
				// setTotSum(res?.data?.msg.reduce((n, { credit }) => n + credit, 0))
				setMetadataDtls(`${userDetails?.brn_code}, COwise`)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const getBranches = () => {
		setLoading(true)
		const creds = {
			emp_id: userDetails?.emp_id,
			user_type: userDetails?.id,
		}
		axios
			.post(`${url}/fetch_branch_name_based_usertype`, creds)
			.then((res) => {
				console.log("Branches ======>", res?.data)
				setBranches(res?.data?.msg)
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
				setLoading(false)
			})
		setLoading(false)
	}

	useEffect(() => {
		getBranches()
	}, [])

	useEffect(() => {
		setReportData([])
		setSelectedOptions([])
		setSelectedCOs([])
		if (searchType === "F") {
			getFunds()
		}
		if (searchType === "C") {
			getCOs()
		}
	}, [searchType])

	useEffect(() => {
		if (searchType === "C") {
			getCOs()
		}
	}, [selectedOptions])

	const handleSubmit = () => {
		if (!searchType || !choosenMonth || !choosenYear) {
			Message("warning", "Please fill all details")
			return
		}

		if (searchType === "M" && choosenMonth && choosenYear) {
			handleFetchMemberwiseReport()
		}

		if (searchType === "B" && choosenMonth && choosenYear) {
			handleFetchBranchwiseReport()
		}

		if (searchType === "G" && choosenMonth && choosenYear) {
			handleFetchGroupwiseReport()
		}

		if (searchType === "F" && choosenMonth && choosenYear && selectedFund) {
			handleFetchFundwiseReport()
		}

		if (searchType === "C" && choosenMonth && choosenYear) {
			handleFetchCOwiseReport()
		}
	}

	const exportToExcel = (data) => {
		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.json_to_sheet(data)
		XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
		const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" })
		const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" })
		saveAs(
			blob,
			`Demand_Vs_Collection_${metadataDtls?.split(",")[0]}_${
				metadataDtls?.split(",")[1]
			}.xlsx`
		)
	}

	const s2ab = (s) => {
		const buf = new ArrayBuffer(s.length)
		const view = new Uint8Array(buf)
		for (let i = 0; i < s.length; i++) {
			view[i] = s.charCodeAt(i) & 0xff
		}
		return buf
	}

	// Example options for the dropdown
	const dropdownOptions = branches?.map((branch) => ({
		value: branch.branch_assign_id,
		label: `${branch.branch_name} - ${branch.branch_assign_id}`,
	}))

	// Handle change for multi-select
	const handleMultiSelectChange = (selected) => {
		if (selected.some((option) => option.value === "all")) {
			// If "All" is selected, select all options
			setSelectedOptions(dropdownOptions)
		} else {
			setSelectedOptions(selected)
		}
	}

	// Example options for the dropdown
	const dropdownCOs = cos?.map((branch) => ({
		value: branch.co_id,
		label: `${branch.emp_name} - ${branch.co_id}`,
	}))

	// Handle change for multi-select
	const handleMultiSelectChangeCOs = (selected) => {
		if (selected.some((option) => option.value === "all")) {
			// If "All" is selected, select all options
			setSelectedCOs(dropdownCOs)
		} else {
			setSelectedCOs(selected)
		}
	}

	const months = Array.from({ length: 12 }, (_, i) => ({
		code: i + 1,
		name: new Date(0, i).toLocaleString("en", { month: "long" }),
	}))

	const years = Array.from({ length: 301 }, (_, i) => ({
		code: 1900 + i,
		name: (1900 + i).toString(),
	}))

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
							DEMAND REPORT
						</div>
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

					<div>
						{(userDetails?.id === 3 ||
							userDetails?.id === 4 ||
							userDetails?.id === 11) &&
							userDetails?.brn_code == 100 && (
								<div className="w-full">
									<Select
										options={[
											{ value: "all", label: "All" },
											...dropdownOptions,
										]}
										isMulti
										value={selectedOptions}
										onChange={handleMultiSelectChange}
										placeholder="Select branches..."
										className="basic-multi-select"
										classNamePrefix="select"
										styles={{
											control: (provided) => ({
												...provided,
												borderRadius: "8px",
											}),
											valueContainer: (provided) => ({
												...provided,
												borderRadius: "8px",
											}),
											singleValue: (provided) => ({
												...provided,
												color: "black",
											}),
											multiValue: (provided) => ({
												...provided,
												padding: "0.1rem",
												backgroundColor: "#da4167",
												color: "white",
												borderRadius: "8px",
											}),
											multiValueLabel: (provided) => ({
												...provided,
												color: "white",
											}),
											multiValueRemove: (provided) => ({
												...provided,
												color: "white",
												"&:hover": {
													backgroundColor: "red",
													color: "white",
													borderRadius: "8px",
												},
											}),
											placeholder: (provided) => ({
												...provided,
												fontSize: "0.9rem",
											}),
										}}
									/>
								</div>
							)}

						{searchType === "F" && (
							<div className="pt-4">
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
					</div>

					{searchType === "C" && (
						<div className="mb-2 w-full flex justify-center gap-5">
							{/* <div className="w-full">
								<TDInputTemplateBr
									placeholder="Choose CO..."
									type="text"
									label="Credit Officers"
									name="co"
									formControlName={co.split(",")[0]}
									handleChange={(e) => {
										console.log("***********========", e)
										setCo(
											e.target.value +
												"," +
												cos.filter((i) => i.emp_id == e.target.value)[0]
													?.emp_name
										)
									}}
									mode={2}
									data={cos?.map((item, i) => ({
										code: item?.emp_id,
										name: `${item?.emp_name} - (${item?.emp_id})`,
									}))}
								/>
							</div> */}
							{searchType === "C" &&
							(userDetails?.id === 3 ||
								userDetails?.id === 4 ||
								userDetails?.id === 11) &&
							userDetails?.brn_code == 100 ? (
								<div className="w-full pt-4">
									<Select
										options={[{ value: "all", label: "All" }, ...dropdownCOs]}
										isMulti
										value={selectedCOs}
										onChange={handleMultiSelectChangeCOs}
										placeholder="Select COs'..."
										className="basic-multi-select"
										classNamePrefix="select"
										styles={{
											control: (provided) => ({
												...provided,
												borderRadius: "8px",
											}),
											valueContainer: (provided) => ({
												...provided,
												borderRadius: "8px",
											}),
											singleValue: (provided) => ({
												...provided,
												color: "black",
											}),
											multiValue: (provided) => ({
												...provided,
												padding: "0.1rem",
												backgroundColor: "#da4167",
												color: "white",
												borderRadius: "8px",
											}),
											multiValueLabel: (provided) => ({
												...provided,
												color: "white",
											}),
											multiValueRemove: (provided) => ({
												...provided,
												color: "white",
												"&:hover": {
													backgroundColor: "red",
													color: "white",
													borderRadius: "8px",
												},
											}),
											placeholder: (provided) => ({
												...provided,
												fontSize: "0.9rem",
											}),
										}}
									/>
								</div>
							) : (
								searchType === "C" && (
									<div className="w-full">
										<TDInputTemplateBr
											placeholder="Choose CO..."
											type="text"
											label="Credit Officers"
											name="co"
											formControlName={co.split(",")[0]}
											handleChange={(e) => {
												console.log("***********========", e)
												setCo(
													e.target.value +
														"," +
														cos.filter((i) => i.co_id == e.target.value)[0]
															?.emp_name
												)
											}}
											mode={2}
											data={cos?.map((item, i) => ({
												code: item?.co_id,
												name: `${item?.emp_name} - (${item?.co_id})`,
											}))}
										/>
									</div>
								)
							)}
						</div>
					)}

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

					<div className="grid grid-cols-2 gap-5 mt-5 items-end">
						<div>
							{/* <TDInputTemplateBr
								placeholder="From Date"
								type="date"
								label="From Date"
								name="fromDate"
								formControlName={fromDate}
								handleChange={(e) => setFromDate(e.target.value)}
								min={"1900-12-31"}
								mode={1}
							/> */}
							<TDInputTemplateBr
								placeholder="Month"
								type="text"
								label="Month"
								name="month"
								formControlName={choosenMonth}
								handleChange={(e) => setChoosenMonth(e.target.value)}
								mode={2}
								data={months}
							/>
						</div>
						<div>
							{/* <TDInputTemplateBr
								placeholder="To Date"
								type="date"
								label="To Date"
								name="toDate"
								formControlName={toDate}
								handleChange={(e) => setToDate(e.target.value)}
								min={"1900-12-31"}
								mode={1}
							/> */}
							<TDInputTemplateBr
								placeholder="Year"
								type="text"
								label="Year"
								name="year"
								formControlName={choosenYear}
								handleChange={(e) => setChoosenYear(e.target.value)}
								mode={2}
								data={years}
							/>
						</div>
					</div>
					<div className="flex justify-center my-3">
						<button
							className={`inline-flex items-center px-4 py-2 mt-0 ml-0 sm:mt-0 text-sm font-small text-center text-white border hover:border-green-600 border-teal-500 bg-teal-500 transition ease-in-out hover:bg-green-600 duration-300 rounded-full  dark:focus:ring-primary-900`}
							onClick={() => {
								handleSubmit()
							}}
						>
							<SearchOutlined /> <spann class={`ml-2`}>Search</spann>
						</button>
					</div>

					{/* "Groupwise" */}

					{reportData.length > 0 && searchType === "G" && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[7, 13, 14, 15]}
								dateTimeExceptionCols={[6, 11, 12]}
								headersMap={groupwiseDemandReportHeader}
							/>
						</>
					)}

					{/* "Fundwise" */}

					{reportData.length > 0 && searchType === "F" && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[8, 9]}
								// dateTimeExceptionCols={[8]}
								headersMap={fundwiseDemandReportHeader}
							/>
						</>
					)}

					{/* "COwise" */}

					{reportData.length > 0 && searchType === "C" && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[6, 7]}
								// dateTimeExceptionCols={[8]}
								headersMap={cowiseDemandReportHeader}
							/>
						</>
					)}

					{/* "Memberwise" */}

					{reportData.length > 0 && searchType === "M" && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[10, 16, 17, 18]}
								dateTimeExceptionCols={[9, 14, 15]}
								headersMap={memberwiseDemandReportHeader}
							/>
						</>
					)}

					{/* "Branchwise" */}

					{reportData.length > 0 && searchType === "B" && (
						<>
							<DynamicTailwindTable
								data={reportData}
								pageSize={50}
								columnTotal={[2, 3]}
								// dateTimeExceptionCols={[8]}
								headersMap={branchwiseDemandReportHeader}
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
										printTableRegular(
											reportData,
											"Demand Report",
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

export default DemandReportsMain
