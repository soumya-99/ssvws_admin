import React, { useEffect, useState } from "react"
import "../LoanForm/LoanForm.css"
import { useParams } from "react-router"
import BtnComp from "../../Components/BtnComp"
import VError from "../../Components/VError"
import { useNavigate } from "react-router-dom"
// import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Message } from "../../Components/Message"
import { url } from "../../Address/BaseUrl"
import { Badge, Spin, Card } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useLocation } from "react-router"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import { formatDateToYYYYMMDD } from "../../Utils/formateDate"
import DialogBox from "../../Components/DialogBox"
// import { disableInputArray } from "./disableInputArray"
import { disableCondition } from "./disableCondition"
import { getOrdinalSuffix } from "../../Utils/ordinalSuffix"

function MemberLoanDetailsForm() {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const personalDetails = {}
	const loanType = "R"

	const navigate = useNavigate()
	const userDetails = JSON.parse(localStorage.getItem("user_details"))

	const [visible, setVisible] = useState(() => false)
	const [visible2, setVisible2] = useState(() => false)
	const [visible3, setVisible3] = useState(() => false)

	const [disburseOrNot, setDisburseOrNot] = useState(() => false)
	const [maxDisburseAmountForAScheme, setMaxDisburseAmountForAScheme] =
		useState(() => "")

	const [purposeOfLoan, setPurposeOfLoan] = useState(() => [])
	const [subPurposeOfLoan, setSubPurposeOfLoan] = useState(() => [])

	const [schemes, setSchemes] = useState(() => [])
	const [funds, setFunds] = useState(() => [])
	const [tnxTypes, setTnxTypes] = useState(() => [])
	const [tnxModes, setTnxModes] = useState(() => [])
	const [banks, setBanks] = useState(() => [])

	const [fetchedLoanData, setFetchedLoanData] = useState(() => Object)
	const [fetchedTnxData, setFetchedTnxData] = useState(() => Object)

	// const formattedDob = formatDateToYYYYMMDD(memberDetails?.dob)

	console.log(params, "params")
	console.log(location, "location")
	// console.log(memberDetails, "memberDetails")
	console.log("U/A", loanType)

	const [memberLoanDetailsData, setMemberLoanDetailsData] = useState({
		loanId: "",
		memberName: "",
		memberCode: "",
		groupName: "",
		purpose: "",
		subPurpose: "",
		disbursementDate: "",
		schemeName: "",
		fundName: "",
		outstanding: "",
		period: "",
		periodMode: "",
		principalAmount: "",
		principalEMI: "",
		interestAmount: "",
		interestEMI: "",
		totalEMI: "",
	})

	const handleChangeMemberLoanDetails = (e) => {
		const { name, value } = e.target
		setMemberLoanDetailsData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const [tnxDetails, setTnxDetails] = useState([])

	const handleFetchMemberLoanDetails = async () => {
		setLoading(true)
		const creds = {
			loan_id: params?.id,
		}

		await axios
			.post(`${url}/admin/view_loan_dtls`, creds)
			.then((res) => {
				console.log("PPPPPPP::::::", res?.data)

				setMemberLoanDetailsData({
					loanId: res?.data?.msg[0]?.loan_id || "",
					memberName: res?.data?.msg[0]?.client_name || "",
					memberCode: res?.data?.msg[0]?.member_code || "",
					groupName: res?.data?.msg[0]?.group_name || "",
					purpose: res?.data?.msg[0]?.purpose_id || "",
					subPurpose: res?.data?.msg[0]?.sub_purp_name || "",
					disbursementDate: res?.data?.msg[0]?.disb_dt || "",
					schemeName: res?.data?.msg[0]?.scheme_name || "",
					fundName: res?.data?.msg[0]?.fund_name || "",
					outstanding: res?.data?.msg[0]?.outstanding || "",
					period: res?.data?.msg[0]?.period || "",
					periodMode: res?.data?.msg[0]?.period_mode || "",
					principalAmount: res?.data?.msg[0]?.prn_disb_amt || "",
					principalEMI: res?.data?.msg[0]?.prn_emi || "",
					interestAmount: res?.data?.msg[0]?.intt_amt || "",
					interestEMI: res?.data?.msg[0]?.intt_emi || "",
					totalEMI: res?.data?.msg[0]?.tot_emi || "",
				})
				setTnxDetails(res?.data?.msg[0]?.trans_dtls)
			})
			.catch((err) => {
				console.log("&&& ERR", err)
			})
		setLoading(false)
	}

	useEffect(() => {
		handleFetchMemberLoanDetails()
	}, [])

	//////////////////////////////////////////////////
	//////////////////////////////////////////////////

	const onSubmit = (e) => {
		e.preventDefault()

		setVisible(true)
	}

	return (
		<>
			{/* {disburseOrNot && (
				<Badge.Ribbon
					className="bg-slate-500 absolute top-10 z-10"
					text={<div className="font-bold">Recovery Initiated</div>}
					style={{
						fontSize: 17,
						width: 200,
						height: 28,
						justifyContent: "start",
						alignItems: "center",
						textAlign: "center",
					}}
				></Badge.Ribbon>
			)} */}
			{/* <div className="ml-14 mt-5 flex flex-col justify-start align-middle items-start gap-2">
				<div className="text-sm text-wrap w-96 italic text-blue-800">
					CO: {recoveryDetailsData?.b_coName || "Nil"}, AT:{" "}
					{new Date(recoveryDetailsData?.b_coCreatedAt || "Nil").toLocaleString(
						"en-GB"
					)}
				</div>
				<div className="text-sm text-wrap w-96 italic text-blue-800">
					CO Location: {recoveryDetailsData?.b_coLocation || "Nil"}
				</div>
			</div> */}
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>
				<form onSubmit={onSubmit}>
					<div>
						{/* ///////////////////////// */}

						<div>
							<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
								<div className="text-xl mb-2 mt-5 text-lime-800 font-semibold underline">
									1. Full Loan Details
								</div>
							</div>
							<div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Loan ID..."
										type="text"
										label="Loan ID"
										name="loanId"
										formControlName={memberLoanDetailsData.loanId}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Member Name..."
										type="text"
										label="Member Name"
										name="memberName"
										formControlName={memberLoanDetailsData.memberName}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Member Code..."
										type="text"
										label="Member Code"
										name="memberCode"
										formControlName={memberLoanDetailsData.memberCode}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Group Name..."
										type="text"
										label="Group Name"
										name="groupName"
										formControlName={memberLoanDetailsData.groupName}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Purpose..."
										type="text"
										label="Purpose"
										name="purpose"
										formControlName={memberLoanDetailsData.purpose}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Sub Purpose..."
										type="text"
										label="Sub Purpose"
										name="subPurpose"
										formControlName={memberLoanDetailsData.subPurpose}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Disbursement Date..."
										type="text"
										label="Disbursement Date"
										name="disbursementDate"
										formControlName={memberLoanDetailsData.disbursementDate}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Scheme Name..."
										type="text"
										label="Scheme Name"
										name="schemeName"
										formControlName={memberLoanDetailsData.schemeName}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Fund Name..."
										type="text"
										label="Fund Name"
										name="fundName"
										formControlName={memberLoanDetailsData.fundName}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Outstanding..."
										type="text"
										label="Outstanding"
										name="outstanding"
										formControlName={memberLoanDetailsData.outstanding}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Period..."
										type="text"
										label="Period"
										name="period"
										formControlName={memberLoanDetailsData.period}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Period Mode..."
										type="text"
										label="Period Mode"
										name="periodMode"
										formControlName={memberLoanDetailsData.periodMode}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Principal Amount..."
										type="text"
										label="Principal Amount"
										name="principalAmount"
										formControlName={memberLoanDetailsData.principalAmount}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Principal EMI..."
										type="text"
										label="Principal EMI"
										name="principalEMI"
										formControlName={memberLoanDetailsData.principalEMI}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Interest Amount..."
										type="text"
										label="Interest Amount"
										name="interestAmount"
										formControlName={memberLoanDetailsData.interestAmount}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Interest EMI..."
										type="text"
										label="Interest EMI"
										name="interestEMI"
										formControlName={memberLoanDetailsData.interestEMI}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Total EMI..."
										type="text"
										label="Total EMI"
										name="totalEMI"
										formControlName={memberLoanDetailsData.totalEMI}
										handleChange={handleChangeMemberLoanDetails}
										mode={1}
										disabled
									/>
								</div>
							</div>
						</div>

						{/* ///////////////////////// */}

						<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
							<div className="text-xl mb-2 mt-5 text-lime-800 font-semibold underline">
								2. Transaction Details
							</div>
						</div>

						<div>
							<Spin spinning={loading}>
								<div
									className={`relative overflow-x-auto shadow-md sm:rounded-lg`}
								>
									<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
										<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
											<tr>
												<th scope="col" className="px-6 py-3 font-semibold">
													Sl. No.
												</th>
												<th scope="col" className="px-6 py-3 font-semibold">
													Date
												</th>
												<th scope="col" className="px-6 py-3 font-semibold">
													Debit
												</th>
												<th scope="col" className="px-6 py-3 font-semibold">
													Credit
												</th>
												<th scope="col" className="px-6 py-3 font-semibold">
													Balance
												</th>
												<th scope="col" className="px-6 py-3 font-semibold">
													Tnx. ID.
												</th>
												<th scope="col" className="px-6 py-3 font-semibold">
													Chq. ID.
												</th>
												<th scope="col" className="px-6 py-3 font-semibold">
													Chq. Date
												</th>
												<th scope="col" className="px-6 py-3 font-semibold">
													Status
												</th>
												{/* <th scope="col" className="px-6 py-3 font-semibold">
													<span className="sr-only">Action</span>
												</th> */}
											</tr>
										</thead>
										<tbody>
											{tnxDetails?.map((item, i) => (
												<tr
													key={i}
													className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
												>
													<th
														scope="row"
														className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
													>
														{i + 1}
													</th>
													<td className="px-6 py-4">
														{new Date(item?.payment_date).toLocaleDateString(
															"en-GB"
														) || ""}
													</td>
													<td className="px-6 py-4">{item?.debit}/-</td>
													<td className="px-6 py-4">{item?.credit}/-</td>
													<td className="px-6 py-4">{item?.balance}/-</td>
													<td className="px-6 py-4">{item?.payment_id}</td>
													{/* <td className="px-6 py-4">
														{new Date(item?.payment_date).toLocaleDateString(
															"en-GB"
														) || ""}
													</td> */}
													<td className="px-6 py-4">{item?.cheque_id || 0}</td>
													<td className="px-6 py-4">
														{new Date(item?.chq_dt).toLocaleDateString(
															"en-GB"
														) || ""}
													</td>
													<td className="px-6 py-4">
														{item?.tr_type === "D"
															? "Disbursement"
															: item?.tr_type === "R"
															? "Recovery"
															: "Error"}
													</td>
													{/* <td className="px-6 py-4 text-right">
														<button
															onClick={() => {
																navigate(
																	`/homebm/memberloandetails/${item?.loan_id}`
																)
															}}
															className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
														>
															Edit
														</button>
													</td> */}
												</tr>
											))}
											{/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
												<td className="px-6 py-4 font-medium" colSpan={3}>
													Total Outstanding
												</td>
												<td className="px-6 py-4 text-left" colSpan={2}>
													564654
												</td>
											</tr> */}
										</tbody>
									</table>
								</div>
							</Spin>
						</div>

						{/* ////////////////////////////////////////////////////// */}
					</div>
				</form>
			</Spin>

			{/* For Approve */}
			<DialogBox
				flag={4}
				onPress={() => setVisible(!visible)}
				visible={visible}
				onPressYes={() => {
					// recoveryLoanApprove()
					setVisible(!visible)
				}}
				onPressNo={() => setVisible(!visible)}
			/>

			{/* For Reject */}
			<DialogBox
				flag={4}
				onPress={() => setVisible2(!visible2)}
				visible={visible2}
				onPressYes={() => {
					// handleApproveLoanDisbursement()
					// recoveryLoanReject()
					setVisible2(!visible2)
				}}
				onPressNo={() => setVisible2(!visible2)}
			/>

			{/* <DialogBox
				flag={4}
				onPress={() => setVisible3(!visible3)}
				visible={visible3}
				onPressYes={() => {
					// handleRejectLoanDisbursement()
					setVisible3(!visible3)
				}}
				onPressNo={() => setVisible3(!visible3)}
			/> */}
		</>
	)
}

export default MemberLoanDetailsForm
