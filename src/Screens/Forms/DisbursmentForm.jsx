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

	const [personalDetailsData, setPersonalDetailsData] = useState({
		b_memCode: "",
		b_clientName: "",
		b_groupName: "",
		b_formNo: "",
		b_grtApproveDate: "",
		b_branch: "",
		b_purpose: "",
		b_subPurpose: "",
		b_applicationDate: "",
		b_appliedAmt: "",
	})

	const handleChangePersonalDetails = (e) => {
		const { name, value } = e.target
		setPersonalDetailsData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const initialValues = {}
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
									1. Personal Details
								</div>
							</div>
							<div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
								<div>
									<TDInputTemplateBr
										placeholder="Member Code"
										type="text"
										label="Member Code"
										name="b_memCode"
										formControlName={personalDetailsData?.b_memCode}
										handleChange={handleChangePersonalDetails}
										mode={1}
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Type member name..."
										type="text"
										label="Member Name"
										name="b_clientName"
										formControlName={personalDetailsData?.b_clientName}
										handleChange={handleChangePersonalDetails}
										mode={1}
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Group name..."
										type="text"
										label="Group Name"
										name="b_groupName"
										formControlName={personalDetailsData?.b_groupName}
										handleChange={handleChangePersonalDetails}
										mode={1}
										disabled
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Form Number"
										type="text"
										label="Form Number"
										name="b_formNo"
										formControlName={personalDetailsData?.b_formNo}
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
										formControlName={personalDetailsData?.b_grtApproveDate}
										handleChange={handleChangePersonalDetails}
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
										formControlName={personalDetailsData?.b_branch}
										handleChange={handleChangePersonalDetails}
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
										formControlName={personalDetailsData?.b_purpose}
										handleChange={handleChangePersonalDetails}
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
										formControlName={personalDetailsData?.b_subPurpose}
										handleChange={handleChangePersonalDetails}
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
										formControlName={personalDetailsData?.b_applicationDate}
										handleChange={handleChangePersonalDetails}
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
										formControlName={personalDetailsData?.b_appliedAmt}
										handleChange={handleChangePersonalDetails}
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
									2. Disbursement Details
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
									3. Transaction Details
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
					// updateBasicDetails()
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
