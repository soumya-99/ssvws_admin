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

function HouseholdDetailsForm() {
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
		h_no_of_rooms: "",
		h_parental_address: "",
		h_parental_phone: "",
		h_house_type: "",
		h_own_rent: "",
		h_total_land: "",
		h_politically_active: "",
		h_tv: "",
		h_bike: "",
		h_fridge: "",
		h_washing_machine: "",
	}
	const [formValues, setValues] = useState({
		h_no_of_rooms: "",
		h_parental_address: "",
		h_parental_phone: "",
		h_house_type: "",
		h_own_rent: "",
		h_total_land: "",
		h_politically_active: "",
		h_tv: "",
		h_bike: "",
		h_fridge: "",
		h_washing_machine: "",
	})

	const getExtension = (fileName) => {
		if (!fileName) return ""
		const lastDotIndex = fileName.lastIndexOf(".")
		return lastDotIndex !== -1
			? fileName.slice(lastDotIndex + 1).toLowerCase()
			: ""
	}

	const validationSchema = Yup.object({
		h_no_of_rooms: Yup.string().optional(),
		h_parental_address: Yup.string().optional(),
		h_parental_phone: Yup.string().optional(),
		h_house_type: Yup.string().optional(),
		h_own_rent: Yup.string().optional(),
		h_total_land: Yup.string().optional(),
		h_politically_active: Yup.string().optional(),
		h_tv: Yup.string().optional(),
		h_bike: Yup.string().optional(),
		h_fridge: Yup.string().optional(),
		h_washing_machine: Yup.string().optional(),
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

	// h_no_of_rooms: "",
	// h_parental_address: "",
	// h_parental_phone: "",
	// h_house_type: "",
	// h_own_rent: "",
	// h_total_land: "",
	// h_politically_active: "",
	// h_tv: "",
	// h_bike: "",
	// h_fridge: "",
	// h_washing_machine: "",

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
									placeholder="No. of rooms"
									type="number"
									label="No. of rooms"
									name="h_no_of_rooms"
									formControlName={formik.values.h_no_of_rooms}
									mode={1}
								/>
								{formik.errors.h_no_of_rooms && formik.touched.h_no_of_rooms ? (
									<VError title={formik.errors.h_no_of_rooms} />
								) : null}
							</div>
							<div>
								<TDInputTemplateBr
									placeholder="Type Parental Address..."
									type="text"
									label={`Parental Address`}
									name="h_parental_address"
									formControlName={formik.values.h_parental_address}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={3}
								/>
								{formik.errors.h_parental_address &&
								formik.touched.h_parental_address ? (
									<VError title={formik.errors.h_parental_address} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="House Type"
									type="text"
									label="House Type"
									name="h_house_type"
									formControlName={formik.values.h_house_type}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									data={loanTypes?.map((loan) => ({
										code: loan?.sl_no,
										name: loan?.loan_type,
									}))}
									mode={2}
								/>
								{formik.errors.h_house_type && formik.touched.h_house_type ? (
									<VError title={formik.errors.h_house_type} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Own or Rent"
									type="text"
									label="Own or Rent"
									name="h_own_rent"
									formControlName={formik.values.h_own_rent}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									data={[
										{
											code: "O",
											name: "OWN",
										},
										{
											code: "R",
											name: "RENT",
										},
									]}
									mode={2}
								/>
								{formik.errors.h_own_rent && formik.touched.h_own_rent ? (
									<VError title={formik.errors.h_own_rent} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Total Land"
									type="number"
									label="Total Land"
									name="h_total_land"
									formControlName={formik.values.h_total_land}
									mode={1}
								/>
								{formik.errors.h_total_land && formik.touched.h_total_land ? (
									<VError title={formik.errors.h_total_land} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Politically Active"
									type="text"
									label="Politically Active"
									name="h_politically_active"
									formControlName={formik.values.h_politically_active}
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
								{formik.errors.h_politically_active &&
								formik.touched.h_politically_active ? (
									<VError title={formik.errors.h_politically_active} />
								) : null}
							</div>
							<div>
								<TDInputTemplateBr
									placeholder="Own a TV?"
									type="text"
									label="Own a TV?"
									name="h_tv"
									formControlName={formik.values.h_tv}
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
								{formik.errors.h_tv && formik.touched.h_tv ? (
									<VError title={formik.errors.h_tv} />
								) : null}
							</div>
							<div>
								<TDInputTemplateBr
									placeholder="Own a Bike?"
									type="text"
									label="Own a Bike?"
									name="h_bike"
									formControlName={formik.values.h_bike}
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
								{formik.errors.h_bike && formik.touched.h_bike ? (
									<VError title={formik.errors.h_bike} />
								) : null}
							</div>
							<div>
								<TDInputTemplateBr
									placeholder="Own a Fridge?"
									type="text"
									label="Own a Fridge?"
									name="h_fridge"
									formControlName={formik.values.h_fridge}
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
								{formik.errors.h_fridge && formik.touched.h_fridge ? (
									<VError title={formik.errors.h_fridge} />
								) : null}
							</div>
							<div>
								<TDInputTemplateBr
									placeholder="Own a Washing Machine?"
									type="text"
									label="Own a Machine?"
									name="h_washing_machine"
									formControlName={formik.values.h_washing_machine}
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
								{formik.errors.h_washing_machine &&
								formik.touched.h_washing_machine ? (
									<VError title={formik.errors.h_washing_machine} />
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

export default HouseholdDetailsForm
