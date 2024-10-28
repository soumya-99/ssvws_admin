import React, { useState } from "react"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import IMG from "../../Assets/Images/sign_in.png"
import LOGO from "../../Assets/Images/ssvws_logo.jpg"
import { routePaths } from "../../Assets/Data/Routes"
import VError from "../../Components/VError"
import TDInputTemplate from "../../Components/TDInputTemplate"
import axios from "axios"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { url } from "../../Address/BaseUrl"
import { Message } from "../../Components/Message"
import { motion } from "framer-motion"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"

function SigninMis() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	// const [loginUserDetails, setLoginUserDetails] = useState(() => "")

	const initialValues = {
		user_id: "",
		password: "",
	}

	const onSubmit = async (values) => {
		setLoading(true)
		console.log(values)

		const creds = {
			emp_id: values?.user_id,
			password: values?.password,
		}

		await axios
			.post(`${url}/login_app`, creds)
			.then((res) => {
				if (res?.data?.suc === 1) {
					// Message("success", res?.data?.msg)
					// setLoginUserDetails()

					localStorage.setItem(
						"user_details",
						JSON.stringify(res?.data?.user_dtls)
					)

					if (res?.data?.user_dtls?.id == 1) {
						navigate(routePaths.CO_HOME)
					}

					if (res?.data?.user_dtls?.id == 2) {
						navigate(routePaths.BM_HOME)
					}

					if (res?.data?.user_dtls?.id == 3) {
						navigate(routePaths.MIS_ASSISTANT_HOME)
					}
				} else if (res?.data?.suc === 0) {
					Message("error", res?.data?.msg)
				} else {
					Message("error", "No user found!")
				}
			})
			.catch((err) => {
				console.log("PPPPPPPPP", err)
				Message("error", "Some error on server while logging in...")
			})

		setLoading(false)
	}
	const validationSchema = Yup.object({
		user_id: Yup.string().required("User ID is required"),
		password: Yup.string().required("Password is required"),
	})

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
	})

	return (
		<div className="bg-blue-800 p-20 flex justify-center min-h-screen min-w-screen">
			<div className="bg-white p-44 rounded-3xl flex flex-col gap-8 justify-center items-center">
				<div className="absolute top-32">
					<motion.img
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1, type: "spring" }}
						src={LOGO}
						className="h-20"
						alt="Flowbite Logo"
					/>
				</div>
				<div className="text-4xl text-center font-thin text-blue-800">
					LOGIN
				</div>

				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col justify-center items-center gap-5"
				>
					<div
						style={{
							width: 280,
						}}
					>
						<TDInputTemplateBr
							placeholder="Type employee id..."
							type="text"
							label="Employee ID"
							name="user_id"
							formControlName={formik.values.user_id}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							mode={1}
						/>
						{formik.errors.user_id && formik.touched.user_id ? (
							<VError title={formik.errors.user_id} />
						) : null}
					</div>
					<div
						style={{
							width: 280,
						}}
					>
						<TDInputTemplateBr
							placeholder="*****"
							type="password"
							label="Password"
							name="password"
							formControlName={formik.values.password}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							mode={1}
						/>
						{formik.errors.password && formik.touched.password ? (
							<VError title={formik.errors.password} />
						) : null}
					</div>
					<div
						className="pt-2 flex justify-between gap-5"
						style={{
							width: 280,
						}}
					>
						<Link to={routePaths.SIGN_UP}>
							<p className="text-sm text-blue-800 hover:underline py-2 cursor-pointer">
								Sign Up
							</p>
						</Link>
						<Link to={routePaths.FORGOTPASS}>
							<p className="text-sm text-blue-800 hover:underline py-2 cursor-pointer">
								Forgot password?
							</p>
						</Link>
					</div>
					<Spin
						indicator={<LoadingOutlined spin />}
						size={5}
						className="text-blue-800 w-52 dark:text-gray-400"
						spinning={loading}
					>
						<div
							className="pt-4 pb-4 flex justify-center text-sm"
							style={{
								width: 280,
							}}
						>
							<button
								disabled={!formik.isValid}
								type="submit"
								className="bg-blue-800 hover:duration-500 w-full hover:scale-105 text-white p-3 rounded-full"
							>
								Sign In
							</button>
						</div>
					</Spin>
				</form>
			</div>
		</div>
	)
}

export default SigninMis
