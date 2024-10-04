import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Auth from "./Screens/Appraiser/Auth"
import Notfound from "./Screens/Notfound/Notfound"
// import Details from "./Screens/Homescreen/Details"
import { Democontext } from "./Context/Democontext"
import Loader from "./Components/Loader"

import CircularProgress from "@mui/material/CircularProgress"
import CatchError from "./Screens/CatchError"
import FwdLoanApplications from "./Screens/AppraiserHome/FwdLoanApplications"
import EditLoanFormFwd from "./Screens/AppraiserHome/EditLoanFormFwd"
import AuthBr from "./Screens/BranchManager/AuthBr"
import SigninBr from "./Screens/BranchManager/SigninBr"
import SignupBr from "./Screens/BranchManager/SignupBr"
import ForgotPassBr from "./Screens/BranchManager/ForgotPassBr"
import HomeBr from "./Screens/BranchManagerHome/HomeBr"
import HomeScreenBr from "./Screens/BranchManagerHome/HomeScreenBr"
import EditLoanFormBr from "./Screens/BranchManagerHome/EditLoanFormBr"
import FwdLoanApplicationsBr from "./Screens/BranchManagerHome/FwdLoanApplicationsBr"
import EditLoanFormFwdBr from "./Screens/BranchManagerHome/EditLoanFormFwdBr"
import RejectLoanApplicationsBr from "./Screens/BranchManagerHome/RejectLoanApplicationsBr"
import EditRejectLoanApplicationBr from "./Screens/BranchManagerHome/EditRejectLoanApplicationBr"
const HomeScreen = lazy(() => import("./Screens/AppraiserHome/HomeScreen"))
const Home = lazy(() => import("./Screens/AppraiserHome/Home"))
const EditLoanForm = lazy(() => import("./Screens/AppraiserHome/EditLoanForm"))
const ChooseComp = lazy(() => import("./Screens/Choose/ChooseComp"))
const UserChoose = lazy(() => import("./Screens/Choose/UserChoose"))
const LoanComp = lazy(() => import("./Screens/LoanForm/LoanComp"))
const LoanView = lazy(() => import("./Screens/LoanForm/LoanView"))
const LoanForm = lazy(() => import("./Screens/LoanForm/LoanForm"))
const ForgotPass = lazy(() => import("./Screens/Appraiser/ForgotPass"))
const Signup = lazy(() => import("./Screens/Appraiser/Signup"))
const Signin = lazy(() => import("./Screens/Appraiser/Signin"))

const root = ReactDOM.createRoot(document.getElementById("root"))

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <ChooseComp />,
				children: [
					{
						path: "",
						element: <UserChoose />,
					},
					{
						path: "loan",
						element: <LoanComp />,
						children: [
							{
								path: "loanview",
								element: <LoanView />,
							},
							{
								path: "loanform/:id",
								element: <LoanForm />,
							},
						],
					},
					{
						path: "appraiser",
						element: <Auth />,
						children: [
							{
								path: "",
								element: <Signin />,
							},
							{
								path: "signup",
								element: <Signup />,
							},
							{
								path: "forgotpassword",
								element: <ForgotPass />,
							},
							{
								path: "home",
								element: <Home />,
								children: [
									{
										path: "",
										element: <HomeScreen />,
									},
									{
										path: "editloanform/:id",
										element: <EditLoanForm />,
									},
									{
										path: "fwdapplication",
										element: <FwdLoanApplications />,
									},
									{
										path: "fwdapplication/editloanform/:id",
										element: <EditLoanFormFwd />,
									},
								],
							},
						],
					},
					{
						path: "branchmanager",
						element: <AuthBr />,
						children: [
							{
								path: "",
								element: <SigninBr />,
							},
							{
								path: "signup",
								element: <SignupBr />,
							},
							{
								path: "forgotpassword",
								element: <ForgotPassBr />,
							},
							{
								path: "homebr",
								element: <HomeBr />,
								children: [
									{
										path: "",
										element: <HomeScreenBr />,
									},
									{
										path: "editloanform/:id",
										element: <EditLoanFormBr />,
									},
									{
										path: "fwdapplication",
										element: <FwdLoanApplicationsBr />,
									},
									{
										path: "fwdapplication/editloanform/:id",
										element: <EditLoanFormFwdBr />,
									},
									{
										path: "rejectapplication",
										element: <RejectLoanApplicationsBr />,
									},
									{
										path: "rejectapplication/editloanform/:id",
										element: <EditRejectLoanApplicationBr />,
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
