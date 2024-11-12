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
import MasterBanks from "./Screens/Master/MasterBanks"
import EditMasterBank from "./Screens/Master/EditMasterBank"

// import CatchError from "./Screens/CatchError"
// import AuthMis from "./Screens/MISAssistant/AuthMis"
// import SigninMis from "./Screens/MISAssistant/SigninMis"
// import SignupMis from "./Screens/MISAssistant/SignupMis"
// import ForgotPassMis from "./Screens/MISAssistant/ForgotPassMis"
// import HomeMis from "./Screens/MISAssistantHome/HomeMis"
// import HomeScreenMis from "./Screens/MISAssistantHome/HomeScreenMis"
// import EditGRTFormMis from "./Screens/MISAssistantHome/EditGRTFormMis"
// import EditGroupForm from "./Screens/MISAssistantHome/EditGroupForm"
// import HomeBM from "./Screens/BMHome/HomeBM"
// import HomeScreenBM from "./Screens/BMHome/HomeScreenBM"
// import EditGRTFormBM from "./Screens/BMHome/EditGRTFormBM"
// import EditGroupFormBM from "./Screens/BMHome/EditGroupFormBM"
// import DashboardBM from "./Screens/BMHome/DashboardBM"
// import DashboardMis from "./Screens/MISAssistantHome/DashboardMis"
// import SearchGRTFormMis from "./Screens/MISAssistantHome/SearchGRTFormMis"
// import SearchGroupMis from "./Screens/MISAssistantHome/SearchGroupMis"
// import SearchGRTFormBM from "./Screens/BMHome/SearchGRTFormBM"
// import SearchMemberMis from "./Screens/MISAssistantHome/SearchMemberMis"
// import AssignMemberToGroup from "./Screens/MISAssistantHome/AssignMemberToGroup"
// import SignUp from "./Screens/MISAssistant/SignUp"
// import SearchGroupBM from "./Screens/BMHome/SearchGroupBM"
// import HomeCO from "./Screens/COHome/HomeCO"
// import DashboardCO from "./Screens/COHome/DashboardCO"
// import HomeScreenCO from "./Screens/COHome/HomeScreenCO"
// import SearchGRTFormCO from "./Screens/COHome/SearchGRTFormCO"
// import SearchGroupCO from "./Screens/COHome/SearchGroupCO"
// import EditGRTFormCO from "./Screens/COHome/EditGRTFormCO"
// import SearchMemberCO from "./Screens/COHome/SearchMemberCO"
// import EditGroupFormCO from "./Screens/COHome/EditGroupFormCO"
// import EditDisburseFormBM from "./Screens/BMHome/EditDisburseFormBM"
// import SearchMemberForDisburseBM from "./Screens/BMHome/SearchMemberForDisburseBM"
// import SearchMemberForDisburseCO from "./Screens/COHome/SearchMemberForDisburseCO"
// import DisbursedLoanApproveBM from "./Screens/BMHome/DisbursedLoanApproveBM"
// import EditDisburseApproveFormBM from "./Screens/BMHome/EditDisburseApproveFormBM"

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
								path: "disburseloan",
								element: <SearchMemberForDisburseBM />,
							},
							{
								path: "disburseloan/:id",
								element: <EditDisburseFormBM />,
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
								path: "disburseloanapprove",
								element: <DisbursedLoanApproveBM />,
							},
							{
								path: "disburseloanapprove/:id",
								element: <EditDisburseApproveFormBM />,
							},
							{
								path: "editgrtform/:id",
								element: <EditGRTFormBM />,
							},
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
