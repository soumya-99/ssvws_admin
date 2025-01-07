import React, { useEffect, useState } from "react"
import "../../LoanForm/LoanForm.css"
import { useParams } from "react-router"
import BtnComp from "../../../Components/BtnComp"
import VError from "../../../Components/VError"
import { useNavigate } from "react-router-dom"
// import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Message } from "../../../Components/Message"
import { url } from "../../../Address/BaseUrl"
import { Badge, Spin, Card } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useLocation } from "react-router"
import TDInputTemplateBr from "../../../Components/TDInputTemplateBr"
import { formatDateToYYYYMMDD } from "../../../Utils/formateDate"
import DialogBox from "../../../Components/DialogBox"
// import { disableInputArray } from "./disableInputArray"
import { disableCondition } from "../disableCondition"
import { calculateRetirementDate } from "../../../Utils/calculateRetirementDate"
import moment from "moment/moment"

function EmployeeMasterForm() {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const [branches, setBranches] = useState(() => [])
	const [districts, setDistricts] = useState(() => [])
	const location = useLocation()
	const employeeMasterDetails = location.state || {}

	const navigate = useNavigate()
	const userDetails = JSON.parse(localStorage.getItem("user_details"))

	const [visible, setVisible] = useState(() => false)

	// const formattedDob = formatDateToYYYYMMDD(memberDetails?.dob)

	console.log(params, "params")
	console.log(location, "location")
	// console.log(memberDetails, "memberDetails")

	const [masterEmployeeData, setMasterEmployeeData] = useState({
		emp_name: "",
		branch_name: "", // dropdown
		gender: "",
		guard_name: "",
		address: "",
		district: "", // dropdown
		pin_code: "",
		mobile_1: "",
		mobile_2: "",
		email: "",
		nationality: "",
		dob: "", // date field
		marital_status: "", // dropdown static
		language_known: "",
		date_of_joining: "",
		probation_period: "",
		retirement_age: "",
		confirm_date: "", // date field
		retire_date: "", // auto calculation form retirement_age + doj (or can be updated manually)
		blood_group: "",
		voter_no: "",
		pan_no: "",
		aadhaar_no: "",
		bank_name: "",
		branch_name: "",
		ifsc: "",
		acc_no: "",
		remarks: "",
	})

	const handleChangeForm = (e) => {
		const { name, value } = e.target
		setMasterEmployeeData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleFetchBranches = async () => {
		setLoading(true)
		await axios
			.get(`${url}/admin/branch_name_mis?branch_code=${userDetails?.brn_code}`)
			.then((res) => {
				console.log("QQQQQQQQQQQQQQQQ", res?.data)
				setBranches(res?.data?.msg)
			})
			.catch((err) => {
				console.log("?????????????????????", err)
			})

		setLoading(false)
	}
	const handleFetchDistricts = async () => {
		// 10035 state code
		setLoading(true)
		await axios
			.get(`${url}/get_district?state_id=10035`)
			.then((res) => {
				console.log("DDDDDDDDDDDDDDDDD", res?.data)
				setDistricts(res?.data?.msg)
			})
			.catch((err) => {
				console.log("?????????????????????", err)
			})

		setLoading(false)
	}

	useEffect(() => {
		handleFetchBranches()
		handleFetchDistricts()
	}, [])

	useEffect(() => {
		if (masterEmployeeData.dob && +masterEmployeeData.retirement_age) {
			console.log(
				"==========",
				moment(
					calculateRetirementDate(
						masterEmployeeData.dob,
						+masterEmployeeData.retirement_age
					)
				).format("yyyy-MM-DD")
			)
			setMasterEmployeeData((prev) => ({
				...prev,
				retire_date: moment(
					calculateRetirementDate(
						masterEmployeeData.dob,
						+masterEmployeeData.retirement_age
					)
				).format("yyyy-MM-DD"),
			}))
		}
	}, [masterEmployeeData.dob, masterEmployeeData.retirement_age])

	useEffect(() => {
		setMasterEmployeeData({
			emp_name: employeeMasterDetails?.emp_name || "",
			branch_name: employeeMasterDetails?.branch_name || "", // dropdown
			gender: employeeMasterDetails?.gender || "",
			guard_name: employeeMasterDetails?.guard_name || "",
			address: employeeMasterDetails?.address || "",
			district: employeeMasterDetails?.district || "", // dropdown
			pin_code: employeeMasterDetails?.pin_code || "",
			mobile_1: employeeMasterDetails?.mobile_1 || "",
			mobile_2: employeeMasterDetails?.mobile_2 || "",
			email: employeeMasterDetails?.email || "",
			nationality: employeeMasterDetails?.nationality || "",
			dob: employeeMasterDetails?.dob || "", // date field
			marital_status: employeeMasterDetails?.marital_status || "", // dropdown static
			language_known: employeeMasterDetails?.language_known || "",
			date_of_joining: employeeMasterDetails?.date_of_joining || "",
			probation_period: employeeMasterDetails?.probation_period || "",
			retirement_age: employeeMasterDetails?.retirement_age || "",
			confirm_date: employeeMasterDetails?.confirm_date || "", // date field
			retire_date: employeeMasterDetails?.retire_date || "", // auto calculation from retirement_age + doj (or can be updated manually)
			blood_group: employeeMasterDetails?.blood_group || "",
			voter_no: employeeMasterDetails?.voter_no || "",
			pan_no: employeeMasterDetails?.pan_no || "",
			aadhaar_no: employeeMasterDetails?.aadhaar_no || "",
			bank_name: employeeMasterDetails?.bank_name || "",
			ifsc: employeeMasterDetails?.ifsc || "",
			acc_no: employeeMasterDetails?.acc_no || "",
			remarks: employeeMasterDetails?.remarks || "",
		})
	}, [])

	const handleSaveForm = async () => {
		setLoading(true)
		// const creds = {
		// 	bank_name: masterEmployeeData?.bank_name,
		// 	branch_name: masterEmployeeData?.branch_name,
		// 	ifsc: masterEmployeeData?.ifsc,
		// 	branch_addr: masterEmployeeData?.branch_addr,
		// 	sol_id: masterEmployeeData?.sol_id,
		// 	phone_no: masterEmployeeData?.phone_no,
		// 	modified_by: userDetails?.emp_id,
		// 	bank_code: params?.id,
		// 	created_by: userDetails?.emp_id,
		// }
		// await axios
		// 	.post(`${url}/admin/save_bank_dtls`, creds)
		// 	.then((res) => {
		// 		console.log("bank details saved.", res?.data)
		// 		Message("success", "Bank details saved.")
		// 		navigate(-1)
		// 	})
		// 	.catch((err) => {
		// 		Message("error", "Some error occurred.")
		// 		console.log("ERR", err)
		// 	})
		setLoading(false)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		setVisible(true)
	}

	const onReset = () => {
		setMasterEmployeeData({
			emp_name: "",
			branch_name: "",
			gender: "",
			guard_name: "",
			address: "",
			district: "",
			pin_code: "",
			mobile_1: "",
			mobile_2: "",
			email: "",
			nationality: "",
			dob: "",
			marital_status: "",
			language_known: "",
			date_of_joining: "",
			probation_period: "",
			retirement_age: "",
			confirm_date: "",
			retire_date: "",
			blood_group: "",
			voter_no: "",
			pan_no: "",
			aadhaar_no: "",
			bank_name: "",
			ifsc: "",
			acc_no: "",
			remarks: "",
		})
	}

	return (
		<>
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>
				<form onSubmit={onSubmit}>
					<div>
						<div>
							<div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
								<div>
									<TDInputTemplateBr
										placeholder="Employee Name..."
										type="text"
										label="Employee Name"
										name="emp_name"
										formControlName={masterEmployeeData.emp_name}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Branch Name..."
										type="text"
										label="Branch Name"
										name="branch_name"
										formControlName={masterEmployeeData.branch_name}
										handleChange={handleChangeForm}
										mode={2}
										data={branches?.map((item, i) => ({
											code: item?.dist_code + "," + item?.branch_code,
											name: item?.branch_name,
										}))}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Gender..."
										type="text"
										label="Gender"
										name="gender"
										formControlName={masterEmployeeData.gender}
										handleChange={handleChangeForm}
										mode={2}
										data={[
											{ code: "M", name: "Male" },
											{ code: "F", name: "Female" },
										]}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Guardian Name..."
										type="text"
										label="Guardian Name"
										name="guard_name"
										formControlName={masterEmployeeData.guard_name}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Address..."
										type="text"
										label="Address"
										name="address"
										formControlName={masterEmployeeData.address}
										handleChange={handleChangeForm}
										mode={3}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="District..."
										type="text"
										label="District"
										name="district"
										formControlName={masterEmployeeData.district}
										handleChange={handleChangeForm}
										mode={2}
										data={districts?.map((item, i) => ({
											code: item?.dist_id,
											name: item?.dist_name,
										}))}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="PIN Code..."
										type="number"
										label="PIN Code"
										name="pin_code"
										formControlName={masterEmployeeData.pin_code}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Primary Mobile No...."
										type="number"
										label="Primary Mobile No"
										name="mobile_1"
										formControlName={masterEmployeeData.mobile_1}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Secondary Mobile No...."
										type="number"
										label="Secondary Mobile No"
										name="mobile_2"
										formControlName={masterEmployeeData.mobile_2}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Email...."
										type="email"
										label="Email"
										name="email"
										formControlName={masterEmployeeData.email}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Nationality...."
										type="text"
										label="Nationality"
										name="nationality"
										formControlName={masterEmployeeData.nationality}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Date of Birth...."
										type="date"
										label="Date of Birth"
										name="dob"
										formControlName={masterEmployeeData.dob}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Marital Status...."
										type="text"
										label="Marital Status"
										name="marital_status"
										formControlName={masterEmployeeData.marital_status}
										handleChange={handleChangeForm}
										mode={2}
										data={[
											{ code: "M", name: "Married" },
											{ code: "U", name: "Un-married" },
											{ code: "W", name: "Widow" },
											{ code: "R", name: "Widower" },
										]}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Languages Known..."
										type="text"
										label="Languages Known"
										name="language_known"
										formControlName={masterEmployeeData.language_known}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Date of Joining..."
										type="date"
										label="Date of Joining"
										name="date_of_joining"
										formControlName={masterEmployeeData.date_of_joining}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Probation Period..."
										type="number"
										label="Probation Period"
										name="probation_period"
										formControlName={masterEmployeeData.probation_period}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Retirement Age..."
										type="number"
										label="Retirement Age"
										name="retirement_age"
										formControlName={masterEmployeeData.retirement_age}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Confirmation Date..."
										type="date"
										label="Confirmation Date"
										name="confirm_date"
										formControlName={masterEmployeeData.confirm_date}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Retirement Date..."
										type="date"
										label="Retirement Date"
										name="retire_date"
										formControlName={masterEmployeeData.retire_date}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Blood Group..."
										type="text"
										label="Blood Group"
										name="blood_group"
										formControlName={masterEmployeeData.blood_group}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Voter No..."
										type="text"
										label="Voter No"
										name="voter_no"
										formControlName={masterEmployeeData.voter_no}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="PAN No..."
										type="text"
										label="PAN No"
										name="pan_no"
										formControlName={masterEmployeeData.pan_no}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Aadhaar No..."
										type="number"
										label="Aadhaar No"
										name="aadhaar_no"
										formControlName={masterEmployeeData.aadhaar_no}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Bank Name..."
										type="text"
										label="Bank Name"
										name="bank_name"
										formControlName={masterEmployeeData.bank_name}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="IFSC..."
										type="text"
										label="IFSC"
										name="ifsc"
										formControlName={masterEmployeeData.ifsc}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Account No..."
										type="number"
										label="Account No"
										name="acc_no"
										formControlName={masterEmployeeData.acc_no}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Remarks..."
										type="text"
										label="Remarks"
										name="remarks"
										formControlName={masterEmployeeData.remarks}
										handleChange={handleChangeForm}
										mode={3}
									/>
								</div>
							</div>
						</div>

						<div className="mt-10">
							<BtnComp mode="A" onReset={onReset} />
						</div>
					</div>
				</form>
			</Spin>

			<DialogBox
				flag={4}
				onPress={() => setVisible(!visible)}
				visible={visible}
				onPressYes={() => {
					if (
						// !masterEmployeeData.bank_name ||
						// !masterEmployeeData.branch_name ||
						// !masterEmployeeData.branch_addr ||
						// !masterEmployeeData.sol_id ||
						// !masterEmployeeData.ifsc
						false
					) {
						Message("warning", "Fill all the values properly!")
						setVisible(false)
						return
					}
					handleSaveForm()
					setVisible(!visible)
				}}
				onPressNo={() => setVisible(!visible)}
			/>
		</>
	)
}

export default EmployeeMasterForm
