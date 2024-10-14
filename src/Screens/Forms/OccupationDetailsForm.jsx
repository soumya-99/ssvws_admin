import React, { useEffect, useState } from "react"
import "../LoanForm/LoanForm.css"
import { useParams } from "react-router"
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
import BtnComp from "../../Components/BtnComp"

function OccupationDetailsForm() {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const { loanAppData } = location.state || {}
	const navigate = useNavigate()
	const [visibleModal, setVisibleModal] = useState(() => false)

	const [purposeOfLoan, setPurposeOfLoan] = useState(() => [])
	const [subPurposeOfLoan, setSubPurposeOfLoan] = useState(() => [])

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

	const fetchOccupDetails = async () => {
		await axios
			.get(`${url}/admin/fetch_occup_dt_web?form_no=${params?.id}`)
			.then((res) => {
				console.log("PPPPPPPPPPPPPPPPPP", res?.data)
				setValues({
					o_self_occupation: res?.data?.msg[0]?.self_occu,
					o_self_monthly_income: res?.data?.msg[0]?.self_income,
					o_spouse_occupation: res?.data?.msg[0]?.spouse_occu,
					o_spouse_monthly_income: res?.data?.msg[0]?.spouse_income,
					o_purpose_of_loan: res?.data?.msg[0]?.loan_purpose,
					o_sub_purpose_of_loan: res?.data?.msg[0]?.sub_pupose,
					o_amount_applied: res?.data?.msg[0]?.applied_amt,
					o_other_loans: res?.data?.msg[0]?.other_loan_flag,
					o_other_loan_amount: res?.data?.msg[0]?.other_loan_amt,
					o_monthly_emi: res?.data?.msg[0]?.other_loan_emi,
				})
			})
			.catch((err) => {
				console.log("ERRRR", err)
			})
	}

	useEffect(() => {
		fetchOccupDetails()
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

	const getPurposeOfLoan = async () => {
		await axios
			.get(`${url}/get_purpose`)
			.then((res) => {
				console.log("------------", res?.data)
				setPurposeOfLoan(res?.data?.msg)
			})
			.catch((err) => {
				console.log("+==========+", err)
			})
	}

	useEffect(() => {
		getPurposeOfLoan()
	}, [])

	const getSubPurposeOfLoan = async (purpId) => {
		setLoading(true)
		await axios
			.get(`${url}/get_sub_purpose?purp_id=${purpId}`)
			.then((res) => {
				console.log("------------", res?.data)
				setSubPurposeOfLoan(res?.data?.msg)
			})
			.catch((err) => {
				console.log("+==========+", err)
			})
		setLoading(false)
	}

	useEffect(() => {
		getSubPurposeOfLoan(formik.values.o_purpose_of_loan)
	}, [formik.values.o_purpose_of_loan])

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
									data={purposeOfLoan?.map((loan) => ({
										code: loan?.purp_id,
										name: loan?.purpose_id,
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
									data={subPurposeOfLoan?.map((loan) => ({
										code: loan?.sub_purp_id,
										name: loan?.sub_purp_name,
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

							{formik.values.o_other_loans === "Y" && (
								<>
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
										{formik.errors.o_monthly_emi &&
										formik.touched.o_monthly_emi ? (
											<VError title={formik.errors.o_monthly_emi} />
										) : null}
									</div>
								</>
							)}
						</div>

						<div className="mt-10">
							<BtnComp
								mode="A"
								// rejectBtn={true}
								// onReject={() => {
								// 	setVisibleModal2(true)
								// }}
								// sendToText="Credit Manager"
								onSendTo={() => setVisibleModal(true)}
								// condition={fetchedFileDetails?.length > 0}
								// showSave
							/>
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
