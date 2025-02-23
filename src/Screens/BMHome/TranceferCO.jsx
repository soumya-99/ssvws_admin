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
import { Spin, Button, Popconfirm, Tag, Timeline, Divider, Typography, List, Select } from "antd"
import { LoadingOutlined, InfoCircleFilled, CheckCircleOutlined } from "@ant-design/icons"
import FormHeader from "../../Components/FormHeader"
import { routePaths } from "../../Assets/Data/Routes"
import { useLocation } from "react-router"
import Sidebar from "../../Components/Sidebar"
import DialogBox from "../../Components/DialogBox"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import TimelineComp from "../../Components/TimelineComp"
import {
	PendingActionsOutlined,
	DeleteOutline,
	InfoOutlined,
} from "@mui/icons-material"
import { Checkbox } from "antd";
import { DataTable } from "primereact/datatable"
import Column from "antd/es/table/Column"
import { Toast } from "primereact/toast"
import { debounce } from "@mui/material"



function TranceferCO({ groupDataArr }) {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const { loanAppData } = location.state || {}
	const approval_status = location.state?.approval_status || "N"; 
	const navigate = useNavigate()
	const userDetails = JSON.parse(localStorage.getItem("user_details"))

	const [groupData, setGroupData] = useState(() => [])

	const [get_CO__, setCO__] = useState(() => [])
	// const [branch, setBranch] = useState(() => "")
	const [COPickup, setCOPickup] = useState(() => "")
	const [ToBranchName, setToBranchName] = useState(() => "")

	const [To_COData, setTo_COData] = useState(() => "")

	const [From_COData, setFrom_COData] = useState(() => "")
	const [From_BranchData, setFrom_BranchData] = useState(() => "")

	// const approv_stat = useLocation()
	const [ApprovStatus, setApprovStatus] = useState(() => "")


	const [CEOData_s, setCEOData_s] = useState(() => [])
	const [CEOData, setCEOData] = useState(() => [])

	const [visible2, setVisible2] = useState(() => false)
	const [visible3, setVisible3] = useState(() => false)
	const [visible4, setVisible4] = useState(() => false)


	// const [COMemList_Show, setCOMemList_Show] = useState()

	// const [COMemList_select, setCOMemList_select] = useState([])





	const [currentPage, setCurrentPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	// const [getloanAppData, setLoanAppData] = useState([])
	// const [expandedRows, setExpandedRows] = useState(null)
	const [COMemList_s, setCOMemList_s] = useState(() => [])
	const [COMemList_select, setCOMemList_select] = useState(null)
	const [COMemList_Store, setCOMemList_Store] = useState([])
	const toast = useRef(null)
	const isMounted = useRef(false)





	const [COAndBranch, setCOAndBranch] = useState(() => [])
	const [block, setBlock] = useState(() => "")

	const [groupDetails, setGroupDetails] = useState(() => [])
	const [memberDetails, setMemberDetails] = useState(() => [])
	const [visible, setVisible] = useState(() => false)
	const [remarksForDelete, setRemarksForDelete] = useState(() => "")





	// const [checkedValues, setCheckedValues] = useState([]);





	// console.log(COMemList_select , "paramsssssssssssssss")
	// console.log(location, "location")

	// const [formValues, setValues] = useState(initialValues)

	const initialValues = {
		// Grp_wit_Co: "",
		Grp_wit_Co: "",
		frm_co: "",
		frm_branch: "",
		to_co: "",
		to_branch: "",
		remarks_: "",
	}
	const [formValues, setValues] = useState(initialValues)

	const validationSchema = Yup.object({
		// Grp_wit_Co: Yup.string().required("Group Code With CO Name is required"),
		Grp_wit_Co: params?.id > 0 ? Yup.string() : Yup.string().required("Group Name is required"),
		frm_co: Yup.string(),
		frm_branch: Yup.string(),
		to_branch: params?.id > 0 ? Yup.string() : Yup.string().required("To Branch is required"),
		to_co:  params?.id > 0 ? Yup.string() : Yup.string().required("To CO is required"),
		remarks_: params?.id > 0 ? Yup.string() : Yup.string().required("Remarks is required"),

		// Grp_wit_Co: Yup.string(),
		// frm_co: Yup.string(),
		// frm_branch: Yup.string(),
		// to_branch: Yup.string(),
		// to_co: Yup.string(),
		// remarks_: Yup.string(),
	})

	const fetchGroupDetails = async () => {
		const creds = {
			group_code: params?.id,
			branch_code: userDetails?.brn_code,
		}
		await axios
			.post(`${url}/admin/fetch_search_group_web`, creds)
			.then((res) => {
				console.log("VVVVVVVVVVVVVVVVVVVVVVVV", res?.data?.msg[0])
				setValues({
					Grp_wit_Co: res?.data?.msg[0]?.group_name,
					frm_co: res?.data?.msg[0]?.group_name,
					frm_branch: res?.data?.msg[0]?.group_name,
					to_co: res?.data?.msg[0]?.to_co,
					to_branch: res?.data?.msg[0]?.to_branch,
					remarks_: res?.data?.msg[0]?.grp_addr,
				})
				setGroupData(res?.data?.msg)
				setCOPickup(
					res?.data?.msg[0]?.disctrict + "," + res?.data?.msg[0]?.branch_code
				)
				setCEOData(res?.data?.msg[0]?.co_id)
				setBlock(res?.data?.msg[0]?.block)
			})
			.catch((err) => {
				Message("error", "Some error occurred while fetching group form")
			})
	}




	const [options__Group, setOptions__Group] = useState([
		{ value: "0", label: "Search" },
	]);

	const [options__Branch, setOptions__Branch] = useState([
		{ value: "0", label: "Search" },
	]);

	const handleFetch_CO = debounce(async (value) => {
		if (!value) return;

		// console.log(value, 'valuevaluevaluevaluevalue');


		setLoading(true);

		const creds = {
			branch_code: userDetails?.brn_code,
			grp: value,
		}

		try {
			// Simulating an API call (Replace with your API)
			const response = await axios.post(`${url}/fetch_group_name_brnwise`, creds)

			console.log(response?.data?.msg, 'valuevaluevaluevaluevalue');

			const data = await response?.data?.msg;


			// Update options dynamically
			setOptions__Group(
				data.map((user) => ({
					//   value: user.id.toString(),
					//   label: user.name,
					// value: user.group_code,
					value: user.branch_code + "," + user.group_code,
					label: user.group_name,
				}))
			);
		} catch (error) {
			console.error("Error fetching data:", error);
		}

		setLoading(false);
	}, 500); // Debounced to prevent excessive API calls

	const handleFetchMemberDetailsCowise = async () => {
		setLoading(true)
		const creds_MemberListCo = {
			branch_code: userDetails?.brn_code,
			// co_id: userDetails?.emp_id
			co_id: CEOData
			// co_id: 10157
		}
		await axios
			.post(`${url}/fetch_member_dtls_cowise`, creds_MemberListCo)
			.then((res) => {
				console.log(creds_MemberListCo, "QQQQQrrrrQQQQQQQQQQQ", res?.data?.msg)
				setCOMemList_s(res?.data?.msg)
			})
			.catch((err) => {
				console.log("?????????????????????", err)
			})

		setLoading(false)
	}

	const handleFetch_Branch = debounce(async (value) => {
		if (!value) return;

		// console.log(value, 'valuevaluevaluevaluevalue');


		setLoading(true);

		const creds = {
			branch: value,
		}

		try {
			// Simulating an API call (Replace with your API)
			const response = await axios.post(`${url}/fetch_branch_name`, creds)

			console.log(response?.data?.msg, 'valuevaluevaluevaluevalue');

			const data = await response?.data?.msg;

			console.log(data, 'fetch_branch_name');



			// Update options dynamically
			setOptions__Branch(
				data.map((user) => ({
					//   value: user.id.toString(),
					//   label: user.name,
					// value: user.group_code,
					value: user.branch_code,
					label: user.branch_name,
				}))
			);
		} catch (error) {
			console.error("Error fetching data:", error);
		}

		setLoading(false);
	}, 500); // Debounced to prevent excessive API calls

	const handleFetch_CO_By_Branch = async () => {
		setLoading(true)
		const creds = {
			branch_code: ToBranchName
		}
		await axios
			.post(`${url}/fetch_co_name_branchwise`, creds)
			.then((res) => {
				console.log("////////////////////////", res?.data?.msg)
				setTo_COData(res?.data?.msg)
			})
			.catch((err) => {
				console.log("?????????????????????", err)
			})

		setLoading(false)
	}


	// userDetails?.emp_id

	// useEffect(() => {
	// 	console.log(location_, 'location_location_');
	// 	// handleFetchMemberDetailsCowise()
	// }, [CEOData])

	useEffect(() => {

        // console.log("Received loanAppData:", approval_status);
    }, []); // Log whenever loanAppData changes

	useEffect(() => {
		console.log('////////////////////////', ToBranchName);

		handleFetch_CO_By_Branch()
	}, [ToBranchName])


	const handleFetchAllFormData = async () => {
		setLoading(true)
		const creds = {
			group_code: params?.id,
			flag: approval_status,
			from_co: location.state.from_co
		}
		console.log(creds, "hhhhhhhhhhhhhhhhhh", params?.id)
		await axios
			// .post(`${url}/fetch_co_brnwise=${userDetails?.brn_code}`)
			.post(`${url}/transfer_co_view_all_details`, creds)
			.then((res) => {
				console.log("fetch__data_view", res?.data?.msg)
				// setCEOData_s(res?.data?.msg)
				setValues({
					Grp_wit_Co: res?.data?.msg[0]?.group_name,
					frm_co: res?.data?.msg[0]?.from_co_name,
					frm_branch: res?.data?.msg[0]?.from_brn_name,
					to_co: res?.data?.msg[0]?.to_co_name,
					to_branch: res?.data?.msg[0]?.to_brn_name,
					remarks_: res?.data?.msg[0]?.remarks,
				})
				// console.log(formValues.b_branch_name);
				console.log(formValues, 'xxxxxxxxxxxxxxxxxxxxx', res?.data?.msg);



			})
			.catch((err) => {
				console.log("?????????????????????", err)
			})

		setLoading(false)
	}





	const handleSelectionChange = (e) => {


		if (e.value.length <= 4) {

			// Update the selected products setPaymentDate
			console.log(e.value, "kkkkkkkkkkkkkkkkkkkk")

			// Perform any additional logic here, such as enabling a button or triggering another action
			setCOMemList_select(e.value)

			function transformData(inputArray) {
				return inputArray.map(({ form_no, member_code }) => ({ form_no, member_code }));
			}

			const output = transformData(e.value);
			setCOMemList_Store(output)
			console.log(output, 'kkkkkkkkkkkkkkkkkkkk');

		}

	}


	// const onPageChange = (event) => {
	// 	setCurrentPage(event.first)
	// 	setRowsPerPage(event.rows)
	// }





	useEffect(() => {

		if (params?.id > 0) {
			// console.log(params?.id, 'param', location.state.approval_status, '//', location.state.from_co);
			// const approv_stat = useLocation();
			// setApprovStatus(approv_stat.state.approval_status)
			// console.log(location.state.approval_status, 'approval_statusapproval_statusapproval_statusapproval_status', params.id);
			handleFetchAllFormData()
		}

	}, [])

	const handleFetchCOBranch = async (group_code) => {
		setLoading(true)
		const creds = {
			branch_code: userDetails?.brn_code,
			group_code: group_code?.split(",")[1]
		}


		await axios
			// .get(`${url}/get_block?dist_id=${group_code}`)
			.post(`${url}/fetch_grp_co_dtls_for_transfer`, creds)
			.then((res) => {
				console.log(res?.data?.msg, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
				setCOAndBranch(res?.data?.msg)
			})
			.catch((err) => {
				console.log("!!!!!!!!!!!!!!!!", err)
			})
		setLoading(false)
	}

	useEffect(() => {
		// console.log(COPickup, 'VVVVVVVVV', COAndBranch, 'VVVVVVVVVVVVVVV-utsabbbbbb', COPickup?.split(",")[1]);

		handleFetchCOBranch(COPickup)
	}, [COPickup])


	const onSubmit = async (values) => {
		
		console.log(values, "VVVVVVVVVVVVVVVVVVVVVVVV", 'hhhh')
		setLoading(true)

		setVisible(true)

		setLoading(false)
		// }


	}

	const formik = useFormik({
		initialValues: +params.id > 0 ? formValues : initialValues,
		// formValues : initialValues,
		onSubmit,
		validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		enableReinitialize: true,
		validateOnMount: true,
	})

	const editGroup = async () => {
		// alert('llllllllllllllllll')
		const creds = {
			group_code: formik.values.Grp_wit_Co?.split(",")[1],
			from_co: COAndBranch[0].co_id,
			from_brn: COAndBranch[0].co_brn_id,
			to_co: formik.values.to_co,
			to_brn: ToBranchName,
			remarks: formik.values.remarks_,
			created_by: userDetails?.emp_id,
			modified_by: userDetails?.emp_id
		}

		console.log(creds, 'approveDataaftersubmit');

		await axios
			.post(`${url}/transfer_co`, creds)
			.then((res) => {
				setLoading(false)

				Message("success", "Updated successfully.")

				// if (params?.id < 1) {
				// 	navigate(`/homebm/tranceferco/`)
				// }
				navigate(-1); 

			})
			.catch((err) => {
				setLoading(false)

				Message("error", "Some error occurred while updating.")
			})

	}

	

	const cancel = (e) => {
		console.log(e)
		// message.error('Click on No');
	}

	return (
		<>
<section className="dark:bg-[#001529] flex justify-center align-middle p-5">
<div className=" p-5 w-4/5 min-h-screen rounded-3xl">
<div className="w-auto mx-14 my-4">
						<FormHeader
							text={`${params?.id == 0 ? "Transfer Group" : "View Group Transfer"}`}
							mode={2}
						/>
					</div>
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>

				
				{/* <main className="px-4 pb-5 bg-slate-50 rounded-lg shadow-lg h-auto my-10 mx-32"> */}
				<div className="card bg-white border-2 p-5 mx-16 shadow-lg rounded-3xl surface-border border-round surface-ground flex-auto font-medium">
					{/* <div className="flex flex-row gap-3 mt-0  py-3 rounded-xl">
						<div className="text-3xl text-slate-700 font-bold">
							Transfer CO
						</div>
					</div> */}
					<form onSubmit={formik.handleSubmit}>
						{/* <div className="flex justify-start gap-5"> */}
						<div className="grid grid-cols-3 gap-5 mt-5">



							<div>
								{/* <TDInputTemplateBr
										placeholder="Search Name Code or Group"
                    label="Group Code With Name"
										type="text"
										name="Grp_wit_Co"
										formControlName={COPickup}
										handleChange={(e) => {
											setCOPickup(e.target.value)
											formik.handleChange(e)
											console.log(e.target.value,'VVVVVVVVVVVVVVVVVVVVVVVV')
										}}
										handleBlur={formik.handleBlur}
										handleChange={formik.handleChange}
										data={get_CO__?.map((item, i) => ({
											code: item?.branch_code + "," + item?.group_code,
											name: item?.group_name + ' ('+item?.group_code+')',
										}))}
										mode={2}
										disabled={params.id > 0 ? true : false}
									/> */}


								{params?.id < 1 && (
									<>
										<label for="frm_co" class="block mb-2 text-sm capitalize font-bold text-slate-800
				 dark:text-gray-100">Search Group Name or Code</label>
										<Select
											showSearch
											placeholder={formValues.Grp_wit_Co ? formValues.Grp_wit_Co : "Search Name Code or Group"}
											label="Group Code With Name"
											name="Grp_wit_Co"
											filterOption={false} // Disable default filtering to use API search
											onSearch={handleFetch_CO} // Call API on typing
											notFoundContent={loading ? <Spin size="small" /> : "No results found"}
											formControlName={COPickup}
											// formControlName={formValues.Grp_wit_Co ? formValues.Grp_wit_Co : COPickup}
											//   handleChange={(e) => {
											// 	// setCOPickup(e.target.value)
											// 	// formik.handleChange(e)
											// 	console.log(e.target.value,'valuevaluevaluevaluevalue')
											// }}
											// value={formValues.Grp_wit_Co ? formValues.Grp_wit_Co : COPickup} // Controlled value
											onChange={(value) => {
												setCOPickup(value)
												formik.setFieldValue("Grp_wit_Co", value);
											}}
											options={options__Group}
											//   style={{ width: 250 }}
											mode={2}
										// disabled={location?.state.approval_status == "A" ? true : false} //location?.state.approval_status == null ? '': location?.state.approval_status
										/>
									</>

								)}

								{params?.id > 0 && (
									<TDInputTemplateBr
										// placeholder="From CO"
										type="text"
										label="Search Group Name or Code"
										name="Grp_wit_Co"
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										value={formValues.Grp_wit_Co}
										// formControlName={formik.values.frm_co}
										formControlName={formik.values.Grp_wit_Co}
										disabled={true}
										mode={1}
									/>
								)}

								{formik.errors.Grp_wit_Co && formik.touched.Grp_wit_Co ? (
									<VError title={formik.errors.Grp_wit_Co} />
								) : null}



							</div>


							<div>



								<TDInputTemplateBr
									placeholder="From CO"
									type="text"
									label="From CO"
									name="frm_co"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									// formControlName={formik.values.frm_co}
									formControlName={COAndBranch.length > 0 ? COAndBranch[0].co_name : formik.values.frm_co}
									disabled={true}
									mode={1}
								/>
								{formik.errors.frm_co && formik.touched.frm_co ? (
									<VError title={formik.errors.frm_co} />
								) : null}

							</div>

							<div>
								<TDInputTemplateBr
									placeholder="From Branch"
									type="text"
									label="From Branch"
									name="frm_branch"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									// formControlName={formik.values.frm_branch}
									formControlName={COAndBranch.length > 0 ? COAndBranch[0].group_name : formik.values.frm_co}
									mode={1}
									// disabled={params.id > 0 ? true : false}
									disabled={true}
								/>
								{formik.errors.frm_branch && formik.touched.frm_branch ? (
									<VError title={formik.errors.frm_branch} />
								) : null}
							</div>

							<div>

							{params?.id < 1 &&(
								<>
								<label for="frm_co" class="block mb-2 text-sm capitalize font-bold text-slate-800
				 dark:text-gray-100">To Branch</label>

								<Select

									showSearch
									placeholder="Search Branch Name Or Code"
									//   label="Branch  With Name"
									name="to_branch"
									filterOption={false} // Disable default filtering to use API search
									onSearch={handleFetch_Branch} // Call API on typing
									notFoundContent={loading ? <Spin size="small" /> : "No results found"}
									formControlName={ToBranchName}
									// value={formValues.to_branch ? formValues.to_branch : ToBranchName}
									onChange={(value) => {
										setToBranchName(value)
										console.log(value, 'jjjj');

										formik.setFieldValue("to_branch", value);
									}}
									options={options__Branch}
									//   style={{ width: 250 }}
									mode={2}
									// disabled={location?.state.approval_status == "A" ? true : false}
									disabled={false}
								/>
								</>
							)}
								

							{params?.id > 0 &&(
									<TDInputTemplateBr
									placeholder="To Branch"
									type="text"
									label="To Branch"
									name="to_branch"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									// formControlName={formik.values.frm_branch}
									formControlName={formik.values.to_branch}
									value={formValues.to_branch}
									mode={1}
									// disabled={params.id > 0 ? true : false}
									disabled={true}
								/>
								)}

								{formik.errors.to_branch && formik.touched.to_branch ? (
									<VError title={formik.errors.to_branch} />
								) : null}
{/* {JSON.stringify(ToBranchName, 2)}  // {JSON.stringify(formik.values.to_branch, 2)} */}

							</div>

							<div>
								{/* disabled={location?.state.approval_status == "A" ? true : false} */}
								{params?.id < 1 &&(
								
								<TDInputTemplateBr
									placeholder="Select CO"
									label="To CO"
									name="to_co"
									// formControlName={CEOData} // Default to SHG
									// formControlName={formik.values.to_co}
									// formControlName={To_COData?.length > 0 ? To_COData[0]?.to_co_name : formik.values.to_co}
									formControlName={To_COData[0]?.to_co_name}
									// handleChange={formik.handleChange}
									// value={formik.values.to_co || ""} // Controlled value
									// value={formValues.to_co ? formValues.to_co : To_COData[0]?.to_co_name}
									handleChange={(e) => {
										setCEOData(e.target.value)
										formik.handleChange(e)
										console.log(e.target.value, 'VVVVVVVVVVVVVVVVVVVVVVVV')
									}}
									// handleBlur={formik.handleBlur}
									data={
										To_COData && To_COData.length > 0
											? To_COData.map((item) => ({
												code: item?.to_co_id,
												name: item?.to_co_name,
											}))
											: [{ code: '', name: 'No Data Available' }] // Fallback option
									}
									mode={2}
								/>
								)}

								{params?.id > 0 &&(
									<TDInputTemplateBr
									// placeholder="To CO"
									type="text"
									label="To CO"
									name="to_co"
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									// formControlName={formik.values.frm_branch}
									formControlName={formik.values.to_co}
									value={formValues.to_co}
									mode={1}
									// disabled={params.id > 0 ? true : false}
									disabled={true}
								/>
								)}

								{formik.errors.to_co && formik.touched.to_co ? (
									<VError title={formik.errors.to_co} />
								) : null}
							</div>

					






							<div className="sm:col-span-3">
								<TDInputTemplateBr
									placeholder="Remarks..."
									type="text"
									label={`Remarks`}
									name="remarks_"
									formControlName={formik.values.remarks_}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={3}
									disabled={params.id > 0 ? true : false}
								/>
								{formik.errors.remarks_ && formik.touched.remarks_ ? (
									<VError title={formik.errors.remarks_} />
								) : null}
							</div>






						</div>




						{/* </div> */}

						{/* {params.id > 0 && (
							<Divider
								type="vertical"
								style={{
									height: 650,
								}}
							/>
						)} */}



						{/* {params?.id > 0 && () */}
						{params?.id < 1 && (   //previously 3
							<div className="mt-10">
								<BtnComp
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
								// param={params?.id}
								/>

							</div>
						)}

						{/* {JSON.stringify(userDetails?.id, null, 2)} // 
						{approval_status == null ? approval_status : approval_status}
						{JSON.stringify(approval_status, null, 2)} */}


						{/* {userDetails?.id == 2 && memberDetails?.approval_status === "R" && (
							<div className="mt-10">
								<BtnComp
									mode="B"
									showUpdateAndReset={false}
									showReject={true}
									onRejectApplication={() => setVisible2(true)}
									showForward={true}
									onForwardApplication={() => setVisible3(true)}
								/>
							</div>
						)}
						{userDetails?.id == 2  && memberDetails?.approval_status === "U" && (
							<div className="mt-10">
								<BtnComp
									mode="B"
									showUpdateAndReset={false}
									showReject={true}
									onRejectApplication={() => setVisible2(true)}
									showForward={true}
									onForwardApplication={() => setVisible3(true)}
								/>
							</div>
						)} */}
					</form>
				{/* </main> */}
				</div>
			</Spin>

			</div>
			</section>


			<DialogBox
				flag={4}
				onPress={() => setVisible(!visible)}
				visible={visible}
				onPressYes={() => {
					editGroup()
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
					setVisible2(!visible2)
				}}
				onPressNo={() => setVisible2(!visible2)}
			/> */}
		</>
	)
}

export default TranceferCO
