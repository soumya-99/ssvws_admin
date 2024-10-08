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
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useLocation } from "react-router"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import { formatDateToYYYYMMDD } from "../../Utils/formateDate"

function BasicDetailsForm({ memberDetails }) {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	// const { loanAppData } = location.state || {}
	const navigate = useNavigate()

	const [branches, setBranches] = useState(() => [])
	const [loanTypes, setLoanTypes] = useState(() => [])
	const [visibleModal, setVisibleModal] = useState(() => false)
	const [visibleModal2, setVisibleModal2] = useState(() => false)

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
		b_guardianName: "",
		b_guardianMobile: "",
		b_clientAddress: "",
		b_clientPin: "",
		b_aadhaarNumber: "",
		b_panNumber: "",
		b_religion: "",
		b_caste: "",
		b_education: "",
		b_groupCode: "",
		b_groupCodeName: "",
		b_dob: "",
	}
	const [formValues, setValues] = useState({
		b_clientName: "",
		b_clientGender: "",
		b_clientMobile: "",
		b_guardianName: "",
		b_guardianMobile: "",
		b_clientAddress: "",
		b_clientPin: "",
		b_aadhaarNumber: "",
		b_panNumber: "",
		b_religion: "",
		b_caste: "",
		b_education: "",
		b_groupCode: "",
		b_groupCodeName: "",
		b_dob: "",
	})

	const getExtension = (fileName) => {
		if (!fileName) return ""
		const lastDotIndex = fileName.lastIndexOf(".")
		return lastDotIndex !== -1
			? fileName.slice(lastDotIndex + 1).toLowerCase()
			: ""
	}

	const validationSchema = Yup.object({
		b_clientName: Yup.string().required("Client name is required"),
		b_clientGender: Yup.string().required("Gender is required"),
		b_clientMobile: Yup.string()
			.matches(/^[0-9]+$/, "Must be only digits")
			.min(10, "Number should exactly be 10 digits")
			.max(10, "Number should exactly be 10 digits")
			.required("Mobile Numeber is required"),
		b_guardianName: Yup.string()
			.max(60, "Guardian name should always be less than 61 characters.")
			.required("Guardian name is required"),
		b_guardianMobile: Yup.string()
			.matches(/^[0-9]+$/, "Must be only digits")
			.min(10, "Number should exactly be 10 digits")
			.max(10, "Number should exactly be 10 digits")
			.required("Guardian mobile Numeber is required"),
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
		b_groupCode: Yup.string().required("Group code is required"),
		b_dob: Yup.string().required("DOB is required"),
	})

	useEffect(() => {
		// fetchBranches()
		// fetchLoanTypes()
		// fetchCreditManagers()
	}, [])

	const onSubmit = async (values) => {
		console.log("onsubmit called")
		console.log(values, "onsubmit vendor")
		setLoading(true)

		const data = {}

		// await axios
		// 	.post(`${url}/sql/insert_loan_dtls`, data)
		// 	.then((res) => {
		// 		console.log("API RESPONSE", res)

		// 		if (res?.data?.suc === 1) {
		// 			Message("success", res?.data?.msg)
		// 			navigate(routePaths.MIS_ASSISTANT_HOME)
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log("EERRRRRRRRRR", err)
		// 	})

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

	const handleFetchReligions = async () => {
		await axios.get(`${url}/get_religion`).then((res) => {
			console.log("RELIIGIONSSSS====", res?.data)
			setReligions(res?.data)
		})
	}

	const handleFetchCastes = async () => {
		await axios.get(`${url}/get_caste`).then((res) => {
			console.log("CASETEEEEEEWSSSSS====", res?.data)
			setCastes(res?.data)
		})
	}

	const handleFetchEducations = async () => {
		await axios.get(`${url}/get_education`).then((res) => {
			console.log("EDUCATIONSSSSSS====", res?.data)
			setEducations(res?.data)
		})
	}

	useEffect(() => {
		handleFetchReligions()
		handleFetchCastes()
		handleFetchEducations()
	}, [])

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
					<div className="">
						<div className="mb-4">
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
						<div className="grid gap-4 sm:grid-cols-6 sm:gap-6">
							<div>
								<TDInputTemplateBr
									placeholder="Member Code"
									type="text"
									label="Member Code"
									name="mem_code"
									formControlName={
										formik.values.l_member_id || memberDetails?.member_code
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={1}
									disabled
								/>
								{formik.errors.l_member_id && formik.touched.l_member_id ? (
									<VError title={formik.errors.l_member_id} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Choose Group..."
									type="text"
									label="Group"
									name="b_groupCode"
									formControlName={formik.values.b_groupCode}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									data={loanTypes?.map((loan) => ({
										code: loan?.sl_no,
										name: loan?.loan_type,
									}))}
									mode={2}
								/>
								{formik.errors.b_groupCode && formik.touched.b_groupCode ? (
									<VError title={formik.errors.b_groupCode} />
								) : null}
							</div>

							<div className="sm:col-span-2">
								<TDInputTemplateBr
									placeholder="Type member name..."
									type="text"
									label="Member Name"
									name="b_clientName"
									formControlName={
										formik.values.b_clientName || memberDetails?.client_name
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={1}
								/>
								{formik.errors.b_clientName && formik.touched.b_clientName ? (
									<VError title={formik.errors.b_clientName} />
								) : null}
							</div>
							<div className="sm:col-span-2">
								<TDInputTemplateBr
									placeholder="Type DOB..."
									type="date"
									label="Date of Birth"
									name="b_dob"
									formControlName={
										formik.values.b_dob ||
										formatDateToYYYYMMDD(memberDetails?.dob)
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									min={"1900-12-31"}
									mode={1}
								/>
								{formik.errors.b_dob && formik.touched.b_dob ? (
									<VError title={formik.errors.b_dob} />
								) : null}
							</div>
						</div>

						<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-5">
							<div>
								<TDInputTemplateBr
									placeholder="Select Gender..."
									type="text"
									label="Gender"
									name="b_clientGender"
									formControlName={
										formik.values.b_clientGender || memberDetails?.gender
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									data={[
										{ code: "M", name: "Male" },
										{ code: "F", name: "Female" },
										{ code: "O", name: "Others" },
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
									placeholder="Type Address..."
									type="text"
									label={`Member Address`}
									name="b_clientAddress"
									formControlName={
										formik.values.b_clientAddress || memberDetails?.client_addr
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={3}
								/>
								{formik.errors.b_clientAddress &&
								formik.touched.b_clientAddress ? (
									<VError title={formik.errors.b_clientAddress} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Type PIN..."
									type="number"
									label="PIN No."
									name="b_clientPin"
									formControlName={
										formik.values.b_clientPin || memberDetails?.pin_no
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={1}
								/>
								{formik.errors.b_clientPin && formik.touched.b_clientPin ? (
									<VError title={formik.errors.b_clientPin} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Type Mobile Number..."
									type="number"
									label="Member Mobile Number"
									name="b_clientMobile"
									formControlName={
										formik.values.b_clientMobile || memberDetails?.client_mobile
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={1}
								/>
								{formik.errors.b_clientMobile &&
								formik.touched.b_clientMobile ? (
									<VError title={formik.errors.b_clientMobile} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Type Guardian's Name..."
									type="text"
									label="Guardian's Name"
									name="b_guardianName"
									formControlName={
										formik.values.b_guardianName || memberDetails?.gurd_name
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={1}
								/>
								{formik.errors.b_guardianName &&
								formik.touched.b_guardianName ? (
									<VError title={formik.errors.b_guardianName} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Type Guardian Mobile Number..."
									type="number"
									label="Guardian Mobile Number"
									name="b_guardianMobile"
									formControlName={
										formik.values.b_guardianMobile || memberDetails?.gurd_mobile
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={1}
								/>
								{formik.errors.b_guardianMobile &&
								formik.touched.b_guardianMobile ? (
									<VError title={formik.errors.b_guardianMobile} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Type Aadhaar No..."
									type="number"
									label="Aadhaar No."
									name="b_aadhaarNumber"
									formControlName={
										formik.values.b_aadhaarNumber || memberDetails?.aadhar_no
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={1}
								/>
								{formik.errors.b_aadhaarNumber &&
								formik.touched.b_aadhaarNumber ? (
									<VError title={formik.errors.b_aadhaarNumber} />
								) : null}
							</div>
							<div>
								<TDInputTemplateBr
									placeholder="Type PAN No..."
									type="text"
									label="PAN No."
									name="b_panNumber"
									formControlName={
										formik.values.b_panNumber || memberDetails?.pan_no
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={1}
								/>
								{formik.errors.b_panNumber && formik.touched.b_panNumber ? (
									<VError title={formik.errors.b_panNumber} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Type Religion..."
									type="text"
									label="Religion"
									name="b_religion"
									formControlName={
										formik.values.b_religion || memberDetails?.religion
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									data={religions?.map((religion) => ({
										code: religion?.id,
										name: religion?.name,
									}))}
									mode={2}
								/>
								{formik.errors.b_religion && formik.touched.b_religion ? (
									<VError title={formik.errors.b_religion} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Choose Caste..."
									type="text"
									label="Caste"
									name="b_caste"
									formControlName={
										formik.values.b_caste || memberDetails?.caste
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									data={castes?.map((caste) => ({
										code: caste?.id,
										name: caste?.name,
									}))}
									mode={2}
								/>
								{formik.errors.b_caste && formik.touched.b_caste ? (
									<VError title={formik.errors.b_caste} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Choose Education..."
									type="text"
									label="Education"
									name="b_education"
									formControlName={
										formik.values.b_education || memberDetails?.education
									}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									data={educations?.map((edu) => ({
										code: edu?.id,
										name: edu?.name,
									}))}
									mode={2}
								/>
								{formik.errors.b_education && formik.touched.b_education ? (
									<VError title={formik.errors.b_education} />
								) : null}
							</div>
						</div>

						{/* {loanApproveStatus !== "A" && loanApproveStatus !== "R" ? ( */}
						<div className="mt-10">
							<BtnComp
								mode="A"
								rejectBtn={true}
								onReject={() => {
									setVisibleModal2(true)
								}}
								sendToText="Credit Manager"
								onSendTo={() => setVisibleModal(true)}
								// condition={fetchedFileDetails?.length > 0}
								// showSave
							/>
						</div>
						{/* ) : loanApproveStatus === "A" ? (
							<Tag
								color="purple"
								className="mt-10 p-5 rounded-lg text-xl font-bold self-center"
							>
								E-Files forwarded to Credit Manager.
							</Tag>
						) : loanApproveStatus === "R" ? (
							<Tag
								color="orange"
								className="mt-10 p-5 rounded-lg text-xl font-bold self-center"
							>
								E-Files rejected and sent to Loan Appraiser.
							</Tag>
						) : (
							<Tag
								color="red"
								className="mt-10 p-5 rounded-lg text-xl font-bold self-center"
							>
								Some error occurred. [Status is not b/w P/A/R]
							</Tag>
						)} */}
					</div>
				</form>
			</Spin>

			{/* <DialogBox
				flag={4}
				onPress={() => setVisibleModal(!visibleModal)}
				visible={visibleModal}
				onPressYes={() => {
					if (commentsBranchManager) {
						setVisibleModal(!visibleModal)
					} else {
						Message("error", "Write Comments.")
						setVisibleModal(!visibleModal)
					}
				}}
				onPressNo={() => {
					setVisibleModal(!visibleModal)
					Message("warning", "User cancelled operation.")
				}}
			/>

			<DialogBox
				flag={4}
				onPress={() => setVisibleModal2(!visibleModal2)}
				visible={visibleModal2}
				onPressYes={(e) => {
					if (commentsBranchManager && creditManagerId) {
						setVisibleModal2(!visibleModal2)
						// handleReject("R", e)
					} else {
						Message("error", "Write Comments.")
						setVisibleModal2(!visibleModal2)
					}
				}}
				onPressNo={() => {
					setVisibleModal2(!visibleModal2)
					Message("warning", "User cancelled operation.")
				}}
			/>
			<DialogBox
				flag={4}
				onPress={() => setVisibleModal2(!visibleModal2)}
				visible={visibleModal2}
				onPressYes={() => {
					setVisibleModal2(!visibleModal2)
				}}
				onPressNo={() => {
					setVisibleModal2(!visibleModal2)
				}}
			/> */}
		</>
	)
}

export default BasicDetailsForm
