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

function FamilyMemberDetailsForm() {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const { loanAppData } = location.state || {}
	const navigate = useNavigate()

	console.log(params, "params")
	console.log(location, "location")

	const [formArray, setFormArray] = useState([
		{
			sl_no: 0,
			f_name: "",
			f_relation: "",
			f_age: "",
			f_sex: "",
			f_education: "",
			f_studying_or_working: "",
			f_monthly_income: "",
		},
	])

	const handleFormAdd = () => {
		setFormArray((prev) => [
			...prev,
			{
				sl_no: 0,
				f_name: "",
				f_relation: "",
				f_age: "",
				f_sex: "",
				f_education: "",
				f_studying_or_working: "",
				f_monthly_income: "",
			},
		])
	}

	const handleFormRemove = (index) => {
		setFormArray((prev) => prev.filter((_, i) => i !== index))
	}

	const handleInputChange = (index, field, value) => {
		if (formArray[index]) {
			const updatedForm = [...formArray]
			updatedForm[index][field] = value
			setFormArray(updatedForm)

			console.log("LLLLLKKKKKKKKKKKK", formArray)
		} else {
			console.error(`No form item found at index ${index}`)
		}
	}

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

	// const fetchApplicationDetails = async () => {
	// 	setLoading(true)
	// 	await axios
	// 		.get(
	// 			`${url}/brn/fetch_brn_pen_dtls?user_id=${+JSON.parse(
	// 				localStorage.getItem("br_mgr_details")
	// 			)?.id}&application_no=${params?.id}`
	// 		)
	// 		.then((res) => {
	// 			if (res?.data?.suc === 1) {
	// 				setValues({
	// 					// l_member_id: res?.data?.msg[0]?.pending_dtls[0]?.member_id,
	// 					// l_membership_date:
	// 					// 	new Date(res?.data?.msg[0]?.pending_dtls[0]?.member_dt)
	// 					// 		?.toISOString()
	// 					// 		?.split("T")[0] || "",
	// 					// l_name: res?.data?.msg[0]?.pending_dtls[0]?.member_name,
	// 					// l_father_husband_name:
	// 					// 	res?.data?.msg[0]?.pending_dtls[0]?.father_name,
	// 					// l_gender: res?.data?.msg[0]?.pending_dtls[0]?.gender,
	// 					// l_dob:
	// 					// 	new Date(res?.data?.msg[0]?.pending_dtls[0]?.dob)
	// 					// 		?.toISOString()
	// 					// 		?.split("T")[0] || "",
	// 					// l_email: res?.data?.msg[0]?.pending_dtls[0]?.email,
	// 					// l_mobile_no: res?.data?.msg[0]?.pending_dtls[0]?.mobile_no,
	// 					// l_address: res?.data?.msg[0]?.pending_dtls[0]?.memb_address,
	// 					// l_loan_through_branch:
	// 					// 	res?.data?.msg[0]?.pending_dtls[0]?.branch_code,
	// 					// l_applied_for: res?.data?.msg[0]?.pending_dtls[0]?.loan_type,
	// 					// l_loan_amount: res?.data?.msg[0]?.pending_dtls[0]?.loan_amt,
	// 					// l_duration: res?.data?.msg[0]?.pending_dtls[0]?.loan_period,
	// 					// l_documents: [{ l_file_name: "", l_file: "" }],
	// 				})

	// 				// console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", res?.data)
	// 				// setAppraiserForwardedDate(
	// 				// 	res?.data?.msg[0]?.pending_dtls[0]?.forwarded_dt
	// 				// )
	// 				// setFetchedRemarks(res?.data?.msg[0]?.pending_dtls[0]?.remarks)
	// 				// // setForwardedByName(res?.data?.msg[0]?.forward_appr_name)
	// 				// setLoanApproveStatus(
	// 				// 	res?.data?.msg[0]?.pending_dtls[0]?.application_status
	// 				// )
	// 				// setForwardedById(res?.data?.msg[0]?.pending_dtls[0]?.forwarded_by)
	// 				// setRejectReasonsArray(res?.data?.msg[0]?.reject_dt)
	// 			} else {
	// 				Message("warning", "No data found!")
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log("Error loan", err)
	// 			Message("error", "Some error occurred while fetching loan details.")
	// 		})
	// 	// await fetchUploadedFiles()
	// 	setLoading(false)
	// }

	// useEffect(() => {
	// 	fetchApplicationDetails()
	// }, [])

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<>
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>
				<form onSubmit={handleSubmit}>
					<div className="">
						{formArray?.map((item, i) => (
							<React.Fragment key={i}>
								<div className="grid gap-4 sm:grid-cols-3 sm:gap-6 my-5 justify-center items-center">
									<div>
										<TDInputTemplateBr
											placeholder="Name"
											type="text"
											label="Name"
											name={`${item?.f_name}_${i}`}
											formControlName={item?.f_name}
											handleChange={(txt) =>
												handleInputChange(i, "f_name", txt.target.value)
											}
											mode={1}
										/>
									</div>
									<div>
										<TDInputTemplateBr
											placeholder="Relation"
											type="text"
											label="Relation"
											name={`${item?.f_relation}_${i}`}
											formControlName={item?.f_relation}
											handleChange={(txt) =>
												handleInputChange(i, "f_relation", txt.target.value)
											}
											mode={1}
										/>
									</div>
									<div>
										<TDInputTemplateBr
											placeholder="Age"
											type="number"
											label="Age"
											name={`${item?.f_age}_${i}`}
											formControlName={item?.f_age}
											handleChange={(txt) =>
												handleInputChange(i, "f_age", txt.target.value)
											}
											mode={1}
										/>
									</div>
									<div>
										<TDInputTemplateBr
											placeholder="Choose Gender"
											type="text"
											label="Choose Gender"
											name={`${item?.f_sex}_${i}`}
											formControlName={item?.f_sex}
											handleChange={(txt) =>
												handleInputChange(i, "f_sex", txt.target.value)
											}
											data={[
												{
													code: "M",
													name: "MALE",
												},
												{
													code: "F",
													name: "FEMALE",
												},
												{
													code: "O",
													name: "OTHERS",
												},
											]}
											mode={2}
										/>
									</div>
									<div>
										<TDInputTemplateBr
											placeholder="Choose Education"
											type="text"
											label="Choose Education"
											name={`${item?.f_education}_${i}`}
											formControlName={item?.f_education}
											handleChange={(txt) =>
												handleInputChange(i, "f_education", txt.target.value)
											}
											data={[
												{
													code: "M",
													name: "MALE",
												},
												{
													code: "F",
													name: "FEMALE",
												},
												{
													code: "O",
													name: "OTHERS",
												},
											]}
											mode={2}
										/>
									</div>
									<div>
										<TDInputTemplateBr
											placeholder="Study/Work"
											type="text"
											label="Study/Work"
											name={`${item?.f_studying_or_working}_${i}`}
											formControlName={item?.f_studying_or_working}
											handleChange={(txt) =>
												handleInputChange(
													i,
													"f_studying_or_working",
													txt.target.value
												)
											}
											data={[
												{
													code: "S",
													name: "STUDYING",
												},
												{
													code: "W",
													name: "WORKING",
												},
											]}
											mode={2}
										/>
									</div>
									<div>
										<TDInputTemplateBr
											placeholder="Monthly Income"
											type="number"
											label="Monthly Income"
											name={`${item?.f_monthly_income}_${i}`}
											formControlName={item?.f_monthly_income}
											handleChange={(txt) =>
												handleInputChange(
													i,
													"f_monthly_income",
													txt.target.value
												)
											}
											mode={1}
										/>
									</div>
								</div>
								{formArray.length > 1 && (
									<div>
										<Button
											className="rounded-full bg-red-700 text-white"
											onClick={() => handleFormRemove(i)}
											icon={<MinusOutlined />}
										></Button>
									</div>
								)}
								{/* <hr /> */}
							</React.Fragment>
						))}

						<div className="pt-1">
							<Button
								className="rounded-full bg-yellow-400 text-white"
								onClick={handleFormAdd}
								icon={<PlusOutlined />}
							></Button>
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

export default FamilyMemberDetailsForm
