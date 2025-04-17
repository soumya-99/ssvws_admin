import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import Auth from "./Screens/Appraiser/Auth"
import Notfound from "./Screens/Notfound/Notfound"
// import Details from "./Screens/Homescreen/Details"
import { Democontext } from "./Context/Democontext"
import Loader from "./Components/Loader"
import CircularProgress from "@mui/material/CircularProgress"
import LoanStatementMain from "./Screens/Reports/LoanStatements/LoanStatementMain"
import LoanTransactionsMain from "./Screens/Reports/LoanTransactions/LoanTransactionsMain"
import DemandReportsMain from "./Screens/Reports/DemandReports/DemandReportsMain"
import OutstaningReportMain from "./Screens/Reports/OutstandingReports/OutstaningReportMain"
import DisbursedLoanApproveSingleBM from "./Screens/BMHome/DisbursedLoanApproveSingleBM"
import TestPage from "./Screens/Reports/LoanTransactions/testPage"
import MasterEmployees from "./Screens/Admin/Master/Employees/MasterEmployees"
import EditMasterEmployee from "./Screens/Admin/Master/Employees/EditMasterEmployee"
import HomeAdmin from "./Screens/Admin/HomeAdmin"
import AdminDashboard from "./Screens/Admin/Dashboard/AdminDashboard"
import CreateUser from "./Screens/Admin/UserManagement/CreateUser"
import ManageUser from "./Screens/Admin/UserManagement/ManageUser"
import TransferUserManage from "./Screens/Admin/UserManagement/TransferUserManage"
import TransferUser from "./Screens/Admin/UserManagement/TransferUser"
import A_LoanStatementMain from "./Screens/Admin/Reports/LoanStatements/A_LoanStatementMain"
import A_LoanTransactionsMain from "./Screens/Admin/Reports/LoanTransactions/A_LoanTransactionsMain"
import A_DemandReportsMain from "./Screens/Admin/Reports/DemandReports/A_DemandReportsMain"
import A_OutstandingReportMain from "./Screens/Admin/Reports/OutstandingReports/A_OutstandingReportMain"
import DemandVsCollectionMain from "./Screens/Reports/DemandVsCollectionReport/DemandVsCollectionMain"
import FundwiseMain from "./Screens/Reports/SummaryReports/FundwiseReport/FundwiseMain"
import SchemewiseMain from "./Screens/Reports/SummaryReports/SchemewiseReport/SchemewiseMain"
import A_FundwiseMain from "./Screens/Admin/Reports/SummaryReports/FundwiseReport/A_FundwiseMain"
import A_SchemewiseMain from "./Screens/Admin/Reports/SummaryReports/SchemewiseReport/A_SchemewiseMain"
import A_DemandVsCollectionMain from "./Screens/Admin/Reports/DemandVsCollectionReports/A_DemandVsCollectionMain"
import AttendanceDashboard from "./Screens/Admin/Attendance/AttendanceDashboard"
import AttendanceBM from "./Screens/BMHome/AttendanceBM"
import GroupClose from "./Screens/Reports/GroupClose/GroupClose"
import MasterDesignations from "./Screens/Admin/Master/Designations/MasterDesignations"
import EditMasterDesignations from "./Screens/Admin/Master/Designations/EditMasterDesignations"
import TranceferCO from "./Screens/BMHome/TranceferCO"
import TransferCOScreen from "./Screens/BMHome/TransferCOScreen"
import TranceferCOApproveForm from "./Screens/BMHome/TranceferCOApproveForm"
import TransferCOApprovalUnic from "./Screens/BMHome/TransferCOApprovalUnic"
import MemberTransfer from "./Screens/BMHome/MemberTransfer"
import EditMemberTransfer from "./Screens/Admin/Master/Employees/EditMemberTransfer"
import ApproveMemberTransfer from "./Screens/BMHome/ApproveMemberTransfer"
import ApproveMemberTransferForm from "./Screens/Forms/Master/ApproveMemberTransferForm"
import ApproveEditMemberTrans from "./Screens/Admin/Master/Employees/ApproveEditMemberTrans"
import ViewMemberTransfer from "./Screens/BMHome/ViewMemberTransfer"
import TransferMemberViewScreen from "./Screens/BMHome/TransferMemberViewScreen"
import MonthEnd from "./Screens/Admin/UserManagement/MonthEnd"
import Payroll from "./Screens/Admin/Payroll/Payroll"
import OverdueReport from "./Screens/Reports/OverdueReport/OverdueReport"
import RejectTransaction from "./Screens/BMHome/Loans/RejectTransaction"
// import A_LoanStatementMain from "./Screens/Admin/Reports/LoanStatements/A_LoanStatementMain"
// import A_LoanTransactionsMain from "./Screens/Admin/Reports/LoanTransactions/A_LoanTransactionsMain"
// import A_DemandReportsMain from "./Screens/Admin/Reports/DemandReports/A_DemandReportsMain"
// import A_OutstaningReportMain from "./Screens/Admin/Reports/OutstandingReports/A_OutstaningReportMain"
// import A_GroupwiseRecoveryReport from "./Screens/Admin/Reports/A_GroupwiseRecoveryReport"
// import A_MemberwiseRecoveryReport from "./Screens/Admin/Reports/A_MemberwiseRecoveryReport"
const MasterBanks = lazy(() =>
	import("./Screens/Admin/Master/Banks/MasterBanks")
)
const EditMasterBank = lazy(() =>
	import("./Screens/Admin/Master/Banks/EditMasterBank")
)
const EditRecoveryApproveFormBM = lazy(() =>
	import("./Screens/BMHome/EditRecoveryApproveFormBM")
)
const SearchViewLoanBM = lazy(() => import("./Screens/BMHome/SearchViewLoanBM"))
const EditViewLoanFormBM = lazy(() =>
	import("./Screens/BMHome/EditViewLoanFormBM")
)
const MemberLoanDetailsBM = lazy(() =>
	import("./Screens/BMHome/MemberLoanDetailsBM")
)
const MemberwiseRecoveryReport = lazy(() =>
	import("./Screens/Reports/MemberwiseRecoveryReport")
)
const GroupwiseRecoveryReport = lazy(() =>
	import("./Screens/Reports/GroupwiseRecoveryReport")
)
const DemandReportScreen = lazy(() =>
	import("./Screens/Reports/DemandReportScreen")
)
const CatchError = lazy(() => import("./Screens/CatchError"))
const AuthMis = lazy(() => import("./Screens/MISAssistant/AuthMis"))
const SigninMis = lazy(() => import("./Screens/MISAssistant/SigninMis"))
const SignupMis = lazy(() => import("./Screens/MISAssistant/SignupMis"))
const ForgotPassMis = lazy(() => import("./Screens/MISAssistant/ForgotPassMis"))
const HomeMis = lazy(() => import("./Screens/MISAssistantHome/HomeMis"))
const HomeScreenMis = lazy(() =>
	import("./Screens/MISAssistantHome/HomeScreenMis")
)
const EditGRTFormMis = lazy(() =>
	import("./Screens/MISAssistantHome/EditGRTFormMis")
)
const EditGroupForm = lazy(() =>
	import("./Screens/MISAssistantHome/EditGroupForm")
)
const HomeBM = lazy(() => import("./Screens/BMHome/HomeBM"))
const HomeScreenBM = lazy(() => import("./Screens/BMHome/HomeScreenBM"))
const EditGRTFormBM = lazy(() => import("./Screens/BMHome/EditGRTFormBM"))
const EditGroupFormBM = lazy(() => import("./Screens/BMHome/EditGroupFormBM"))
const DashboardBM = lazy(() => import("./Screens/BMHome/DashboardBM"))
const DashboardMis = lazy(() =>
	import("./Screens/MISAssistantHome/DashboardMis")
)
const SearchGRTFormMis = lazy(() =>
	import("./Screens/MISAssistantHome/SearchGRTFormMis")
)
const SearchGroupMis = lazy(() =>
	import("./Screens/MISAssistantHome/SearchGroupMis")
)
const SearchGRTFormBM = lazy(() => import("./Screens/BMHome/SearchGRTFormBM"))
const SearchMemberMis = lazy(() =>
	import("./Screens/MISAssistantHome/SearchMemberMis")
)
const AssignMemberToGroup = lazy(() =>
	import("./Screens/MISAssistantHome/AssignMemberToGroup")
)
const SignUp = lazy(() => import("./Screens/MISAssistant/SignUp"))
const SearchGroupBM = lazy(() => import("./Screens/BMHome/SearchGroupBM"))
const HomeCO = lazy(() => import("./Screens/COHome/HomeCO"))
const DashboardCO = lazy(() => import("./Screens/COHome/DashboardCO"))
const HomeScreenCO = lazy(() => import("./Screens/COHome/HomeScreenCO"))
const SearchGRTFormCO = lazy(() => import("./Screens/COHome/SearchGRTFormCO"))
const SearchGroupCO = lazy(() => import("./Screens/COHome/SearchGroupCO"))
const EditGRTFormCO = lazy(() => import("./Screens/COHome/EditGRTFormCO"))
const SearchMemberCO = lazy(() => import("./Screens/COHome/SearchMemberCO"))
const EditGroupFormCO = lazy(() => import("./Screens/COHome/EditGroupFormCO"))
const EditDisburseFormBM = lazy(() =>
	import("./Screens/BMHome/EditDisburseFormBM")
)
const SearchMemberForDisburseBM = lazy(() =>
	import("./Screens/BMHome/SearchMemberForDisburseBM")
)
const SearchMemberForDisburseCO = lazy(() =>
	import("./Screens/COHome/SearchMemberForDisburseCO")
)
const DisbursedLoanApproveBM = lazy(() =>
	import("./Screens/BMHome/DisbursedLoanApproveBM")
)
const EditDisburseApproveFormBM = lazy(() =>
	import("./Screens/BMHome/EditDisburseApproveFormBM")
)

