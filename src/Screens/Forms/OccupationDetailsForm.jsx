import React, { useEffect, useState } from "react"
import "../LoanForm/LoanForm.css"
import { useParams } from "react-router"
import BtnComp from "../../Components/BtnComp"
import VError from "../../Components/VError"
import TDInputTemplate from "../../Components/TDInputTemplate"
import { useNavigate } from "react-router-dom"
import { FieldArray, Formik, useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Message } from "../../Components/Message"
import { url } from "../../Address/BaseUrl"
import { Spin, Button, Popconfirm, Tag, Timeline } from "antd"
import {
	LoadingOutlined,
	DeleteOutlined,
	PlusOutlined,
	MinusOutlined,
	FilePdfOutlined,
	MinusCircleOutlined,
	ClockCircleOutlined,
	ArrowRightOutlined,
} from "@ant-design/icons"
import FormHeader from "../../Components/FormHeader"
import { routePaths } from "../../Assets/Data/Routes"
import { useLocation } from "react-router"
import Sidebar from "../../Components/Sidebar"
import DialogBox from "../../Components/DialogBox"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import TimelineComp from "../../Components/TimelineComp"

function OccupationDetailsForm() {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const { loanAppData } = location.state || {}
	const navigate = useNavigate()

	const [branches, setBranches] = useState(() => [])
	const [loanTypes, setLoanTypes] = useState(() => [])
	const [fileArray, setFileArray] = useState(() => [])
	const [visibleModal, setVisibleModal] = useState(() => false)
	const [visibleModal2, setVisibleModal2] = useState(() => false)

	console.log(params, "params")
	console.log(location, "location")

	const initialValues = {
		o_self_occupation: "",
		o_self_monthly_income: "",
		o_spouse_occupation: "",
		o_spouse_monthly_income: "",
		o_purpose_of_loan: "",
		o_sub_purpose_of_loan: "",
		o_amount_applied: "",
		o_other_loans: "",
		o_other_loan_amount: "",
		o_monthly_emi: "",
	}
	const [formValues, setValues] = useState({
		o_self_occupation: "",
		o_self_monthly_income: "",
		o_spouse_occupation: "",
		o_spouse_monthly_income: "",
		o_purpose_of_loan: "",
		o_sub_purpose_of_loan: "",
		o_amount_applied: "",
		o_other_loans: "",
		o_other_loan_amount: "",
		o_monthly_emi: "",
	})

	const getExtension = (fileName) => {
		if (!fileName) return ""
		const lastDotIndex = fileName.lastIndexOf(".")
		return lastDotIndex !== -1
			? fileName.slice(lastDotIndex + 1).toLowerCase()
			: ""
	}

	const validationSchema = Yup.object({
		o_self_occupation: Yup.string().required("Required"),
		o_self_monthly_income: Yup.string().required("Required"),
		o_spouse_occupation: Yup.string().required("Required"),
		o_spouse_monthly_income: Yup.string().required("Required"),
		o_purpose_of_loan: Yup.string().required("Required"),
		o_sub_purpose_of_loan: Yup.string().optional(),
		o_amount_applied: Yup.string().required("Required"),
		o_other_loans: Yup.string().required("Required"),
		o_other_loan_amount: Yup.string().optional(),
		o_monthly_emi: Yup.string().optional(),
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

	const fetchApplicationDetails = async () => {
		setLoading(true)
		await axios
			.get(
				`${url}/brn/fetch_brn_pen_dtls?user_id=${+JSON.parse(
					localStorage.getItem("br_mgr_details")
				)?.id}&application_no=${params?.id}`
			)
			.then((res) => {
				if (res?.data?.suc === 1) {
					setValues({
						// l_member_id: res?.data?.msg[0]?.pending_dtls[0]?.member_id,
						// l_membership_date:
						// 	new Date(res?.data?.msg[0]?.pending_dtls[0]?.member_dt)
						// 		?.toISOString()
						// 		?.split("T")[0] || "",
						// l_name: res?.data?.msg[0]?.pending_dtls[0]?.member_name,
						// l_father_husband_name:
						// 	res?.data?.msg[0]?.pending_dtls[0]?.father_name,
						// l_gender: res?.data?.msg[0]?.pending_dtls[0]?.gender,
						// l_dob:
						// 	new Date(res?.data?.msg[0]?.pending_dtls[0]?.dob)
						// 		?.toISOString()
						// 		?.split("T")[0] || "",
						// l_email: res?.data?.msg[0]?.pending_dtls[0]?.email,
						// l_mobile_no: res?.data?.msg[0]?.pending_dtls[0]?.mobile_no,
						// l_address: res?.data?.msg[0]?.pending_dtls[0]?.memb_address,
						// l_loan_through_branch:
						// 	res?.data?.msg[0]?.pending_dtls[0]?.branch_code,
						// l_applied_for: res?.data?.msg[0]?.pending_dtls[0]?.loan_type,
						// l_loan_amount: res?.data?.msg[0]?.pending_dtls[0]?.loan_amt,
						// l_duration: res?.data?.msg[0]?.pending_dtls[0]?.loan_period,
						// l_documents: [{ l_file_name: "", l_file: "" }],
					})

					// console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", res?.data)
					// setAppraiserForwardedDate(
					// 	res?.data?.msg[0]?.pending_dtls[0]?.forwarded_dt
					// )
					// setFetchedRemarks(res?.data?.msg[0]?.pending_dtls[0]?.remarks)
					// // setForwardedByName(res?.data?.msg[0]?.forward_appr_name)
					// setLoanApproveStatus(
					// 	res?.data?.msg[0]?.pending_dtls[0]?.application_status
					// )
					// setForwardedById(res?.data?.msg[0]?.pending_dtls[0]?.forwarded_by)
					// setRejectReasonsArray(res?.data?.msg[0]?.reject_dt)
				} else {
					Message("warning", "No data found!")
				}
			})
			.catch((err) => {
				console.log("Error loan", err)
				Message("error", "Some error occurred while fetching loan details.")
			})
		// await fetchUploadedFiles()
		setLoading(false)
	}

	useEffect(() => {
		fetchApplicationDetails()
	}, [])

	const formik = useFormik({
		initialValues: formValues,
		onSubmit,
		validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		enableReinitialize: true,
		validateOnMount: true,
	})

	// console.log("======================================", +branchIdForForwarding)

	// o_self_occupation: "",
	// o_self_monthly_income: "",
	// o_spouse_occupation: "",
	// o_spouse_monthly_income: "",
	// o_purpose_of_loan: "",
	// o_sub_purpose_of_loan: "",
	// o_amount_applied: "",
	// o_other_loans: "",
	// o_other_loan_amount: "",
	// o_monthly_emi: "",

	return (
		<>
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>
				<form onSubmit={formik.handleSubmit}>
					<div className="">
						<div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
							<div>
								<TDInputTemplateBr
									placeholder="Type self occupation..."
									type="text"
									label="Self Occupation"
									name="o_self_occupation"
									formControlName={formik.values.o_self_occupation}
									mode={1}
								/>
								{formik.errors.o_self_occupation &&
								formik.touched.o_self_occupation ? (
									<VError title={formik.errors.o_self_occupation} />
								) : null}
							</div>
							<div>
								<TDInputTemplateBr
									placeholder="Type monthly income..."
									type="number"
									label="Monthly Income"
									name="o_self_monthly_income"
									formControlName={formik.values.o_self_monthly_income}
									mode={1}
								/>
								{formik.errors.o_self_monthly_income &&
								formik.touched.o_self_monthly_income ? (
									<VError title={formik.errors.o_self_monthly_income} />
								) : null}
							</div>
							<div>
								<TDInputTemplateBr
									placeholder="Type spouse occupation..."
									type="number"
									label="Spouse Occupation"
									name="o_spouse_occupation"
									formControlName={formik.values.o_spouse_occupation}
									mode={1}
								/>
								{formik.errors.o_spouse_occupation &&
								formik.touched.o_spouse_occupation ? (
									<VError title={formik.errors.o_spouse_occupation} />
								) : null}
							</div>
							<div>
								<TDInputTemplateBr
									placeholder="Spouse monthly income..."
									type="number"
									label="Spouse Monthly Income"
									name="o_spouse_monthly_income"
									formControlName={formik.values.o_spouse_monthly_income}
									mode={1}
								/>
								{formik.errors.o_spouse_monthly_income &&
								formik.touched.o_spouse_monthly_income ? (
									<VError title={formik.errors.o_spouse_monthly_income} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Purpose of Loan"
									type="text"
									label="Purpose of Loan"
									name="o_purpose_of_loan"
									formControlName={formik.values.o_purpose_of_loan}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									data={loanTypes?.map((loan) => ({
										code: loan?.sl_no,
										name: loan?.loan_type,
									}))}
									mode={2}
								/>
								{formik.errors.o_purpose_of_loan &&
								formik.touched.o_purpose_of_loan ? (
									<VError title={formik.errors.o_purpose_of_loan} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Sub Purpose of Loan"
									type="text"
									label="Sub Purpose of Loan"
									name="o_sub_purpose_of_loan"
									formControlName={formik.values.o_sub_purpose_of_loan}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									data={loanTypes?.map((loan) => ({
										code: loan?.sl_no,
										name: loan?.loan_type,
									}))}
									mode={2}
								/>
								{formik.errors.o_sub_purpose_of_loan &&
								formik.touched.o_sub_purpose_of_loan ? (
									<VError title={formik.errors.o_sub_purpose_of_loan} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Type Amount applied..."
									type="number"
									label="Amount Applied"
									name="o_amount_applied"
									formControlName={formik.values.o_amount_applied}
									mode={1}
								/>
								{formik.errors.o_amount_applied &&
								formik.touched.o_amount_applied ? (
									<VError title={formik.errors.o_amount_applied} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Other Loans"
									type="text"
									label="Other Loans"
									name="o_other_loans"
									formControlName={formik.values.o_other_loans}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									data={[
										{
											code: "Y",
											name: "YES",
										},
										{
											code: "N",
											name: "NO",
										},
									]}
									mode={2}
								/>
								{formik.errors.o_other_loans && formik.touched.o_other_loans ? (
									<VError title={formik.errors.o_other_loans} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Other loan amount"
									type="number"
									label="Other Loan Amount"
									name="o_other_loan_amount"
									formControlName={formik.values.o_other_loan_amount}
									mode={1}
								/>
								{formik.errors.o_other_loan_amount &&
								formik.touched.o_other_loan_amount ? (
									<VError title={formik.errors.o_other_loan_amount} />
								) : null}
							</div>
							<div>
								<TDInputTemplateBr
									placeholder="Other loan EMI"
									type="number"
									label="Other loan EMI"
									name="o_monthly_emi"
									formControlName={formik.values.o_monthly_emi}
									mode={1}
								/>
								{formik.errors.o_monthly_emi && formik.touched.o_monthly_emi ? (
									<VError title={formik.errors.o_monthly_emi} />
								) : null}
							</div>
						</div>

						{/* {loanApproveStatus !== "A" && loanApproveStatus !== "R" ? (
							<div className="mt-10">
								<BtnComp
									mode="S"
									rejectBtn={true}
									onReject={() => {
										setVisibleModal2(true)
									}}
									sendToText="Credit Manager"
									onSendTo={() => setVisibleModal(true)}
									condition={fetchedFileDetails?.length > 0}
									showSave
								/>
							</div>
						) : loanApproveStatus === "A" ? (
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
		</>
	)
}

export default OccupationDetailsForm
