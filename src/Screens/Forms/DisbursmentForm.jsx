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
import { Checkbox, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useLocation } from "react-router"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import { formatDateToYYYYMMDD } from "../../Utils/formateDate"
import DialogBox from "../../Components/DialogBox"
// import { disableInputArray } from "./disableInputArray"
import { disableCondition } from "./disableCondition"

function DisbursmentForm() {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const personalDetails = location.state || {}

	const navigate = useNavigate()
	const userDetails = JSON.parse(localStorage.getItem("user_details"))

	const [visible, setVisible] = useState(() => false)

	const [maxDisburseAmountForAScheme, setMaxDisburseAmountForAScheme] =
		useState(() => "")

	const [schemes, setSchemes] = useState(() => [])
	const [funds, setFunds] = useState(() => [])
	const [tnxTypes, setTnxTypes] = useState(() => [])
	const [tnxModes, setTnxModes] = useState(() => [])

	// const formattedDob = formatDateToYYYYMMDD(memberDetails?.dob)

	console.log(params, "params")
	console.log(location, "location")
	// console.log(memberDetails, "memberDetails")

	const [personalDetailsData, setPersonalDetailsData] = useState({
		b_memCode: "",
		b_clientName: "",
		b_groupName: "",
		b_formNo: "",
		b_grtApproveDate: "",
		b_branch: "",
		b_purpose: "",
		b_subPurpose: "",
		b_applicationDate: "",
		b_appliedAmt: "",
	})

	const handleChangePersonalDetails = (e) => {
		const { name, value } = e.target
		setPersonalDetailsData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const [disbursementDetailsData, setDisbursementDetailsData] = useState({
		b_scheme: "",
		b_fund: "",
		b_period: "",
		b_roi: "",
		b_mode: "",
		b_disburseAmt: "",
		b_bankCharges: "",
		b_processingCharges: "",
	})

	const handleChangeDisburseDetails = (e) => {
		const { name, value } = e.target
		setDisbursementDetailsData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const [transactionDetailsData, setTransactionDetailsData] = useState({
		b_tnxDate: "",
		b_bankName: "",
		b_chequeOrRefNo: "",
		b_chequeOrRefDate: "",
		b_tnxType: "D",
		b_tnxMode: "",
		b_remarks: "",
	})

	const handleChangeTnxDetailsDetails = (e) => {
		const { name, value } = e.target
		setTransactionDetailsData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	useEffect(() => {
		setPersonalDetailsData({
			b_memCode: personalDetails?.member_code || "",
			b_clientName: personalDetails?.client_name || "",
			b_groupName: personalDetails?.group_name || "",
			b_formNo: personalDetails?.form_no || "",
			b_grtApproveDate: personalDetails?.grt_approve_date || "",
			b_branch: personalDetails?.branch_name || "",
			b_purpose: personalDetails?.purpose_id || "",
			b_subPurpose: personalDetails?.sub_purp_name || "",
			b_applicationDate: personalDetails?.application_date || "",
			b_appliedAmt: personalDetails?.applied_amt || "",
		})

		console.log("?????????????????????", personalDetails)
	}, [])

	const getSchemes = async () => {
		setLoading(true)
		await axios
			.get(`${url}/get_scheme`)
			.then((res) => {
				console.log("==============", res?.data)
				setSchemes(res?.data?.msg)
			})
			.catch((err) => {
				console.log("err", err)
			})
		setLoading(false)
	}

	const getFunds = async () => {
		setLoading(true)
		await axios
			.get(`${url}/get_fund`)
			.then((res) => {
				console.log("--------------", res?.data)
				setFunds(res?.data?.msg)
			})
			.catch((err) => {
				console.log("err", err)
			})
		setLoading(false)
	}

	const getTnxTypes = async () => {
		await axios.get(`${url}/get_tr_type`).then((res) => {
			console.log("777 --- 777 --- 777", res?.data)
			setTnxTypes(res?.data)
		})
	}

	const getTnxModes = async () => {
		await axios.get(`${url}/get_tr_mode`).then((res) => {
			console.log("888 --- 888 --- 888", res?.data)
			setTnxModes(res?.data)
		})
	}

	useEffect(() => {
		getSchemes()
		getFunds()
		getTnxTypes()
		getTnxModes()
	}, [])

	const getParticularScheme = async (schemeId) => {
		setLoading(true)
		const creds = {
			scheme_id: schemeId,
		}
		await axios
			.post(`${url}/admin/scheme_dtls`, creds)
			.then((res) => {
				console.log("PPP", res?.data)
				setDisbursementDetailsData({
					b_scheme: disbursementDetailsData.b_scheme,
					b_fund: disbursementDetailsData.b_fund,
					b_period: res?.data?.msg[0]?.max_period,
					b_roi: res?.data?.msg[0]?.roi,
					b_mode: res?.data?.msg[0]?.payment_mode,
					b_disburseAmt: "",
					b_bankCharges: "",
					b_processingCharges: "",
				})
				setMaxDisburseAmountForAScheme(res?.data?.msg[0]?.max_amt)
			})
			.catch((err) => {
				console.log("errrr", err)
			})
		setLoading(false)
	}

	useEffect(() => {
		getParticularScheme(disbursementDetailsData.b_scheme)
	}, [disbursementDetailsData.b_scheme])

	//////////////////////////////////////////////////
	//////////////////////////////////////////////////

	const onSubmit = (e) => {
		e.preventDefault()

		setVisible(true)
	}

	const onReset = async () => {
		console.log("onreset called")
		setDisbursementDetailsData({
			b_scheme: "",
			b_fund: "",
			b_period: "",
			b_roi: "",
			b_mode: "",
			b_disburseAmt: "",
			b_bankCharges: "",
			b_processingCharges: "",
		})
		setTransactionDetailsData({
			b_tnxDate: "",
			b_bankName: "",
			b_chequeOrRefNo: "",
			b_chequeOrRefDate: "",
			b_tnxType: "",
			b_tnxMode: "",
			b_remarks: "",
		})
	}

	const handleSubmitDisbursementForm = async () => {
		setLoading(true)
		const creds = {
			branch_code: personalDetails?.branch_code || "",
			group_code: personalDetails?.prov_grp_code || "",
			member_code: personalDetails?.member_code || "",
			grt_form_no: personalDetails?.form_no || "",
			purpose: personalDetails?.loan_purpose || "",
			sub_purpose: personalDetails?.sub_pupose || "",
			applied_amt: personalDetails?.applied_amt || "",
			scheme_id: disbursementDetailsData?.b_scheme || "",
			fund_id: disbursementDetailsData?.b_fund || "",
			period: disbursementDetailsData?.b_period || "",
			curr_roi: disbursementDetailsData?.b_roi || "",
			od_roi: "0",
			prn_disb_amt: disbursementDetailsData?.b_disburseAmt || "",
			old_prn_amt: "0",
			od_intt_amt: "0",
			period_mode: disbursementDetailsData?.b_mode || "",
			created_by: userDetails?.emp_id || "",
			loan_code: params?.id || "",
			particulars: transactionDetailsData?.b_remarks || "",
			bank_charge: disbursementDetailsData?.b_bankCharges || "",
			proc_charge: disbursementDetailsData?.b_processingCharges || "",
			tr_type: transactionDetailsData?.b_tnxType || "",
			tr_mode: transactionDetailsData?.b_tnxMode || "",
			cheque_id: transactionDetailsData?.b_chequeOrRefNo || "",
			chq_dt: transactionDetailsData?.b_chequeOrRefDate || "",
			// deposit_by: "",
			// bill_no: "",
			// trn_lat: "",
			// trn_long: "",
		}
		await axios
			.post(`${url}/admin/save_loan_transaction`, creds)
			.then((res) => {
				console.log("Disbursement initiated successfully", res?.data)
				Message("success", "Submitted successfully.")
				navigate(-1)
			})
			.catch((err) => {
				Message(
					"error",
					"Some error occurred while submitting disbursement form!"
				)
				console.log("DDEEERRR", err)
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
				<form onSubmit={onSubmit}>
					<div>
						<div>
							<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
								<div className="text-xl mb-2 text-lime-800 font-semibold underline">
									1. Personal Details
								</div>
							</div>
							<div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
								<div className="sm:col-span-4 bg-slate-200 border-stone-200 text-lime-900 p-5 rounded-2xl">
									<TDInputTemplateBr
										placeholder="Group name..."
										type="text"
										label="Group Name"
										name="b_groupName"
										formControlName={personalDetailsData?.b_groupName}
										handleChange={handleChangePersonalDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Member Code"
										type="text"
										label="Member Code"
										name="b_memCode"
										formControlName={personalDetailsData?.b_memCode}
										handleChange={handleChangePersonalDetails}
										mode={1}
										disabled
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Type member name..."
										type="text"
										label="Member Name"
										name="b_clientName"
										formControlName={personalDetailsData?.b_clientName}
										handleChange={handleChangePersonalDetails}
										mode={1}
										disabled
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Form Number"
										type="text"
										label="Form Number"
										name="b_formNo"
										formControlName={personalDetailsData?.b_formNo}
										mode={1}
										disabled
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="GRT Approve date..."
										type="text"
										label="GRT Approve Date"
										name="b_grtApproveDate"
										formControlName={personalDetailsData?.b_grtApproveDate}
										handleChange={handleChangePersonalDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Branch..."
										type="text"
										label="Branch"
										name="b_branch"
										formControlName={personalDetailsData?.b_branch}
										handleChange={handleChangePersonalDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Purpose..."
										type="text"
										label="Purpose"
										name="b_purpose"
										formControlName={personalDetailsData?.b_purpose}
										handleChange={handleChangePersonalDetails}
										mode={1}
										disabled
									/>
								</div>
								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Sub Purpose..."
										type="text"
										label="Sub Purpose"
										name="b_subPurpose"
										formControlName={personalDetailsData?.b_subPurpose}
										handleChange={handleChangePersonalDetails}
										mode={1}
										disabled
									/>
								</div>
								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Application Date..."
										type="text"
										label="Application Date"
										name="b_applicationDate"
										formControlName={personalDetailsData?.b_applicationDate}
										handleChange={handleChangePersonalDetails}
										mode={1}
										disabled
									/>
								</div>
								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Applied Amount..."
										type="text"
										label="Applied Amount"
										name="b_appliedAmt"
										formControlName={personalDetailsData?.b_appliedAmt}
										handleChange={handleChangePersonalDetails}
										mode={1}
										disabled
									/>
								</div>
							</div>
						</div>

						{/* ///////////////////////// */}

						<div>
							<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
								<div className="text-xl mb-2 mt-5 text-lime-800 font-semibold underline">
									2. Disbursement Details
								</div>
							</div>
							<div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
								<div>
									<TDInputTemplateBr
										placeholder="Select Scheme..."
										type="text"
										label="Scheme"
										name="b_scheme"
										formControlName={disbursementDetailsData.b_scheme}
										handleChange={handleChangeDisburseDetails}
										data={schemes?.map((item, _) => ({
											code: item?.scheme_id,
											name: item?.scheme_name,
										}))}
										// data={[
										// 	{ code: "S1", name: "Scheme 1" },
										// 	{ code: "S1", name: "Scheme 2" },
										// 	{ code: "S3", name: "Scheme 3" },
										// ]}
										mode={2}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Select Fund..."
										type="text"
										label="Fund"
										name="b_fund"
										formControlName={disbursementDetailsData.b_fund}
										handleChange={handleChangeDisburseDetails}
										data={funds?.map((item, _) => ({
											code: item?.fund_id,
											name: item?.fund_name,
										}))}
										// data={[
										// 	{ code: "F1", name: "Fund 1" },
										// 	{ code: "F2", name: "Fund 2" },
										// 	{ code: "F3", name: "Fund 3" },
										// ]}
										mode={2}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Period..."
										type="text"
										label="Period"
										name="b_period"
										formControlName={disbursementDetailsData.b_period}
										handleChange={handleChangeDisburseDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="R.O.I..."
										type="text"
										label="Rate of Interest"
										name="b_roi"
										formControlName={disbursementDetailsData.b_roi}
										handleChange={handleChangeDisburseDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Mode..."
										type="text"
										label="Mode"
										name="b_mode"
										formControlName={disbursementDetailsData.b_mode}
										handleChange={handleChangeDisburseDetails}
										mode={1}
										disabled
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Disburse Amount..."
										type="number"
										label={`Disburse Amount`}
										name="b_disburseAmt"
										formControlName={disbursementDetailsData.b_disburseAmt}
										handleChange={handleChangeDisburseDetails}
										mode={1}
										disabled={!disbursementDetailsData?.b_scheme}
									/>
									{+disbursementDetailsData.b_disburseAmt >
									+maxDisburseAmountForAScheme ? (
										<VError
											title={`Disburse amount must be less than ${maxDisburseAmountForAScheme}`}
										/>
									) : null}
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Bank charges..."
										type="number"
										label="Bank Charges"
										name="b_bankCharges"
										formControlName={disbursementDetailsData.b_bankCharges}
										handleChange={handleChangeDisburseDetails}
										mode={1}
										disabled={!disbursementDetailsData?.b_scheme}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Processing charges..."
										type="number"
										label="Processing Charges"
										name="b_processingCharges"
										formControlName={
											disbursementDetailsData.b_processingCharges
										}
										handleChange={handleChangeDisburseDetails}
										mode={1}
										disabled={!disbursementDetailsData?.b_scheme}
									/>
								</div>
							</div>
						</div>

						{/* ///////////////////////// */}

						<div>
							<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
								<div className="text-xl mb-2 mt-5 text-lime-800 font-semibold underline">
									3. Transaction Details
								</div>
							</div>
							<div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
								<div>
									<TDInputTemplateBr
										placeholder="Transaction date..."
										type="date"
										label="Transaction Date"
										name="b_tnxDate"
										formControlName={transactionDetailsData.b_tnxDate}
										handleChange={handleChangeTnxDetailsDetails}
										min={"1900-12-31"}
										max={formatDateToYYYYMMDD(new Date())}
										mode={1}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="Bank Name..."
										type="text"
										label="Bank Name"
										name="b_bankName"
										formControlName={transactionDetailsData.b_bankName}
										handleChange={handleChangeTnxDetailsDetails}
										mode={1}
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Cheque/Ref. no..."
										type="text"
										label="Cheque/Ref. No."
										name="b_chequeOrRefNo"
										formControlName={transactionDetailsData.b_chequeOrRefNo}
										handleChange={handleChangeTnxDetailsDetails}
										mode={1}
									/>
								</div>

								<div>
									<TDInputTemplateBr
										placeholder="Cheque/Ref. Date..."
										type="date"
										label="Cheque/Ref. Date"
										name="b_chequeOrRefDate"
										formControlName={transactionDetailsData.b_chequeOrRefDate}
										handleChange={handleChangeTnxDetailsDetails}
										min={"1900-12-31"}
										max={formatDateToYYYYMMDD(new Date())}
										mode={1}
									/>
								</div>

								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Select Transaction Type..."
										type="text"
										label="Transaction Type"
										name="b_tnxType"
										formControlName={transactionDetailsData.b_tnxType}
										handleChange={handleChangeTnxDetailsDetails}
										data={tnxTypes?.map((item, _) => ({
											code: item?.id,
											name: item?.name,
										}))}
										// data={[
										// 	{ code: "F1", name: "Fund 1" },
										// 	{ code: "F2", name: "Fund 2" },
										// 	{ code: "F3", name: "Fund 3" },
										// ]}
										mode={2}
										disabled
									/>
								</div>
								<div className="sm:col-span-2">
									<TDInputTemplateBr
										placeholder="Select Transaction Mode..."
										type="text"
										label="Transaction Mode"
										name="b_tnxMode"
										formControlName={transactionDetailsData.b_tnxMode}
										handleChange={handleChangeTnxDetailsDetails}
										data={tnxModes?.map((item, _) => ({
											code: item?.id,
											name: item?.name,
										}))}
										// data={[
										// 	{ code: "F1", name: "Fund 1" },
										// 	{ code: "F2", name: "Fund 2" },
										// 	{ code: "F3", name: "Fund 3" },
										// ]}
										mode={2}
									/>
								</div>

								<div className="sm:col-span-4">
									<TDInputTemplateBr
										placeholder="Type Remarks..."
										type="text"
										label="Remarks"
										name="b_remarks"
										formControlName={transactionDetailsData.b_remarks}
										handleChange={handleChangeTnxDetailsDetails}
										mode={3}
									/>
								</div>
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
						!disbursementDetailsData.b_scheme ||
						!disbursementDetailsData.b_fund ||
						!disbursementDetailsData.b_period ||
						!disbursementDetailsData.b_roi ||
						!disbursementDetailsData.b_mode ||
						!disbursementDetailsData.b_disburseAmt ||
						!disbursementDetailsData.b_bankCharges ||
						!disbursementDetailsData.b_processingCharges ||
						!transactionDetailsData.b_tnxDate ||
						!transactionDetailsData.b_bankName ||
						!transactionDetailsData.b_chequeOrRefNo ||
						!transactionDetailsData.b_chequeOrRefDate ||
						!transactionDetailsData.b_tnxMode ||
						!transactionDetailsData.b_remarks
					) {
						Message("warning", "Fill all the values properly!")
						setVisible(false)
						return
					}
					handleSubmitDisbursementForm()
					setVisible(!visible)
				}}
				onPressNo={() => setVisible(!visible)}
			/>

			{/* <DialogBox
				flag={4}
				onPress={() => setVisible2(!visible2)}
				visible={visible2}
				onPressYes={() => {
					// editGroup()
					onChangeCheck1()
					setVisible2(!visible2)
				}}
				onPressNo={() => setVisible2(!visible2)}
			/> */}
		</>
	)
}

export default DisbursmentForm
