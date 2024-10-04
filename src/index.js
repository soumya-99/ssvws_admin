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
import EditLoanFormMis from "./Screens/MISAssistantHome/EditLoanFormMis"
// import FwdLoanApplications from "./Screens/AppraiserHome/FwdLoanApplications"
// import EditLoanFormFwd from "./Screens/AppraiserHome/EditLoanFormFwd"

// import AuthBr from "./Screens/BranchManager/AuthBr"
// import SigninBr from "./Screens/BranchManager/SigninBr"
// import SignupBr from "./Screens/BranchManager/SignupBr"
// import ForgotPassBr from "./Screens/BranchManager/ForgotPassBr"
// import HomeBr from "./Screens/BranchManagerHome/HomeBr"
// import HomeScreenBr from "./Screens/BranchManagerHome/HomeScreenBr"
// import EditLoanFormBr from "./Screens/BranchManagerHome/EditLoanFormBr"
// import AuthCr from "./Screens/CreditManager/AuthCr"
// import SigninCr from "./Screens/CreditManager/SigninCr"
// import SignupCr from "./Screens/CreditManager/SignupCr"
// import ForgotPassCr from "./Screens/CreditManager/ForgotPassCr"
// import HomeCr from "./Screens/CreditManagerHome/HomeCr"
// import HomeScreenCr from "./Screens/CreditManagerHome/HomeScreenCr"
// import EditLoanFormCr from "./Screens/CreditManagerHome/EditLoanFormCr"
// import AuthCeo from "./Screens/CEO/AuthCeo"
// import SigninCeo from "./Screens/CEO/SigninCeo"
// import SignupCeo from "./Screens/CEO/SignupCeo"
// import ForgotPassCeo from "./Screens/CEO/ForgotPassCeo"
// import HomeCeo from "./Screens/CEOHome/HomeCeo"
// import HomeScreenCeo from "./Screens/CEOHome/HomeScreenCeo"
// import EditLoanFormCeo from "./Screens/CEOHome/EditLoanFormCeo"

// const AuthBr = lazy(() => import("./Screens/BranchManager/AuthBr"))
// const SigninBr = lazy(() => import("./Screens/BranchManager/SigninBr"))
// const SignupBr = lazy(() => import("./Screens/BranchManager/SignupBr"))
// const ForgotPassBr = lazy(() => import("./Screens/BranchManager/ForgotPassBr"))
// const HomeBr = lazy(() => import("./Screens/BranchManagerHome/HomeBr"))
// const HomeScreenBr = lazy(() =>
// 	import("./Screens/BranchManagerHome/HomeScreenBr")
// )
// const EditLoanFormBr = lazy(() =>
// 	import("./Screens/BranchManagerHome/EditLoanFormBr")
// )

// const AuthCr = lazy(() => import("./Screens/CreditManager/AuthCr"))
// const SigninCr = lazy(() => import("./Screens/CreditManager/SigninCr"))
// const SignupCr = lazy(() => import("./Screens/CreditManager/SignupCr"))
// const ForgotPassCr = lazy(() => import("./Screens/CreditManager/ForgotPassCr"))
// const HomeCr = lazy(() => import("./Screens/CreditManagerHome/HomeCr"))
// const HomeScreenCr = lazy(() =>
// 	import("./Screens/CreditManagerHome/HomeScreenCr")
// )
// const EditLoanFormCr = lazy(() =>
// 	import("./Screens/CreditManagerHome/EditLoanFormCr")
// )

// const AuthCeo = lazy(() => import("./Screens/CEO/AuthCeo"))
// const SigninCeo = lazy(() => import("./Screens/CEO/SigninCeo"))
// const SignupCeo = lazy(() => import("./Screens/CEO/SignupCeo"))
// const ForgotPassCeo = lazy(() => import("./Screens/CEO/ForgotPassCeo"))
// const HomeCeo = lazy(() => import("./Screens/CEOHome/HomeCeo"))
// const HomeScreenCeo = lazy(() => import("./Screens/CEOHome/HomeScreenCeo"))
// const EditLoanFormCeo = lazy(() => import("./Screens/CEOHome/EditLoanFormCeo"))

