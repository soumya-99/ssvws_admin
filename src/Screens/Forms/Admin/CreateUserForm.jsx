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

function CreateUserForm() {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const [branches, setBranches] = useState(() => [])
	const location = useLocation()
	const userMasterDetails = location.state || {}

	const navigate = useNavigate()
	const userDetails = JSON.parse(localStorage.getItem("user_details"))

	const [visible, setVisible] = useState(() => false)

	// const formattedDob = formatDateToYYYYMMDD(memberDetails?.dob)

	console.log(params, "params")
	console.log(location, "location")
	// console.log(memberDetails, "memberDetails")

	const [userTypes, setUserTypes] = useState(() => [])
	const [masterUserData, setMasterUserData] = useState({
		emp_id: "", // onBlur search to fetch
		emp_name: "",
		branch: "", // dropdown - prefetched id
		user_type: "", // dropdown - CO, BM, MIS Asst., Admin
		active_flag: "",
		remarks: "",
	})

	const handleChangeForm = (e) => {
		const { name, value } = e.target
		setMasterUserData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleFetchBranches = async () => {
		setLoading(true)
		await axios
			.get(`${url}/fetch_all_branch_dt`)
			.then((res) => {
				console.log("QQQQQQQQQQQQQQQQ", res?.data)
				setBranches(res?.data?.msg)
			})
			.catch((err) => {
				console.log("?????????????????????", err)
			})

		setLoading(false)
	}

	const handleFetchUserTypes = async () => {
		await axios
			.get(`${url}/get_user_type`)
			.then((res) => {
				setUserTypes(res?.data?.msg)
			})
			.catch((err) => {
				console.log("Errrr", err)
			})
	}

	useEffect(() => {
		handleFetchBranches()
		handleFetchUserTypes()
	}, [])

	// const fetchParticularEmployeeDetails = async () => {
	// 	const creds = {
	// 		branch_code: userMasterDetails?.branch_id,
	// 		emp_id: params?.id,
	// 	}
	// 	await axios
	// 		.post(`${url}/fetch_emp`, creds)
	// 		.then((res) => {
	// 			console.log("+-----------------+", res?.data)
	// 			// setMasterEmployeeData()

	// 			setMasterUserData({
	// 				emp_id: res?.data?.msg[0]?.active_flag || "", // onBlur search to fetch
	// 				emp_name: res?.data?.msg[0]?.emp_name || "",
	// 				branch: res?.data?.msg[0]?.branch || "", // dropdown - prefetched id
	// 				user_type: res?.data?.msg[0]?.user_type || "", // dropdown - CO, BM, MIS Asst., Admin
	// 			})
	// 		})
	// 		.catch((err) => {
	// 			console.log("=======", err)
	// 		})
	// }

	// useEffect(() => {
	// 	if (params?.id > 0) {
	// 		fetchParticularEmployeeDetails()
	// 	}
	// }, [])

	// useEffect(() => {
	// 	setMasterUserData({
	// 		emp_id: userMasterDetails?.emp_id || "",
	// 		emp_name: userMasterDetails?.emp_name || "",
	// 		branch: userMasterDetails?.branch || "",
	// 		user_type: userMasterDetails?.user_type || "",
	// 		remarks: userMasterDetails?.remarks || "",
	// 	})
	// }, [])

	const findEmployeeById = async () => {
		if (!masterUserData.emp_id) return
		setLoading(true)
		const creds = {
			emp_id: masterUserData.emp_id,
		}

		console.log("FIND ===", creds)
		await axios
			.post(`${url}/fetch_empl_dtls`, creds)
			.then((res) => {
				if (res?.data?.msg?.length === 0) {
					Message("warning", "No employee found!")
					setMasterUserData((prev) => ({
						...prev,
						emp_id: "",
						emp_name: "",
						branch: "", // dropdown - prefetched id
						user_type: "", // dropdown - CO, BM, MIS Asst., Admin
					}))
					return
				}

				if ("user_type" in res?.data?.msg[0]) {
					Message(
						"warning",
						res?.data?.details +
							" Name: " +
							res?.data?.msg[0]?.emp_name +
							" Branch: " +
							res?.data?.msg[0]?.brn_code
					)
					onReset()
					return
				}

				setMasterUserData((prev) => ({
					...prev,
					emp_name: res?.data?.msg[0]?.emp_name,
					branch: res?.data?.msg[0]?.branch_id,
				}))
			})
			.catch((err) => {
				Message("error", "Some error while fetching user details.")
				console.log("Errr", err)
			})
		setLoading(false)
	}

	const handleSaveForm = async () => {
		setLoading(true)
		const credsForSave = {
			emp_id: masterUserData.emp_id || "",
			brn_code: masterUserData.branch || 0,
			user_type: masterUserData.user_type || "Y",
			created_by: userDetails?.emp_id || "",
		}

		// const credsForUpdate = {
		// 	branch_code: masterUserData.branch_name || 0,
		// 	emp_name: masterUserData.emp_name || "",
		// 	remarks: masterUserData.remarks || "",
		// 	// created_by: localStorage.getItem("user_id") || "",

		// 	modified_by: userDetails?.emp_id || "",
		// 	emp_id: +params?.id || "",
		// }

		// {
		//     "emp_id" : "",
		//     "brn_code" : "",
		//     "user_type" : "",
		//     "created_by":""
		//     }

		// console.log(
		// 	"***************#################",
		// 	params?.id ? credsForUpdate : credsForSave
		// )
		await axios
			.post(`${url}/save_user_dt`, credsForSave)
			.then((res) => {
				console.log("User details saved.", res?.data)
				Message("success", "User details saved.")
				// navigate(-1)
			})
			.catch((err) => {
				Message("error", "Some error occurred.")
				console.log("ERR", err)
			})
		setLoading(false)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		setVisible(true)
	}

	const onReset = () => {
		setMasterUserData({
			emp_id: "", // onBlur search to fetch
			emp_name: "",
			branch: "", // dropdown - prefetched id
			user_type: "", // dropdown - CO, BM, MIS Asst., Admin
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
							<div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
								{params?.id && +params?.id > 0 && (
									<div>
										<TDInputTemplateBr
											placeholder="Active Flag..."
											type="text"
											label="Active Flag"
											name="active_flag"
											formControlName={masterUserData.active_flag}
											handleChange={handleChangeForm}
											mode={2}
											data={[
												{ code: "Y", name: "Active" },
												{ code: "N", name: "Inactive" },
											]}
										/>
									</div>
								)}
								<div>
									<TDInputTemplateBr
										placeholder="Employee ID..."
										type="text"
										label="Employee ID"
										name="emp_id"
										formControlName={masterUserData.emp_id}
										handleChange={handleChangeForm}
										handleBlur={findEmployeeById}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Employee Name..."
										type="text"
										label="Employee Name"
										name="emp_name"
										formControlName={masterUserData.emp_name}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Branch..."
										type="text"
										label="Branch"
										name="branch"
										formControlName={masterUserData.branch}
										handleChange={handleChangeForm}
										mode={2}
										data={branches?.map((item, i) => ({
											code: item?.branch_code,
											name: item?.branch_name,
										}))}
										disabled={params?.id > 0}
									/>
								</div>
								<div className={`${params?.id ? "" : "sm:col-span-3"}`}>
									<TDInputTemplateBr
										placeholder="User Type..."
										type="text"
										label="User Type"
										name="user_type"
										formControlName={masterUserData.user_type}
										handleChange={handleChangeForm}
										mode={2}
										// data={[
										// 	{ code: "1", name: "Credit Officer" },
										// 	{ code: "2", name: "Branch Manager" },
										// 	{ code: "3", name: "MIS Assistant" },
										// 	{ code: "4", name: "Administrator" },
										// ]}
										data={userTypes?.map((item, i) => ({
											code: item?.type_code,
											name: item?.user_type,
										}))}
									/>
								</div>

								{params?.id && (
									<>
										<div className="sm:col-span-2">
											<TDInputTemplateBr
												placeholder="Active Flag..."
												type="text"
												label="Active Flag"
												name="active_flag"
												formControlName={masterUserData.active_flag}
												handleChange={handleChangeForm}
												mode={2}
												data={[
													{ code: "Y", name: "Active" },
													{ code: "N", name: "Inactive" },
												]}
											/>
										</div>
										<div className="sm:col-span-3">
											<TDInputTemplateBr
												placeholder="Remarks..."
												type="text"
												label="Remarks"
												name="remarks"
												formControlName={masterUserData.remarks}
												handleChange={handleChangeForm}
												mode={3}
											/>
										</div>
									</>
								)}
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

export default CreateUserForm
