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
// import EditGroupFormBM from "./Screens/BMHome/EditGroupFormBM"
import DashboardBM from "./Screens/BMHome/DashboardBM"
import DashboardMis from "./Screens/MISAssistantHome/DashboardMis"
import SearchGRTFormMis from "./Screens/MISAssistantHome/SearchGRTFormMis"
import SearchGroupMis from "./Screens/MISAssistantHome/SearchGroupMis"
import SearchGRTFormBM from "./Screens/BMHome/SearchGRTFormBM"
import SearchMemberMis from "./Screens/MISAssistantHome/SearchMemberMis"

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
						element: <SignupMis />,
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
								element: <SearchGroupMis />,
							},
							// {
							// 	path: "editgroupform/:id",
							// 	element: <EditGroupFormBM />,
							// },
							{
								path: "editgrtform/:id",
								element: <EditGRTFormBM />,
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
