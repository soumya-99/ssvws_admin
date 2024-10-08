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
import { Spin, Button, Popconfirm, Tag, Timeline, Divider } from "antd"
import {
	LoadingOutlined,
	DeleteOutlined,
	PlusOutlined,
	MinusOutlined,
	FilePdfOutlined,
	MinusCircleOutlined,
	ClockCircleOutlined,
	ArrowRightOutlined,
	UserOutlined,
} from "@ant-design/icons"
import FormHeader from "../../Components/FormHeader"
import { routePaths } from "../../Assets/Data/Routes"
import { useLocation } from "react-router"
import Sidebar from "../../Components/Sidebar"
import DialogBox from "../../Components/DialogBox"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import TimelineComp from "../../Components/TimelineComp"

function GroupExtendedForm({}) {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const { loanAppData } = location.state || {}
	const navigate = useNavigate()

	const [memberDetails, setMemberDetails] = useState(() => [])

	console.log(params, "paramsssssssssssssss")
	console.log(location, "location")

	const initialValues = {
		g_group_name: "",
		g_group_type: "",
		g_address: "",
		g_pin: "",
		g_group_block: "",
		g_phone1: "",
		g_phone2: "",
		g_email: "",
		g_bank_name: "",
		g_bank_branch: "",
		g_ifsc: "",
		g_micr: "",
		g_acc1: "",
		g_acc2: "",
	}
	const [formValues, setValues] = useState({
		g_group_name: "",
		g_group_type: "",
		g_address: "",
		g_pin: "",
		g_group_block: "",
		g_phone1: "",
		g_phone2: "",
		g_email: "",
		g_bank_name: "",
		g_bank_branch: "",
		g_ifsc: "",
		g_micr: "",
		g_acc1: "",
		g_acc2: "",
	})

	const validationSchema = Yup.object({
		g_group_name: Yup.string().optional(),
		g_group_type: Yup.string().optional(),
		g_address: Yup.string().optional(),
		g_pin: Yup.string().optional(),
		g_group_block: Yup.string().optional(),
		g_phone1: Yup.string().optional(),
		g_phone2: Yup.string().optional(),
		g_email: Yup.string().optional(),
		g_bank_name: Yup.string().optional(),
		g_bank_branch: Yup.string().optional(),
		g_ifsc: Yup.string().optional(),
		g_micr: Yup.string().optional(),
		g_acc1: Yup.string().optional(),
		g_acc2: Yup.string().optional(),
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

	const fetchGroupAndMembersDetails = async () => {
		setLoading(true)
		await axios
			.get(`${url}/admin/fetch_bmfwd_dtls_web?prov_grp_code=${params?.id}`)
			.then((res) => {
				console.log("TETETETETTETETETTETE", res?.data)
				setValues({
					g_group_name: res?.data?.msg[0]?.group_name,
					g_group_type: res?.data?.msg[0]?.group_type,
					g_address: res?.data?.msg[0]?.grp_addr,
					g_pin: res?.data?.msg[0]?.pin_no,
					g_group_block: res?.data?.msg[0]?.block,
					g_phone1: res?.data?.msg[0]?.phone1,
					g_phone2: res?.data?.msg[0]?.phone2,
					g_email: res?.data?.msg[0]?.email_id,
					g_bank_name: res?.data?.msg[0]?.bank_name,
					g_bank_branch: res?.data?.msg[0]?.branch_name,
					g_ifsc: res?.data?.msg[0]?.ifsc,
					g_micr: res?.data?.msg[0]?.micr,
					g_acc1: res?.data?.msg[0]?.acc_no1,
					g_acc2: res?.data?.msg[0]?.acc_no2,
				})

				setMemberDetails(res?.data?.msg[0]?.memb_dt)
			})
			.catch((err) => {
				console.log("ERRRRRRPPPPEEEE", err)
			})
		setLoading(false)
	}

	useEffect(() => {
		fetchGroupAndMembersDetails()
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

	return (
		<>
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>
				<form onSubmit={formik.handleSubmit}>
					<div className="flex justify-start gap-5">
						<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 w-1/2">
							<div>
								<TDInputTemplateBr
									placeholder="Group Name"
									type="text"
									label="Group Name"
									name="g_group_name"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									formControlName={formik.values.g_group_name}
									mode={1}
								/>
								{formik.errors.g_group_name && formik.touched.g_group_name ? (
									<VError title={formik.errors.g_group_name} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Group Type"
									type="text"
									label="Group Type"
									name="g_group_type"
									formControlName={formik.values.g_group_type}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									data={[
										{
											code: "S",
											name: "SHG",
										},
										{
											code: "J",
											name: "JLG",
										},
									]}
									mode={2}
								/>
								{formik.errors.g_group_type && formik.touched.g_group_type ? (
									<VError title={formik.errors.g_group_type} />
								) : null}
							</div>

							<div className="sm:col-span-2">
								<TDInputTemplateBr
									placeholder="Type Address..."
									type="text"
									label={`Address`}
									name="g_address"
									formControlName={formik.values.g_address}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={3}
								/>
								{formik.errors.g_address && formik.touched.g_address ? (
									<VError title={formik.errors.g_address} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="PIN No."
									type="number"
									label="PIN No."
									name="g_pin"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									formControlName={formik.values.g_pin}
									mode={1}
								/>
								{formik.errors.g_pin && formik.touched.g_pin ? (
									<VError title={formik.errors.g_pin} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Mobile No. 1"
									type="number"
									label="Mobile No. 1"
									name="g_phone1"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									formControlName={formik.values.g_phone1}
									mode={1}
								/>
								{formik.errors.g_phone1 && formik.touched.g_phone1 ? (
									<VError title={formik.errors.g_phone1} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Mobile No. 2"
									type="number"
									label="Mobile No. 2"
									name="g_phone2"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									formControlName={formik.values.g_phone2}
									mode={1}
								/>
								{formik.errors.g_phone2 && formik.touched.g_phone2 ? (
									<VError title={formik.errors.g_phone2} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Email"
									type="email"
									label="Email"
									name="g_email"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									formControlName={formik.values.g_email}
									mode={1}
								/>
								{formik.errors.g_email && formik.touched.g_email ? (
									<VError title={formik.errors.g_email} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Bank Name"
									type="text"
									label="Bank Name"
									name="g_bank_name"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									formControlName={formik.values.g_bank_name}
									mode={1}
								/>
								{formik.errors.g_bank_name && formik.touched.g_bank_name ? (
									<VError title={formik.errors.g_bank_name} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Bank Branch"
									type="text"
									label="Bank Branch"
									name="g_bank_branch"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									formControlName={formik.values.g_bank_branch}
									mode={1}
								/>
								{formik.errors.g_bank_branch && formik.touched.g_bank_branch ? (
									<VError title={formik.errors.g_bank_branch} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="IFSC"
									type="text"
									label="IFSC Code"
									name="g_ifsc"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									formControlName={formik.values.g_ifsc}
									mode={1}
								/>
								{formik.errors.g_ifsc && formik.touched.g_ifsc ? (
									<VError title={formik.errors.g_ifsc} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="MICR"
									type="text"
									label="MICR Code"
									name="g_micr"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									formControlName={formik.values.g_micr}
									mode={1}
								/>
								{formik.errors.g_micr && formik.touched.g_micr ? (
									<VError title={formik.errors.g_micr} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Account No. 1"
									type="number"
									label="Account No. 1"
									name="g_acc1"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									formControlName={formik.values.g_acc1}
									mode={1}
								/>
								{formik.errors.g_acc1 && formik.touched.g_acc1 ? (
									<VError title={formik.errors.g_acc1} />
								) : null}
							</div>

							<div>
								<TDInputTemplateBr
									placeholder="Account No. 2"
									type="number"
									label="Account No. 2"
									name="g_acc2"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									formControlName={formik.values.g_acc2}
									mode={1}
								/>
								{formik.errors.g_acc2 && formik.touched.g_acc2 ? (
									<VError title={formik.errors.g_acc2} />
								) : null}
							</div>
						</div>
						<Divider
							type="vertical"
							style={{
								height: 650,
							}}
						/>
						<div className="w-1/2 gap-3 space-x-7">
							<div className="text-blue-700 mb-2 font-bold">
								Members in this Group
							</div>

							{console.log("+++++++++++++++++++++++++++++", memberDetails)}

							{memberDetails?.map((item, i) => (
								<Tag
									key={i}
									icon={<UserOutlined />}
									color="purple"
									className="text-lg cursor-pointer mb-5"
									onClick={() =>
										navigate(`/homemis/editgrtform/${item?.form_no}`, {
											state: item,
										})
									}
								>
									{item?.client_name}
								</Tag>
							))}
						</div>
					</div>
					<BtnComp
						mode="A"
						// rejectBtn={true}
						// onReject={() => {
						// 	setVisibleModal(false)
						// }}
						onReset={formik.resetForm}
						sendToText="Credit Manager"
						onSendTo={() => console.log("dsaf")}
						// condition={fetchedFileDetails?.length > 0}
						// showSave
					/>
				</form>
			</Spin>
		</>
	)
}

export default GroupExtendedForm
