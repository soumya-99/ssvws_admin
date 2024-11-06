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
import CatchError from "./Screens/CatchError"
import AuthMis from "./Screens/MISAssistant/AuthMis"
import SigninMis from "./Screens/MISAssistant/SigninMis"
import SignupMis from "./Screens/MISAssistant/SignupMis"
import ForgotPassMis from "./Screens/MISAssistant/ForgotPassMis"
import HomeMis from "./Screens/MISAssistantHome/HomeMis"
import HomeScreenMis from "./Screens/MISAssistantHome/HomeScreenMis"
import EditGRTFormMis from "./Screens/MISAssistantHome/EditGRTFormMis"
import EditGroupForm from "./Screens/MISAssistantHome/EditGroupForm"
import HomeBM from "./Screens/BMHome/HomeBM"
import HomeScreenBM from "./Screens/BMHome/HomeScreenBM"
import EditGRTFormBM from "./Screens/BMHome/EditGRTFormBM"
import EditGroupFormBM from "./Screens/BMHome/EditGroupFormBM"
import DashboardBM from "./Screens/BMHome/DashboardBM"
import DashboardMis from "./Screens/MISAssistantHome/DashboardMis"
import SearchGRTFormMis from "./Screens/MISAssistantHome/SearchGRTFormMis"
import SearchGroupMis from "./Screens/MISAssistantHome/SearchGroupMis"
import SearchGRTFormBM from "./Screens/BMHome/SearchGRTFormBM"
import SearchMemberMis from "./Screens/MISAssistantHome/SearchMemberMis"
import AssignMemberToGroup from "./Screens/MISAssistantHome/AssignMemberToGroup"
import SignUp from "./Screens/MISAssistant/SignUp"
import SearchGroupBM from "./Screens/BMHome/SearchGroupBM"
import HomeCO from "./Screens/COHome/HomeCO"
import DashboardCO from "./Screens/COHome/DashboardCO"
import HomeScreenCO from "./Screens/COHome/HomeScreenCO"
import SearchGRTFormCO from "./Screens/COHome/SearchGRTFormCO"
import SearchGroupCO from "./Screens/COHome/SearchGroupCO"
import EditGRTFormCO from "./Screens/COHome/EditGRTFormCO"
import SearchMemberCO from "./Screens/COHome/SearchMemberCO"
import EditGroupFormCO from "./Screens/COHome/EditGroupFormCO"
import EditDisburseFormBM from "./Screens/BMHome/EditDisburseFormBM"
import SearchMemberForDisburseBM from "./Screens/BMHome/SearchMemberForDisburseBM"
import SearchMemberForDisburseCO from "./Screens/COHome/SearchMemberForDisburseCO"
import DisbursedLoanApproveBM from "./Screens/BMHome/DisbursedLoanApproveBM"
import EditDisburseApproveFormBM from "./Screens/BMHome/EditDisburseApproveFormBM"

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
