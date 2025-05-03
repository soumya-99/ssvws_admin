import React, { useEffect, useState } from "react"
import Sidebar from "../../Components/Sidebar"
import axios from "axios"
import { url } from "../../Address/BaseUrl"
import { Message } from "../../Components/Message"
import { Spin, Button, Modal, Tooltip, DatePicker, Popconfirm, Tag } from "antd"
import {
	LoadingOutlined,
	SearchOutlined,
	PrinterOutlined,
	FileExcelOutlined,
	CheckCircleOutlined,
} from "@ant-design/icons"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import { formatDateToYYYYMMDD } from "../../Utils/formateDate"

import { saveAs } from "file-saver"
import * as XLSX from "xlsx"
import { printTableRegular } from "../../Utils/printTableRegular"
import Payroll from "../Admin/Payroll/Payroll"

// const { RangePicker } = DatePicker
// const dateFormat = "YYYY/MM/DD"

function AttendanceBM() {
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
	const [employees, setEmployees] = useState(() => [])
	const [employee, setEmployee] = useState(() => "")
	const [tot_present, setTotPresent] = useState(() => 0)
	const [tot_early_out, setTotEarlyOut] = useState(() => 0)
	const [tot_late_in, setTotLateIn] = useState(() => 0)
	const [tot_hours, setTothours] = useState(() => 0)
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
	const handleFetchEmployees = async () => {
		setLoading(true)
		await axios
			.post(`${url}/fetch_employee_fr_branch`, {
				branch_id: userDetails?.brn_code,
			})
			.then((res) => {
				console.log("QQQQQQQQQQQQQQQQ", res?.data)
				setEmployees(res?.data?.msg)
			})
			.catch((err) => {
				console.log("?????????????????????", err)
			})

		setLoading(false)
	}

	useEffect(() => {
		handleFetchBranches()
	}, [])

	useEffect(() => {
		handleFetchEmployees()
	}, [])
	const timeDifference = (startDateStr, endDateStr) => {
		// Convert date strings to Date objects
		const startDate = new Date(startDateStr)
		const endDate = new Date(endDateStr)

		// Calculate the difference in milliseconds
		const diff = endDate - startDate

		// Convert milliseconds to minutes
		const diffMinutes = Math.floor(diff / (1000 * 60))

		// Convert minutes to hours and minutes
		const hours = Math.floor(diffMinutes / 60)
		const minutes = diffMinutes % 60

		return {
			hours: hours,
			minutes: minutes,
		}
	}
	const handleFetchReport = async () => {
		setLoading(true)
		const creds = {
			from_date: formatDateToYYYYMMDD(fromDate),
			to_date: formatDateToYYYYMMDD(toDate),
			branch_id: userDetails?.brn_code,
			emp_id: employee,
		}
		console.log("KKKKKKKKKKKKKKKKKKK======", branch)
		await axios
			.post(`${url}/attendance_report_brnwise`, creds)
			.then((res) => {
				console.log("RESSSSS======>>>>", res?.data)
				setReportData(res?.data?.msg)
				setMetadataDtls(
					userDetails?.brn_code +
						"," +
						branches.filter((e) => +e.branch_code == +userDetails?.brn_code)[0]
							?.branch_name
				)
				console.log(
					userDetails?.brn_code +
						"," +
						branches.filter((e) => +e.branch_code == +userDetails?.brn_code)[0]
							?.branch_name
				)
				if (res?.data?.msg?.length == 0) Message("error", "No Data!")
				console.log("KKKKKKKKKKKKKKKKKKK", branch)
				// setTotSum(res?.data?.msg.reduce((n, { credit }) => n + credit, 0))
			})
			.catch((err) => {
				console.log("ERRRR>>>", err)
			})

		setLoading(false)
	}

	const handleSubmit = () => {
		if (fromDate && toDate && employee) {
			handleFetchReport()
			if (employee != "A" && employee) handleEmpDetails()
		}
	}

	const handleEmpDetails = () => {
		setLoading(true)
		const creds = {
			from_date: formatDateToYYYYMMDD(fromDate),
			to_date: formatDateToYYYYMMDD(toDate),
			branch_id: branch.split(",")[0],
			emp_id: employee,
		}
		axios.post(`${url}/show_per_emp_detls_per_brn`, creds).then((res) => {
			console.log("RESSSSS======>>>>", res?.data)
			setTotPresent(res?.data?.msg[0]?.tot_present)
			setTotEarlyOut(res?.data?.msg[0]?.early_out[0]?.tot_early_out)
			setTotLateIn(res?.data?.msg[0]?.late_in[0]?.tot_late_in)
			setTothours(res?.data?.msg[0]?.tot_work[0]?.total_work_hours)
		})
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
			.post(`${url}/reject_atten_emp`, creds)
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
				<Payroll user_type_id={userDetails?.id} />
			</Spin>
		</div>
	)
}

export default AttendanceBM
