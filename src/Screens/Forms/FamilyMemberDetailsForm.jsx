import React, { useEffect, useState } from "react"
import "../LoanForm/LoanForm.css"
import { useParams } from "react-router"
import BtnComp from "../../Components/BtnComp"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Message } from "../../Components/Message"
import { url } from "../../Address/BaseUrl"
import { Spin, Button } from "antd"
import { LoadingOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons"
import { useLocation } from "react-router"
import DialogBox from "../../Components/DialogBox"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import { routePaths } from "../../Assets/Data/Routes"

function FamilyMemberDetailsForm({ memberDetails }) {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const { loanAppData } = location.state || {}
	const navigate = useNavigate()
	const userDetails = JSON.parse(localStorage.getItem("user_details"))

	const [remarks, setRemarks] = useState(() => "")
	const [educations, setEducations] = useState(() => [])
	const [visible, setVisible] = useState(() => false)
	const [visible2, setVisible2] = useState(() => false)

	console.log(params, "params")
	console.log(location, "location")
	console.log(memberDetails, "memberDetails")

	const [formArray, setFormArray] = useState([
		{
			sl_no: 0,
			name: "",
			relation: "",
			age: "",
			sex: "",
			education: "",
			studyingOrWorking: "",
			monthlyIncome: "",
		},
	])

	const handleFormAdd = () => {
		setFormArray((prev) => [
			...prev,
			{
				sl_no: 0,
				name: "",
				relation: "",
				age: "",
				sex: "",
				education: "",
				studyingOrWorking: "",
				monthlyIncome: "",
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

	const handleFetchEducations = async () => {
		await axios
			.get(`${url}/get_education`)
			.then((res) => {
				console.log("EDUCATIONSSSSSS====", res?.data)
				setEducations(res?.data)
			})
			.catch((err) => {
				console.log("Some error educations", err)
			})
	}

	useEffect(() => {
		handleFetchEducations()
	}, [])

	const fetchFamilyMemberDetails = async () => {
		setLoading(true)
		await axios
			.get(`${url}/admin/fetch_family_dt_web?form_no=${params?.id}`)
			.then((res) => {
				console.log("FAMILYYYY DATT", res?.data)
				if (res?.data?.suc === 1) {
					let familyDetailsArray = res?.data?.msg || []

					if (familyDetailsArray?.length > 0) {
						const transformedData = familyDetailsArray.map((member, index) => ({
							sl_no: member.sl_no || index + 1,
							name: member.name || "",
							relation: member.relation || "",
							age: member.age?.toString() || "",
							sex: member.sex || "",
							education: member.education || "",
							studyingOrWorking: member.studyingOrWorking || "",
							monthlyIncome: member.monthlyIncome?.toString() || "",
						}))
						setFormArray(transformedData)
					}
				}
			})
			.catch((err) => {
				console.log("FAMILYY ERRR", err)
			})
		setLoading(false)
	}

	useEffect(() => {
		fetchFamilyMemberDetails()
	}, [])

	const onSubmit = async (values) => {
		console.log("onsubmit called")
		console.log(values, "onsubmit vendor")
		setLoading(true)
		setVisible(true)
		setLoading(false)
	}

	const editFamilyMemberDetails = async () => {
		setLoading(true)
		const creds = {
			form_no: params?.id,
			branch_code: userDetails?.brn_code,
			created_by: userDetails?.emp_name,
			modified_by: userDetails?.emp_name,
			memberdtls: formArray,
		}
		await axios
			.post(`${url}/admin/edit_family_dtls_web`, creds)
			.then((res) => {
				console.log("FAMILYYYY DTTT", res?.data)
				Message("success", "Updated successfully.")
			})
			.catch((err) => {
				console.log("FAMILYTY ERRR", err)
				Message("error", "Some error occurred while submitting family details.")
			})
		setLoading(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	const handleRejectApplication = async () => {
		setLoading(true)
		const creds = {
			approval_status: "R",
			form_no: params?.id,
			remarks: remarks,
			member_code: memberDetails?.member_code,
			rejected_by: userDetails?.emp_name,
		}
		await axios
			.post(`${url}/admin/delete_member_mis`, creds)
			.then((res) => {
				Message("success", "Application rejected!")
				navigate(routePaths.MIS_ASSISTANT_HOME)
			})
			.catch((err) => {
				Message("error", "Some error occurred while rejecting application.")
			})
		setLoading(false)
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
											name={`${item?.name}_${i}`}
											formControlName={item?.name}
											handleChange={(txt) =>
												handleInputChange(i, "name", txt.target.value)
											}
											mode={1}
										/>
									</div>
									<div>
										<TDInputTemplateBr
											placeholder="Relation"
											type="text"
											label="Relation"
											name={`${item?.relation}_${i}`}
											formControlName={item?.relation}
											handleChange={(txt) =>
												handleInputChange(i, "relation", txt.target.value)
											}
											mode={1}
										/>
									</div>
									<div>
										<TDInputTemplateBr
											placeholder="Age"
											type="number"
											label="Age"
											name={`${item?.age}_${i}`}
											formControlName={item?.age}
											handleChange={(txt) =>
												handleInputChange(i, "age", txt.target.value)
											}
											mode={1}
										/>
									</div>
									<div>
										<TDInputTemplateBr
											placeholder="Choose Gender"
											type="text"
											label="Choose Gender"
											name={`${item?.sex}_${i}`}
											formControlName={item?.sex}
											handleChange={(txt) =>
												handleInputChange(i, "sex", txt.target.value)
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
											name={`${item?.education}_${i}`}
											formControlName={item?.education}
											handleChange={(txt) =>
												handleInputChange(i, "education", txt.target.value)
											}
											data={educations?.map((edu) => ({
												code: edu?.id,
												name: edu?.name,
											}))}
											mode={2}
										/>
									</div>
									<div>
										<TDInputTemplateBr
											placeholder="Study/Work"
											type="text"
											label="Study/Work"
											name={`${item?.studyingOrWorking}_${i}`}
											formControlName={item?.studyingOrWorking}
											handleChange={(txt) =>
												handleInputChange(
													i,
													"studyingOrWorking",
													txt.target.value
												)
											}
											data={[
												{
													code: "Studying",
													name: "STUDYING",
												},
												{
													code: "Working",
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
											name={`${item?.monthlyIncome}_${i}`}
											formControlName={item?.monthlyIncome}
											handleChange={(txt) =>
												handleInputChange(i, "monthlyIncome", txt.target.value)
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

						<div className="mt-10">
							<TDInputTemplateBr
								placeholder="Type Remarks..."
								type="text"
								label={`Remarks`}
								name="remarks"
								formControlName={remarks}
								handleChange={(e) => setRemarks(e.target.value)}
								mode={3}
							/>
						</div>

						<div className="mt-10">
							<BtnComp
								mode="B"
								onPressSubmit={() => {
									setVisible(!visible)
								}}
								onReset={() => {
									setFormArray([
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
								}}
								showReject={true}
								onRejectApplication={() => setVisible2(true)}
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

			<DialogBox
				flag={4}
				onPress={() => setVisible2(!visible2)}
				visible={visible2}
				onPressYes={() => {
					if (!remarks) {
						Message("error", "Please write remarks!")
						setVisible2(!visible2)
						return
					}
					setVisible2(!visible2)
					handleRejectApplication()
				}}
				onPressNo={() => setVisible2(!visible2)}
			/>

			<DialogBox
				flag={4}
				onPress={() => setVisible(!visible)}
				visible={visible}
				onPressYes={() => {
					editFamilyMemberDetails()
					setVisible(!visible)
				}}
				onPressNo={() => setVisible(!visible)}
			/>
		</>
	)
}

export default FamilyMemberDetailsForm