// const AuthBr = lazy(() => import("./Screens/BranchManager/AuthBr"))

const root = ReactDOM.createRoot(document.getElementById("root"))

// window.addEventListener("beforeunload", (ev) => {
// 	ev.preventDefault()

// 	localStorage.clear()
// })

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <AuthMis />,
				children: [
					{
						path: "",
						element: <SigninMis />,
					},
					{
						path: "signup",
						element: <SignUp />,
					},
					{
						path: "forgotpassword",
						element: <ForgotPassMis />,
					},
					{
						path: "homemis",
						element: <HomeMis />,
						children: [
							{
								path: "",
								element: <DashboardMis />,
							},
							{
								path: "grtappls",
								element: <HomeScreenMis />,
							},
							{
								path: "searchform",
								element: <SearchGRTFormMis />,
							},
							{
								path: "searchgroup",
								element: <SearchGroupMis />,
							},
							{
								path: "searchmember",
								element: <SearchMemberMis />,
							},
							// {
							// 	path: "assignmember",
							// 	element: <AssignMemberToGroup />,
							// },
							{
								path: "editgroupform/:id",
								element: <EditGroupForm />,
							},
							{
								path: "editgrtform/:id",
								element: <EditGRTFormMis />,
							},
						],
					},
					{
						path: "homebm",
						element: <HomeBM />,
						children: [
							{
								path: "",
								element: <DashboardBM />,
							},
							{
								path: "grtappls",
								element: <HomeScreenBM />,
							},
							{
								path: "searchform",
								element: <SearchGRTFormBM />,
							},
							{
								path: "searchgroup",
								element: <SearchGroupBM />,
							},
							{
								path: "editgroupform/:id",
								element: <EditGroupFormBM />,
							},
							{
								path: "attendancebm",
								element: <AttendanceBM />,
							},
							{
								path: "disburseloan",
								element: <SearchMemberForDisburseBM />,
							},
							{
								path: "disburseloan/:id",
								element: <EditDisburseFormBM />,
							},
							{
								path: "transfermember",
								element: <MemberTransfer />,
							},
							{
								path: "transfermember/:id",
								element: <EditMemberTransfer />,
							},
							{
								path: "approvemembertransfer",
								element: <ApproveMemberTransfer />,
							},
							{
								path: "approvemembertransfer/:id",
								element: <ApproveEditMemberTrans />,
							},
							// {
							// 	path: "masterbanks",
							// 	element: <MasterBanks />,
							// },
							// {
							// 	path: "masterbanks/:id",
							// 	element: <EditMasterBank />,
							// },
							// {
							// 	path: "masteremployees",
							// 	element: <MasterEmployees />,
							// },
							// {
							// 	path: "masteremployees/:id",
							// 	element: <EditMasterEmployee />,
							// },
							{
								path: "rejecttxn",
								element: <RejectTransaction />,
							},
							{
								path: "approveloan",
								element: <DisbursedLoanApproveBM />,
							},
							{
								path: "approvedisbursed",
								element: <DisbursedLoanApproveSingleBM />,
							},
							{
								path: "approveloan/:id",
								element: <EditDisburseApproveFormBM />,
							},
							{
								path: "recoveryloan/:id",
								element: <EditRecoveryApproveFormBM />,
							},
							{
								path: "viewloan",
								element: <SearchViewLoanBM />,
							},
							{
								path: "viewloan/:id",
								element: <EditViewLoanFormBM />,
							},
							{
								path: "memberloandetails/:id",
								element: <MemberLoanDetailsBM />,
							},
							{
								path: "editgrtform/:id",
								element: <EditGRTFormBM />,
							},
							{
								path: "memberwiserecoveryreport",
								element: <MemberwiseRecoveryReport />,
							},
							{
								path: "groupwiserecoveryreport",
								element: <GroupwiseRecoveryReport />,
							},
							// {
							// 	path: "demandreport",
							// 	element: <DemandReportScreen />,
							// },
							{
								path: "loanstatements",
								element: <LoanStatementMain />,
							},
							{
								path: "loantxns",
								element: <LoanTransactionsMain />,
							},
							{
								path: "testpage",
								element: <TestPage />,
							},
							{
								path: "demandreport",
								element: <DemandReportsMain />,
							},
							{
								path: "outstasndingreport",
								element: <OutstaningReportMain />,
							},
							{
								path: "demandvscollectionreport",
								element: <DemandVsCollectionMain />,
							},
							{
								path: "overduereport",
								element: <OverdueReport />,
							},
							{
								path: "fundwisesummary",
								element: <FundwiseMain />,
							},
							{
								path: "schemewisesummary",
								element: <SchemewiseMain />,
							},
							{
								path: "groupclosereport",
								element: <GroupClose />,
							},
							{
								path: "trancefercofrom",
								element: <TranceferCO />,
							},
							{
								path: "tranceferco",
								element: <TransferCOScreen />,
							},
							{
								path: "trancefercofrom/:id",
								element: <TranceferCO />,
							},
							{
								path: "trancefercofromapprove/:id",
								element: <TranceferCOApproveForm />,
							},
							{
								path: "trancefercofromapprove-unic",
								element: <TransferCOApprovalUnic />,
							},
							{
								path: "viewmembertransfer",
								element: <ViewMemberTransfer />,
							},
							{
								path: "viewmembertransfer/:id",
								element: <TransferMemberViewScreen />,
							},

							// {
							// 	path: "summaryreports",
							// 	children: [
							// 		{
							// 			path: "fundwise",
							// 			element: <FundwiseMain />,
							// 		},
							// 		{
							// 			path: "schemewise",
							// 			element: <SchemewiseMain />,
							// 		},
							// 	],
							// },
						],
					},
					{
						path: "homeadmin",
						element: <HomeAdmin />,
						children: [
							{
								path: "",
								element: <AdminDashboard />,
							},
							{
								path: "masterbanks",
								element: <MasterBanks />,
							},
							{
								path: "masterbanks/:id",
								element: <EditMasterBank />,
							},
							{
								path: "masteremployees",
								element: <MasterEmployees />,
							},
							{
								path: "masteremployees/:id",
								element: <EditMasterEmployee />,
							},
							{
								path: "masterdesignations",
								element: <MasterDesignations />,
							},
							{
								path: "masterdesignations/:id",
								element: <EditMasterDesignations />,
							},
							{
								path: "createuser/:id",
								element: <CreateUser />,
							},
							{
								path: "manageuser",
								element: <ManageUser />,
							},
							{
								path: "transferuser/:id",
								element: <TransferUser />,
							},
							{
								path: "monthend",
								element: <MonthEnd />,
							},
							{
								path: "transferusermanage",
								element: <TransferUserManage />,
							},
							{
								path: "attendancedashboard",
								element: <AttendanceDashboard />,
							},
							{
								path: "loanstatements",
								element: <A_LoanStatementMain />,
							},
							{
								path: "loantxns",
								element: <A_LoanTransactionsMain />,
							},
							{
								path: "demandreport",
								element: <A_DemandReportsMain />,
							},
							{
								path: "outstasndingreport",
								element: <A_OutstandingReportMain />,
							},
							{
								path: "fundwisesummary",
								element: <A_FundwiseMain />,
							},
							{
								path: "schemewisesummary",
								element: <A_SchemewiseMain />,
							},
							{
								path: "demandvscollectionreport",
								element: <A_DemandVsCollectionMain />,
							},
							// {
							// 	path: "summaryreports",
							// 	children: [
							// 		{
							// 			path: "fundwise",
							// 			element: <A_FundwiseMain />,
							// 		},
							// 		{
							// 			path: "schemewise",
							// 			element: <A_SchemewiseMain />,
							// 		},
							// 	],
							// },
						],
					},
					{
						path: "homeco",
						element: <HomeCO />,
						children: [
							{
								path: "",
								element: <DashboardCO />,
							},
							{
								path: "grtappls",
								element: <HomeScreenCO />,
							},
							{
								path: "searchform",
								element: <SearchGRTFormCO />,
							},
							{
								path: "searchgroup",
								element: <SearchGroupCO />,
							},

							{
								path: "searchgroup",
								element: <SearchGroupCO />,
							},
							{
								path: "searchmember",
								element: <SearchMemberCO />,
							},
							// {
							// 	path: "assignmember",
							// 	element: <AssignMemberToGroup />,
							// },
							{
								path: "editgroupform/:id",
								element: <EditGroupFormCO />,
							},
							{
								path: "disburseloan",
								element: <SearchMemberForDisburseCO />,
							},
							{
								path: "disburseloan/:id",
								element: <EditDisburseFormBM />,
							},
							// {
							// 	path: "editgroupform/:id",
							// 	element: <EditGroupFormBM />,
							// },
							{
								path: "editgrtform/:id",
								element: <EditGRTFormCO />,
							},
						],
					},
				],
			},
			// {
			// 	path: "forgotpassword",
			// 	element: <ForgotPass />,
			// },
		],
	},
	{
		path: "attendance_report",
		element: <Payroll />,
	},
	{
		path: "error/:id/:message",
		element: <CatchError />,
	},
	{
		path: "*",
		element: <Notfound />,
	},
])

root.render(
	<Democontext>
		<Suspense
			fallback={
				<div className="bg-gray-200 h-screen flex justify-center items-center">
					{/* <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            style={{ color: "#052d27" }}
          /> */}
					<CircularProgress disableShrink color="error" />
				</div>
			}
		>
			<Loader />
			<RouterProvider router={router} />
		</Suspense>
	</Democontext>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