// import FwdLoanApplicationsBr from "./Screens/BranchManagerHome/FwdLoanApplicationsBr"
// import EditLoanFormFwdBr from "./Screens/BranchManagerHome/EditLoanFormFwdBr"
// import RejectLoanApplicationsBr from "./Screens/BranchManagerHome/RejectLoanApplicationsBr"
// import EditRejectLoanApplicationBr from "./Screens/BranchManagerHome/EditRejectLoanApplicationBr"
// const HomeScreen = lazy(() => import("./Screens/AppraiserHome/HomeScreen"))
// const Home = lazy(() => import("./Screens/AppraiserHome/Home"))
// const EditLoanForm = lazy(() => import("./Screens/AppraiserHome/EditLoanForm"))
const ChooseComp = lazy(() => import("./Screens/Choose/ChooseComp"))
const UserChoose = lazy(() => import("./Screens/Choose/UserChoose"))
// const LoanComp = lazy(() => import("./Screens/LoanForm/LoanComp"))
// const LoanView = lazy(() => import("./Screens/LoanForm/LoanView"))
// const LoanForm = lazy(() => import("./Screens/LoanForm/LoanForm"))
// const ForgotPass = lazy(() => import("./Screens/Appraiser/ForgotPass"))
// const Signup = lazy(() => import("./Screens/Appraiser/Signup"))
// const Signin = lazy(() => import("./Screens/Appraiser/Signin"))

const root = ReactDOM.createRoot(document.getElementById("root"))

window.addEventListener("beforeunload", (ev) => {
	ev.preventDefault()

	localStorage.clear()
})

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
					// {
					// 	path: "loan",
					// 	element: <LoanComp />,
					// 	children: [
					// 		{
					// 			path: "loanview",
					// 			element: <LoanView />,
					// 		},
					// 		{
					// 			path: "loanform/:id",
					// 			element: <LoanForm />,
					// 		},
					// 	],
					// },
					// {
					// 	path: "appraiser",
					// 	element: <Auth />,
					// 	children: [
					// 		{
					// 			path: "",
					// 			element: <Signin />,
					// 		},
					// 		{
					// 			path: "signup",
					// 			element: <Signup />,
					// 		},
					// 		{
					// 			path: "forgotpassword",
					// 			element: <ForgotPass />,
					// 		},
					// 		{
					// 			path: "home",
					// 			element: <Home />,
					// 			children: [
					// 				{
					// 					path: "",
					// 					element: <HomeScreen />,
					// 				},
					// 				{
					// 					path: "editloanform/:id",
					// 					element: <EditLoanForm />,
					// 				},
					// 				// {
					// 				// 	path: "fwdapplication",
					// 				// 	element: <FwdLoanApplications />,
					// 				// },
					// 				// {
					// 				// 	path: "fwdapplication/editloanform/:id",
					// 				// 	element: <EditLoanFormFwd />,
					// 				// },
					// 			],
					// 		},
					// 	],
					// },
					{
						path: "misassistant",
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
										element: <HomeScreenMis />,
									},
									{
										path: "editloanform/:id",
										element: <EditLoanFormMis />,
									},
									// {
									// 	path: "fwdapplication",
									// 	element: <FwdLoanApplicationsBr />,
									// },
									// {
									// 	path: "fwdapplication/editloanform/:id",
									// 	element: <EditLoanFormFwdBr />,
									// },
									// {
									// 	path: "rejectapplication",
									// 	element: <RejectLoanApplicationsBr />,
									// },
									// {
									// 	path: "rejectapplication/editloanform/:id",
									// 	element: <EditRejectLoanApplicationBr />,
									// },
								],
							},
						],
					},
					// {
					// 	path: "creditmanager",
					// 	element: <AuthCr />,
					// 	children: [
					// 		{
					// 			path: "",
					// 			element: <SigninCr />,
					// 		},
					// 		{
					// 			path: "signup",
					// 			element: <SignupCr />,
					// 		},
					// 		{
					// 			path: "forgotpassword",
					// 			element: <ForgotPassCr />,
					// 		},
					// 		{
					// 			path: "homecr",
					// 			element: <HomeCr />,
					// 			children: [
					// 				{
					// 					path: "",
					// 					element: <HomeScreenCr />,
					// 				},
					// 				{
					// 					path: "editloanform/:id",
					// 					element: <EditLoanFormCr />,
					// 				},
					// 			],
					// 		},
					// 	],
					// },
					// {
					// 	path: "ceo",
					// 	element: <AuthCeo />,
					// 	children: [
					// 		{
					// 			path: "",
					// 			element: <SigninCeo />,
					// 		},
					// 		{
					// 			path: "signup",
					// 			element: <SignupCeo />,
					// 		},
					// 		{
					// 			path: "forgotpassword",
					// 			element: <ForgotPassCeo />,
					// 		},
					// 		{
					// 			path: "homeceo",
					// 			element: <HomeCeo />,
					// 			children: [
					// 				{
					// 					path: "",
					// 					element: <HomeScreenCeo />,
					// 				},
					// 				{
					// 					path: "editloanform/:id",
					// 					element: <EditLoanFormCeo />,
					// 				},
					// 			],
					// 		},
					// 	],
					// },

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
