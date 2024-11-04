import React, { useEffect, useState } from "react"
import "../LoanForm/LoanForm.css"
import { useParams } from "react-router"
import BtnComp from "../../Components/BtnComp"
import VError from "../../Components/VError"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Message } from "../../Components/Message"
import { url } from "../../Address/BaseUrl"
import { Checkbox, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useLocation } from "react-router"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import { formatDateToYYYYMMDD } from "../../Utils/formateDate"
import DialogBox from "../../Components/DialogBox"
// import { disableInputArray } from "./disableInputArray"
import { disableCondition } from "./disableCondition"

function DisbursmentForm({ memberDetails }) {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	// const { loanAppData } = location.state || {}
	const navigate = useNavigate()
	const userDetails = JSON.parse(localStorage.getItem("user_details"))

	const [branches, setBranches] = useState(() => [])
	const [loanTypes, setLoanTypes] = useState(() => [])
	const [visible, setVisible] = useState(() => false)
	const [visible2, setVisible2] = useState(() => false)

	const [isPhoneVerified, setIsPhoneVerified] = useState(false)
	const [isAadhaarVerified, setIsAadhaarVerified] = useState(false)
	const [isPanVerified, setIsPanVerified] = useState(false)

	const [groups, setGroups] = useState(() => [])
	const [religions, setReligions] = useState(() => [])
	const [castes, setCastes] = useState(() => [])
	const [educations, setEducations] = useState(() => [])

	// const formattedDob = formatDateToYYYYMMDD(memberDetails?.dob)

	console.log(params, "params")
	console.log(location, "location")
	console.log(memberDetails, "memberDetails")

	const initialValues = {
		b_clientName: "",
		b_clientGender: "",
		b_clientMobile: "",
		b_clientEmail: "",
		b_guardianName: "",
		b_guardianMobile: "",
		b_clientAddress: "",
		b_clientPin: "",
		b_aadhaarNumber: "",
		b_panNumber: "",
		b_religion: "",
		b_caste: "",
		b_education: "",
		b_otherReligion: "",
		b_otherCaste: "",
		b_otherEducation: "",
		b_groupCode: "",
		b_groupCodeName: "",
		b_dob: "",
	}
	const [formValues, setValues] = useState({
		b_clientName: "",
		b_clientGender: "",
		b_clientMobile: "",
		b_clientEmail: "",
		b_guardianName: "",
		b_guardianMobile: "",
		b_clientAddress: "",
		b_clientPin: "",
		b_aadhaarNumber: "",
		b_panNumber: "",
		b_religion: "",
		b_caste: "",
		b_education: "",
		b_otherReligion: "",
		b_otherCaste: "",
		b_otherEducation: "",
		b_groupCode: "",
		b_groupCodeName: "",
		b_dob: "",
	})

	const validationSchema = Yup.object({
		b_clientName: Yup.string().required("Client name is required"),
		b_clientGender: Yup.string().required("Gender is required"),
		b_clientMobile: Yup.string()
			.matches(/^[0-9]+$/, "Must be only digits")
			.min(10, "Number should exactly be 10 digits")
			.max(10, "Number should exactly be 10 digits")
			.required("Mobile Numeber is required"),
		b_clientEmail: Yup.string(),
		b_guardianName: Yup.string()
			.max(60, "Guardian name should always be less than 61 characters.")
			.required("Guardian name is required"),
		b_guardianMobile: Yup.string().matches(/^[0-9]+$/, "Must be only digits"),
		b_clientAddress: Yup.string()
			.max(500, "Address length should always be less than 500 characters")
			.required("Address is required"),
		b_clientPin: Yup.number()
			.integer("Only integers are allowed")
			.min(1, "PIN should always be greater than 0")
			.max(1000000, "Max loan amount is 10000000")
			.required("PIN is required"),
		b_aadhaarNumber: Yup.number()
			.integer("Only integers are allowed")
			.required("Aadhaar is required"),
		b_panNumber: Yup.string().required("PAN Number is required"),
		b_religion: Yup.string().required("Religion is required"),
		b_caste: Yup.string().required("Caste is required"),
		b_education: Yup.string().required("Education is required"),
		b_otherReligion: Yup.string(),
		b_otherCaste: Yup.string(),
		b_otherEducation: Yup.string(),
		b_groupCode: Yup.string().required("Group code is required"),
		b_dob: Yup.string().required("DOB is required"),
	})

	const onSubmit = async (values) => {
		console.log("onsubmit called")
		console.log(values, "onsubmit vendor")
		setLoading(true)

		setVisible(true)

		setLoading(false)
	}

	const formik = useFormik({
		initialValues: formValues,
		onSubmit,
		validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		enableReinitialize: true,
		validateOnMount: true,
	})

	// useEffect(() => {
	// 	setValues({
	// 		b_clientName: memberDetails?.client_name,
	// 		b_clientGender: memberDetails?.gender,
	// 		b_clientMobile: memberDetails?.client_mobile,
	// 		b_clientEmail: memberDetails?.client_email,
	// 		b_guardianName: memberDetails?.gurd_name,
	// 		b_guardianMobile: memberDetails?.gurd_mobile,
	// 		b_clientAddress: memberDetails?.client_addr,
	// 		b_clientPin: memberDetails?.pin_no,
	// 		b_aadhaarNumber: memberDetails?.aadhar_no,
	// 		b_panNumber: memberDetails?.pan_no,
	// 		b_religion: memberDetails?.religion,
	// 		b_caste: memberDetails?.caste,
	// 		b_education: memberDetails?.education,
	// 		b_groupCode: memberDetails?.prov_grp_code,
	// 		b_groupCodeName: "",
	// 		b_dob: formatDateToYYYYMMDD(memberDetails?.dob),
	// 	})
	// }, [])

	const handleFetchBasicDetails = async () => {
		setLoading(true)
		const creds = {
			branch_code: userDetails?.brn_code,
			form_no: params?.id,
			approval_status: memberDetails?.approval_status,
		}
		await axios
			.post(`${url}/admin/fetch_basic_dtls_web`, creds)
			.then((res) => {
				console.log("++--++--++--", res?.data)
				setValues({
					b_clientName: res?.data?.msg[0]?.client_name,
					b_clientGender: res?.data?.msg[0]?.gender,
					b_clientMobile: res?.data?.msg[0]?.client_mobile,
					b_clientEmail: res?.data?.msg[0]?.email_id,
					b_guardianName: res?.data?.msg[0]?.gurd_name,
					b_guardianMobile: res?.data?.msg[0]?.gurd_mobile,
					b_clientAddress: res?.data?.msg[0]?.client_addr,
					b_clientPin: res?.data?.msg[0]?.pin_no,
					b_aadhaarNumber: res?.data?.msg[0]?.aadhar_no,
					b_panNumber: res?.data?.msg[0]?.pan_no,
					b_religion: res?.data?.msg[0]?.religion,
					b_caste: res?.data?.msg[0]?.caste,
					b_education: res?.data?.msg[0]?.education,
					b_otherReligion: res?.data?.msg[0]?.other_religion,
					b_otherCaste: res?.data?.msg[0]?.other_caste,
					b_otherEducation: res?.data?.msg[0]?.other_education,
					b_groupCode: res?.data?.msg[0]?.prov_grp_code,
					b_groupCodeName: "",
					b_dob: formatDateToYYYYMMDD(res?.data?.msg[0]?.dob),
				})
			})
			.catch((err) => {
				console.log("--------------", err)
			})
		setLoading(false)
	}

	useEffect(() => {
		handleFetchBasicDetails()
	}, [])

	const updateBasicDetails = async () => {
		setLoading(true)
		const creds = {
			form_no: params?.id,
			branch_code: userDetails?.brn_code,
			prov_grp_code: "",
			gender: formik.values.b_clientGender,
			client_name: formik.values.b_clientName,
			client_mobile: formik.values.b_clientMobile,
			gurd_name: formik.values.b_guardianName,
			gurd_mobile: formik.values.b_guardianMobile,
			client_addr: formik.values.b_clientAddress,
			pin_no: formik.values.b_clientPin,
			aadhar_no: formik.values.b_aadhaarNumber,
			pan_no: formik.values.b_panNumber,
			religion: formik.values.b_religion,
			caste: formik.values.b_caste,
			education: formik.values.b_education,
			dob: formik.values.b_dob,
			bm_lat_val: memberDetails?.co_lat_val || "",
			bm_long_val: memberDetails?.co_long_val || "",
			bm_gps_address: memberDetails?.co_gps_address || "",
			modified_by: userDetails?.emp_name,
			member_code: memberDetails?.member_code,
			email_id: formik.values.b_clientEmail,
			other_religion: formik.values.b_otherReligion || "",
			other_caste: formik.values.b_otherCaste || "",
			other_education: formik.values.b_otherEducation || "",
		}
		await axios
			.post(`${url}/admin/edit_basic_dtls_web`, creds)
			.then((res) => {
				console.log("*******************", res?.data)
				Message("success", "Updated Successfully.")
			})
			.catch((err) => {
				console.log("BASIC ERRRRRRR", err)
			})
		setLoading(false)
	}

	const handleFetchGroups = async () => {
		await axios
			.get(`${url}/get_group?branch_code=${userDetails?.brn_code}`)
			.then((res) => {
				console.log("GROUPSSSS====", res?.data)
				setGroups(res?.data?.msg)
			})
			.catch((err) => {
				console.log("Some err")
			})
	}

	const handleFetchReligions = async () => {
		await axios
			.get(`${url}/get_religion`)
			.then((res) => {
				console.log("RELIIGIONSSSS====", res?.data)
				setReligions(res?.data)
			})
			.catch((err) => {
				console.log("Some err")
			})
	}

	const handleFetchCastes = async () => {
		await axios
			.get(`${url}/get_caste`)
			.then((res) => {
				console.log("CASETEEEEEEWSSSSS====", res?.data)
				setCastes(res?.data)
			})
			.catch((err) => {
				console.log("Some err")
			})
	}

	const handleFetchEducations = async () => {
		await axios
			.get(`${url}/get_education`)
			.then((res) => {
				console.log("EDUCATIONSSSSSS====", res?.data)
				setEducations(res?.data)
			})
			.catch((err) => {
				console.log("Some err")
			})
	}

	useEffect(() => {
		handleFetchGroups()
		handleFetchReligions()
		handleFetchCastes()
		handleFetchEducations()
	}, [])

	const fetchVerificationDetails = async () => {
		await axios
			.get(
				`${url}/admin/fetch_verify_flag?member_code=${memberDetails?.member_code}`
			)
			.then((res) => {
				const { phone_verify_flag, aadhar_verify_flag, pan_verify_flag } =
					res.data?.msg[0]

				console.log(
					"!!!!!!@@@@@@@@@@########",
					phone_verify_flag,
					aadhar_verify_flag,
					pan_verify_flag
				)

				setIsPhoneVerified(phone_verify_flag === "Y")
				setIsAadhaarVerified(aadhar_verify_flag === "Y")
				setIsPanVerified(pan_verify_flag === "Y")
			})
			.catch((err) => {
				console.error("Failed to fetch verification details:", err)
			})
	}

	useEffect(() => {
		fetchVerificationDetails()
	}, [])

	const handleVerification = async (flag, val) => {
		setLoading(true)
		const creds = {
			flag: flag,
			verify_value: val,
			// form_no: params?.id,
			member_id: memberDetails?.member_code,
		}

		await axios
			.post(`${url}/admin/verify_by_mis`, creds)
			.then((res) => {
				Message("success", "Verification checked.")
				console.log(">>>>>>>>>>>", res?.data)
			})
			.catch((err) => {
				Message("error", "Verification failed.")
				console.log("MMMMMMMMM", err)
			})
		setLoading(false)
	}

	const onChangeCheck1 = async (e) => {
		const isChecked = e.target.checked
		setIsPhoneVerified(isChecked)
		await handleVerification("PH", isChecked ? "Y" : "N")
	}

	const onChangeCheck2 = async (e) => {
		const isChecked = e.target.checked
		setIsAadhaarVerified(isChecked)
		await handleVerification("A", isChecked ? "Y" : "N")
	}

	const onChangeCheck3 = async (e) => {
		const isChecked = e.target.checked
		setIsPanVerified(isChecked)
		await handleVerification("P", isChecked ? "Y" : "N")
	}

	return (
		<>
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>
				{/* <Formik
					initialValues={formValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
					validateOnMount={true}
					enableReinitialize={true}
				>
					{({
						values,
						handleReset,
						handleChange,
						handleBlur,
						handleSubmit,
						errors,
						touched,
					}) => ( */}
				<form onSubmit={formik.handleSubmit}>
					<div>
						<div>
							<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
								<div className="text-xl mb-2 text-lime-800 font-semibold underline">
									Personal Details
								</div>
							</div>
							<div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
								<div>
									<TDInputTemplateBr
										placeholder="Member Code"
										type="text"
										label="Member Code"
										name="mem_code"
										formControlName={memberDetails?.member_code}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Type member name..."
										type="text"
										label="Member Name"
										name="b_clientName"
										formControlName={formik.values.b_clientName}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled={disableCondition(
											userDetails?.id,
											memberDetails?.approval_status
										)}
									/>
									{formik.errors.b_clientName && formik.touched.b_clientName ? (
										<VError title={formik.errors.b_clientName} />
									) : null}
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Group name..."
										type="text"
										label="Group Name"
										name="b_groupName"
										formControlName={formik.values.b_groupName}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Form Number"
										type="text"
										label="Form Number"
										name="form_no"
										formControlName={params.id}
										mode={1}
										disabled
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="GRT Approve date..."
										type="text"
										label="GRT Approve Date"
										name="b_grtApproveDate"
										formControlName={formik.values.b_grtApproveDate}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Branch..."
										type="text"
										label="Branch"
										name="b_branch"
										formControlName={formik.values.b_branch}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Purpose..."
										type="text"
										label="Purpose"
										name="b_purpose"
										formControlName={formik.values.b_purpose}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Sub Purpose..."
										type="text"
										label="Sub Purpose"
										name="b_subPurpose"
										formControlName={formik.values.b_subPurpose}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Application Date..."
										type="text"
										label="Application Date"
										name="b_applicationDate"
										formControlName={formik.values.b_applicationDate}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Applied Amount..."
										type="text"
										label="Applied Amount"
										name="b_appliedAmt"
										formControlName={formik.values.b_appliedAmt}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
							</div>
						</div>

						{/* ///////////////////////// */}

						<div>
							<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
								<div className="text-xl mb-2 mt-5 text-lime-800 font-semibold underline">
									Disbursement Details
								</div>
							</div>
							<div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
								<div>
									<TDInputTemplateBr
										placeholder="Select Scheme..."
										type="text"
										label="Scheme"
										name="b_scheme"
										formControlName={formik.values.b_scheme}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										data={[
											{ code: "S1", name: "Scheme 1" },
											{ code: "S1", name: "Scheme 2" },
											{ code: "S3", name: "Scheme 3" },
										]}
										mode={2}
									/>
									{formik.errors.b_clientGender &&
									formik.touched.b_clientGender ? (
										<VError title={formik.errors.b_clientGender} />
									) : null}
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Select Fund..."
										type="text"
										label="Fund"
										name="b_fund"
										formControlName={formik.values.b_fund}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										data={[
											{ code: "F1", name: "Fund 1" },
											{ code: "F2", name: "Fund 2" },
											{ code: "F3", name: "Fund 3" },
										]}
										mode={2}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Period..."
										type="text"
										label="Period"
										name="b_period"
										formControlName={formik.values.b_period}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="R.O.I..."
										type="text"
										label="Rate of Interest"
										name="b_roi"
										formControlName={formik.values.b_roi}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Mode..."
										type="text"
										label="Mode"
										name="b_mode"
										formControlName={formik.values.b_mode}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Disburse Amount..."
										type="text"
										label="Disburse Amount"
										name="b_disburseAmt"
										formControlName={formik.values.b_disburseAmt}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Bank charges..."
										type="text"
										label="Bank Charges"
										name="b_bankCharges"
										formControlName={formik.values.b_bankCharges}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Processing charges..."
										type="text"
										label="Processing Charges"
										name="b_processingCharges"
										formControlName={formik.values.b_processingCharges}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
										disabled
									/>
								</div>
							</div>
						</div>

						{/* ///////////////////////// */}

						<div>
							<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
								<div className="text-xl mb-2 mt-5 text-lime-800 font-semibold underline">
									Transaction Details
								</div>
							</div>
							<div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
								<div>
									<TDInputTemplateBr
										placeholder="Transaction date..."
										type="date"
										label="Transaction Date"
										name="b_tnxDate"
										formControlName={formik.values.b_tnxDate}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										min={"1900-12-31"}
										max={formatDateToYYYYMMDD(new Date())}
										mode={1}
									/>
									{formik.errors.b_tnxDate && formik.touched.b_tnxDate ? (
										<VError title={formik.errors.b_tnxDate} />
									) : null}
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Bank Name..."
										type="text"
										label="Bank Name"
										name="b_bankName"
										formControlName={formik.values.b_bankName}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Cheque/Ref. no..."
										type="text"
										label="Cheque/Ref. No."
										name="b_chequeOrRefNo"
										formControlName={formik.values.b_chequeOrRefNo}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Cheque/Ref. Date..."
										type="date"
										label="Cheque/Ref. Date"
										name="b_chequeOrRefDate"
										formControlName={formik.values.b_chequeOrRefDate}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										min={"1900-12-31"}
										max={formatDateToYYYYMMDD(new Date())}
										mode={1}
									/>
									{formik.errors.b_chequeOrRefDate &&
									formik.touched.b_chequeOrRefDate ? (
										<VError title={formik.errors.b_chequeOrRefDate} />
									) : null}
								</div>
								<div className="sm:col-span-4">
									<TDInputTemplateBr
										placeholder="Type Remarks..."
										type="text"
										label="Remarks"
										name="b_remarks"
										formControlName={formik.values.b_remarks}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={3}
									/>
									{formik.errors.b_remarks && formik.touched.b_remarks ? (
										<VError title={formik.errors.b_remarks} />
									) : null}
								</div>
							</div>
						</div>

						{!disableCondition(
							userDetails?.id,
							memberDetails?.approval_status
						) && (
							<div className="mt-10">
								<BtnComp mode="A" onReset={formik.resetForm} />
							</div>
						)}
					</div>
				</form>
			</Spin>

			<DialogBox
				flag={4}
				onPress={() => setVisible(!visible)}
				visible={visible}
				onPressYes={() => {
					// editGroup()
					updateBasicDetails()
					setVisible(!visible)
				}}
				onPressNo={() => setVisible(!visible)}
			/>

			{/* <DialogBox
				flag={4}
				onPress={() => setVisible2(!visible2)}
				visible={visible2}
				onPressYes={() => {
					// editGroup()
					onChangeCheck1()
					setVisible2(!visible2)
				}}
				onPressNo={() => setVisible2(!visible2)}
			/> */}
		</>
	)
}

export default DisbursmentForm
