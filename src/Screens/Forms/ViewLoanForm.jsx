import React, { useEffect, useRef, useState } from "react"
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
	EyeOutlined,
} from "@ant-design/icons"
import FormHeader from "../../Components/FormHeader"
import { routePaths } from "../../Assets/Data/Routes"
import { useLocation } from "react-router"
import Sidebar from "../../Components/Sidebar"
import DialogBox from "../../Components/DialogBox"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import TimelineComp from "../../Components/TimelineComp"

function ViewLoanForm({ groupDataArr }) {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const { loanAppData } = location.state || {}
	const navigate = useNavigate()
	const userDetails = JSON.parse(localStorage.getItem("user_details"))

	const [groupData, setGroupData] = useState(() => [])

	const [branches, setBranches] = useState(() => [])
	const [branch, setBranch] = useState(() => "")

	const [blocks, setBlocks] = useState(() => [])
	const [block, setBlock] = useState(() => "")

	const [groupDetails, setGroupDetails] = useState(() => [])
	const [memberDetails, setMemberDetails] = useState(() => [])
	const [visible, setVisible] = useState(() => false)

	const containerRef = useRef(null)

	const [isHovered, setIsHovered] = useState(false)

	const handleWheel = (event) => {
		if (isHovered && containerRef.current) {
			containerRef.current.scrollLeft += event.deltaY
			event.preventDefault()
		}
	}

	const handleMouseEnter = () => {
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
	}

	console.log(params, "paramsssssssssssssss")
	console.log(location, "location")

	const initialValues = {
		g_group_name: "",
		g_group_type: "",
		g_address: "",
		g_pin: "",
		// g_group_block: "",
		g_phone1: "",
		g_phone2: "",
		g_email: "",
		g_bank_name: "",
		g_bank_branch: "",
		g_ifsc: "",
		g_micr: "",
		g_acc1: "",
		g_acc2: "",
		g_branch_name: "",
		g_total_outstanding: "",
	}
	const [formValues, setValues] = useState(initialValues)

	const validationSchema = Yup.object({
		g_group_name: Yup.string().required("Group name is required"),
		g_group_type: Yup.string().required("Group type is required"),
		g_address: Yup.string().required("Group address is required"),
		g_pin: Yup.string().required("PIN No. is required"),
		// g_group_block: Yup.string().required("Group block is required"),
		g_phone1: Yup.string().required("Phone 1 is required"),
		// g_phone2: Yup.string(),
		// g_email: Yup.string(),
		// g_bank_name: Yup.string(),
		// g_bank_branch: Yup.string(),
		// g_ifsc: Yup.string(),
		// g_micr: Yup.string(),
		// g_acc1: Yup.string(),
		// g_acc2: Yup.string().optional(),
	})

	const fetchGroupDetails = async () => {
		setLoading(true)
		const creds = {
			group_code: params?.id,
		}
		await axios
			.post(`${url}/admin/fetch_search_grp_view`, creds)
			.then((res) => {
				console.log("........>>>>>>>>>>", res?.data)
				setValues({
					g_group_name: res?.data?.msg[0]?.group_name,
					g_group_type: res?.data?.msg[0]?.group_type,
					g_address:
						res?.data?.msg[0]?.grp_addr +
						", " +
						res?.data?.msg[0]?.block_name +
						", " +
						res?.data?.msg[0]?.pin_no,
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
					g_branch_name: res?.data?.msg[0]?.branch_name,
					g_total_outstanding: res?.data?.msg[0]?.total_outstanding,
				})
				setGroupData(res?.data?.msg)
				setBranch(
					res?.data?.msg[0]?.disctrict + "," + res?.data?.msg[0]?.branch_code
				)
				setBlock(res?.data?.msg[0]?.block)
			})
			.catch((err) => {
				Message("error", "Some error occurred while fetching group form")
			})
		setLoading(false)
	}

	useEffect(() => {
		fetchGroupDetails()
	}, [])

	// const fetchGroupAndMembersDetails = async () => {
	// 	setLoading(true)
	// 	const creds = {
	// 		prov_grp_code: params?.id,
	// 		user_type: userDetails?.id,
	// 		branch_code: userDetails?.brn_code,
	// 	}
	// 	await axios
	// 		.post(`${url}/admin/fetch_bmfwd_dtls_web`, creds)
	// 		.then((res) => {
	// 			console.log("TETETETETTETETETTETE", res?.data)
	// 			setValues({
	// 				g_group_name: res?.data?.msg[0]?.group_name,
	// 				g_group_type: res?.data?.msg[0]?.group_type,
	// 				g_address: res?.data?.msg[0]?.grp_addr,
	// 				g_pin: res?.data?.msg[0]?.pin_no,
	// 				g_group_block: res?.data?.msg[0]?.block,
	// 				g_phone1: res?.data?.msg[0]?.phone1,
	// 				g_phone2: res?.data?.msg[0]?.phone2,
	// 				g_email: res?.data?.msg[0]?.email_id,
	// 				g_bank_name: res?.data?.msg[0]?.bank_name,
	// 				g_bank_branch: res?.data?.msg[0]?.branch_name,
	// 				g_ifsc: res?.data?.msg[0]?.ifsc,
	// 				g_micr: res?.data?.msg[0]?.micr,
	// 				g_acc1: res?.data?.msg[0]?.acc_no1,
	// 				g_acc2: res?.data?.msg[0]?.acc_no2,
	// 			})
	// 			setGroupDetails(res?.data?.msg[0])
	// 			setMemberDetails(res?.data?.msg[0]?.memb_dt)
	// 		})
	// 		.catch((err) => {
	// 			console.log("ERRRRRRPPPPEEEE", err)
	// 		})
	// 	setLoading(false)
	// }

	// useEffect(() => {
	// 	fetchGroupAndMembersDetails()
	// }, [])

	// const handleFetchBranches = async () => {
	// 	setLoading(true)
	// 	await axios
	// 		.get(`${url}/admin/branch_name_mis?branch_code=${userDetails?.brn_code}`)
	// 		.then((res) => {
	// 			console.log("QQQQQQQQQQQQQQQQ", res?.data)
	// 			setBranches(res?.data?.msg)
	// 		})
	// 		.catch((err) => {
	// 			console.log("?????????????????????", err)
	// 		})

	// 	setLoading(false)
	// }

	// useEffect(() => {
	// 	handleFetchBranches()
	// }, [])

	// const handleFetchBlocks = async (brn) => {
	// 	setLoading(true)
	// 	await axios
	// 		.get(`${url}/get_block?dist_id=${brn}`)
	// 		.then((res) => {
	// 			console.log("******************", res?.data)
	// 			setBlocks(res?.data?.msg)
	// 		})
	// 		.catch((err) => {
	// 			console.log("!!!!!!!!!!!!!!!!", err)
	// 		})
	// 	setLoading(false)
	// }

	// useEffect(() => {
	// 	handleFetchBlocks(branch)
	// }, [branch])

	const onSubmit = async (values) => {
		console.log("onsubmit called")
		console.log(values, "onsubmit vendor")
		setLoading(true)

		setVisible(true)

		setLoading(false)
	}

	const formik = useFormik({
		initialValues: +params.id > 0 ? formValues : initialValues,
		onSubmit,
		validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		enableReinitialize: true,
		validateOnMount: true,
	})

	// const editGroup = async () => {
	// 	setLoading(true)
	// 	const creds = {
	// 		branch_code: branch?.split(",")[1],
	// 		group_name: formik.values.g_group_name,
	// 		group_type: formik.values.g_group_type,
	// 		// co_id: userDetails?.id,
	// 		phone1: formik.values.g_phone1,
	// 		phone2: formik.values.g_phone2,
	// 		email_id: formik.values.g_email,
	// 		grp_addr: formik.values.g_address,
	// 		// disctrict: groupDetails?.disctrict,
	// 		// block: formik.values.g_group_block,
	// 		pin_no: formik.values.g_pin,
	// 		bank_name: formik.values.g_bank_name,
	// 		branch_name: formik.values.g_bank_branch,
	// 		ifsc: formik.values.g_ifsc,
	// 		micr: formik.values.g_micr,
	// 		acc_no1: formik.values.g_acc1,
	// 		acc_no2: formik.values.g_acc2,
	// 		modified_by: userDetails?.emp_id,
	// 		// modified_at: formik.values.g_group_name,
	// 		group_code: params?.id,
	// 		district: branch?.split(",")[0], // this is dist_code, stored in selection of branch
	// 		block: block,
	// 		co_id: userDetails?.emp_id,
	// 	}
	// 	await axios
	// 		.post(`${url}/admin/edit_group_web`, creds)
	// 		.then((res) => {
	// 			Message("success", "Updated successfully.")
	// 			console.log("IIIIIIIIIIIIIIIIIIIIIII", res?.data)
	// 		})
	// 		.catch((err) => {
	// 			Message("error", "Some error occurred while updating.")
	// 			console.log("LLLLLLLLLLLLLLLLLLLLLLLL", err)
	// 		})
	// 	console.log("VVVVVVVVVVVVVVVVVVVVVVVV", creds)
	// 	setLoading(false)
	// }

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
							{/* {params?.id > 0 && (
								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Form filled by / CO Name"
										type="text"
										label="Form filled by / CO Name"
										name="co_name"
										formControlName={groupData[0]?.emp_name}
										mode={1}
										disabled
									/>
								</div>
							)} */}
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
									disabled
								/>
								{/* {formik.errors.g_group_name && formik.touched.g_group_name ? (
									<VError title={formik.errors.g_group_name} />
								) : null} */}
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
									disabled
								/>
								{/* {formik.errors.g_group_type && formik.touched.g_group_type ? (
									<VError title={formik.errors.g_group_type} />
								) : null} */}
							</div>

							{/* {userDetails?.id === 3 && ( */}
							<>
								<div className="sm:col-span-2">
									{/* <TDInputTemplateBr
										placeholder="Choose Branch"
										type="text"
										label="Branch"
										name="g_branch"
										formControlName={branch}
										handleChange={(e) => {
											setBranch(e.target.value)
											console.log(e.target.value)
										}}
										data={branches?.map((item, i) => ({
											code: item?.disctrict + "," + item?.branch_code,
											name: item?.branch_name,
										}))}
										mode={2}
										disabled
									/> */}
									<TDInputTemplateBr
										placeholder="Branch Name"
										type="text"
										label="Branch Name"
										name="g_branch_name"
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										formControlName={formik.values.g_branch_name}
										mode={1}
										disabled
									/>
								</div>
								{/* <div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Group Block"
										type="text"
										label="Group Block"
										name="g_block"
										formControlName={block}
										handleChange={(e) => setBlock(e.target.value)}
										data={blocks?.map((item, i) => ({
											code: item?.block_id,
											name: item?.block_name,
										}))}
										mode={2}
									/>
								</div> */}
							</>
							{/* )} */}

							<div className="sm:col-span-2">
								<TDInputTemplateBr
									placeholder="Type Address..."
									type="text"
									label={`Address, Block and PIN`}
									name="g_address"
									formControlName={formik.values.g_address}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={3}
									disabled
								/>
								{/* {formik.errors.g_address && formik.touched.g_address ? (
									<VError title={formik.errors.g_address} />
								) : null} */}
							</div>

							{/* <div>
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
							</div> */}

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
									disabled
								/>
								{/* {formik.errors.g_phone1 && formik.touched.g_phone1 ? (
									<VError title={formik.errors.g_phone1} />
								) : null} */}
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
									disabled
								/>
								{/* {formik.errors.g_phone2 && formik.touched.g_phone2 ? (
									<VError title={formik.errors.g_phone2} />
								) : null} */}
							</div>

							{/* <div>
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
							</div> */}

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
									disabled
								/>
								{/* {formik.errors.g_bank_name && formik.touched.g_bank_name ? (
									<VError title={formik.errors.g_bank_name} />
								) : null} */}
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
									disabled
								/>
								{/* {formik.errors.g_bank_branch && formik.touched.g_bank_branch ? (
									<VError title={formik.errors.g_bank_branch} />
								) : null} */}
							</div>

							{/* <div>
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
							</div> */}

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
									disabled
								/>
								{/* {formik.errors.g_acc1 && formik.touched.g_acc1 ? (
									<VError title={formik.errors.g_acc1} />
								) : null} */}
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
									disabled
								/>
								{/* {formik.errors.g_acc2 && formik.touched.g_acc2 ? (
									<VError title={formik.errors.g_acc2} />
								) : null} */}
							</div>
						</div>
						<Divider
							type="vertical"
							style={{
								height: 650,
							}}
						/>
						{params?.id > 0 && (
							<div className="w-1/2 gap-3 space-x-7">
								<div>
									<div className="text-blue-700 mb-2 font-bold">
										Members in this Group
									</div>

									{console.log("+++++++++++++++++++++++++++++", memberDetails)}

									{/* {groupData[0]?.memb_dt?.map((item, i) => (
										<Tag
											key={i}
											icon={<UserOutlined />}
											color={
												item?.approval_status === "U" ||
												(userDetails?.id == 3 && item?.approval_status === "S")
													? "geekblue"
													: "red"
											}
											className="text-lg cursor-pointer mb-5 rounded-3xl
									"
											onClick={
												userDetails?.id == 2
													? () =>
															navigate(`/homebm/editgrtform/${item?.form_no}`, {
																state: item,
															})
													: () =>
															navigate(`/homeco/editgrtform/${item?.form_no}`, {
																state: item,
															})
											}
										>
											{item?.client_name}
										</Tag>
									))} */}

									<Spin spinning={loading}>
										<div
											ref={containerRef}
											className={`relative overflow-x-auto shadow-md sm:rounded-lg`}
											onWheel={handleWheel}
											onMouseEnter={handleMouseEnter}
											onMouseLeave={handleMouseLeave}
										>
											<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
												<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
													<tr>
														<th scope="col" className="px-6 py-3 font-semibold">
															Member Name
														</th>
														<th scope="col" className="px-6 py-3 font-semibold">
															Loan ID
														</th>
														<th scope="col" className="px-6 py-3 font-semibold">
															Member Code
														</th>
														<th scope="col" className="px-6 py-3 font-semibold">
															Outstanding
														</th>
														<th scope="col" className="px-6 py-3 font-semibold">
															<span className="sr-only">Action</span>
														</th>
													</tr>
												</thead>
												<tbody>
													{groupData[0]?.memb_dt?.map((item, i) => (
														<tr
															key={i}
															className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
														>
															<th
																scope="row"
																className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
															>
																{item?.client_name}
															</th>
															<td className="px-6 py-4">{item?.loan_id}</td>
															<td className="px-6 py-4">{item?.member_code}</td>
															<td className="px-6 py-4">
																{item?.curr_outstanding}/-
															</td>
															<td className="px-6 py-4 text-right">
																<button
																	onClick={() => {
																		navigate(
																			`/homebm/memberloandetails/${item?.loan_id}`
																		)
																	}}
																	className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
																>
																	<EyeOutlined />
																</button>
															</td>
														</tr>
													))}
													<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
														<td className="px-6 py-4 font-medium" colSpan={3}>
															Total Outstanding
														</td>
														<td className="px-6 py-4 text-left" colSpan={2}>
															{formValues?.g_total_outstanding}/-
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</Spin>
								</div>
							</div>
						)}
					</div>
					{/* <BtnComp
						mode="A"
						// rejectBtn={true}
						// onReject={() => {
						// 	setVisibleModal(false)
						// }}
						onReset={formik.resetForm}
						// sendToText="Credit Manager"
						// onSendTo={() => console.log("dsaf")}
						// condition={fetchedFileDetails?.length > 0}
						// showSave
						param={params?.id}
					/> */}
				</form>
			</Spin>

			<DialogBox
				flag={4}
				onPress={() => setVisible(!visible)}
				visible={visible}
				onPressYes={() => {
					// editGroup()
					setVisible(!visible)
				}}
				onPressNo={() => setVisible(!visible)}
			/>
		</>
	)
}

export default ViewLoanForm