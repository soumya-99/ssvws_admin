import React, { useState } from "react"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import IMG from "../../Assets/Images/sign_in.png"
import LOGO from "../../Assets/Images/purdcs.png"
import { routePaths } from "../../Assets/Data/Routes"
import VError from "../../Components/VError"
import TDInputTemplate from "../../Components/TDInputTemplate"
import axios from "axios"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { url } from "../../Address/BaseUrl"
import { Message } from "../../Components/Message"
import { motion } from "framer-motion"

function Signin() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	// const [loginUserDetails, setLoginUserDetails] = useState(() => "")

	const initialValues = {
		email: "",
		password: "",
	}

	const onSubmit = async (values) => {
		setLoading(true)
		console.log(values)

		const creds = {
			email: values?.email,
			password: values?.password,
		}
		await axios
			.post(`${url}/sql/user_login`, creds)
			.then((res) => {
				if (res?.data?.suc === 1) {
					Message("success", res?.data?.msg)
					// setLoginUserDetails()

					localStorage.setItem(
						"user_details",
						JSON.stringify(res?.data?.user_dtls)
					)

					navigate(routePaths.HOME_SCREEN)
				} else {
					Message("error", "No user found!")
				}
			})
			.catch((err) => {
				Message("error", "Some error on server while logging in...")
			})

		setLoading(false)
	}
	const validationSchema = Yup.object({
		email: Yup.string()
			.required("Email is required")
			.email("Not a correct a email format"),
		password: Yup.string().required("Password is required"),
	})

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
	})

	return (
		<div className="bg-red-800 p-20 flex justify-center min-h-screen min-w-screen">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, type: "spring" }}
				className="grid grid-cols-2 gap-0 h-auto shadow-lg w-5/6"
			>
				<div className="hidden bg-white sm:block rounded-l-3xl">
					{/* <img className="ml-7 h-full w-full" src={`${IMG}`} alt="" /> */}
				</div>
				<div
					className={`hidden sm:block sm:p-5 col-span-2 sm:col-span-1 
        bg-white h-auto space-y-5 w-full
         sm:rounded-r-3xl
        `}
				>
					<div
						className={`max-w-screen px-16
                flex-col items-center justify-center mt-7
                `}
					>
						<div className="flex-col items-center justify-center ml-7 2xl:ml-36 2xl:mt-44">
							<motion.h2
								className="text-red-800 text-4xl mt-14 ml-24 font-bold"
								initial={{ opacity: 1 }}
								animate={{ opacity: 0, y: -20 }}
								transition={{ delay: 4, type: "tween" }}
							>
								Welcome Appraiser!
							</motion.h2>
							<motion.img
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 4, type: "spring" }}
								src={LOGO}
								className="h-20 -mt-16 -ml-4 sm:ml-9 2xl:ml-7 2xl:h-24"
								alt="Flowbite Logo"
							/>
						</div>

						<form
							onSubmit={formik.handleSubmit}
							className="w-full py-6 sm:ml-10 2xl:space-y-2 2xl:px-8"
						>
							<div className="pt-1 block ">
								<TDInputTemplate
									placeholder="youremail@gmail.com"
									type="email"
									label="Your email"
									name="email"
									formControlName={formik.values.email}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									mode={1}
								/>

								{formik.errors.email && formik.touched.email ? (
									<VError title={formik.errors.email} />
								) : null}
							</div>
							<div className="pt-6 block">
								<TDInputTemplate
									placeholder="*****"
									type="password"
									label="Your password"
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
							<div className="pt-2">
								<Link to={routePaths.FORGOTPASS}>
									<p className="text-xs text-red-800 hover:underline py-2 cursor-pointer">
										Forgot password?
									</p>
								</Link>
							</div>
							<Spin
								indicator={<LoadingOutlined spin />}
								size={5}
								className="text-red-800 w-52 dark:text-gray-400"
								spinning={loading}
							>
								<div className="pt-4 pb-4 flex justify-center text-sm">
									<button
										disabled={!formik.isValid}
										type="submit"
										className="bg-red-800 hover:duration-500 w-full hover:scale-105  text-white p-3 rounded-full"
									>
										Login to your account
									</button>
								</div>
							</Spin>
						</form>
					</div>
				</div>
			</motion.div>
			<div
				className={`block w-80 sm:hidden 
        bg-white h-auto space-y-5
         rounded-3xl
        `}
			>
				<div
					className={`
                flex-col items-center justify-center mt-7 p-10
                `}
				>
					<div className="flex-col items-center justify-center">
						<motion.h2
							className="text-red-800 text-4xl mt-14 mx-24 font-bold"
							initial={{ opacity: 1 }}
							animate={{ opacity: 0, y: -20 }}
							transition={{ delay: 4, type: "tween" }}
						>
							Welcome
						</motion.h2>
						<motion.img
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 4, type: "spring" }}
							src={LOGO}
							className="h-20 -mt-16 -ml-4 sm:ml-9 2xl:ml-7 2xl:h-24"
							alt="Flowbite Logo"
						/>
					</div>

					<form
						onSubmit={formik.handleSubmit}
						className="w-full py-6 sm:ml-10 2xl:space-y-2 2xl:px-8"
					>
						<div className="pt-1 block ">
							<TDInputTemplate
								placeholder="youremail@gmail.com"
								type="email"
								label="Your email"
								name="email"
								formControlName={formik.values.email}
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
								mode={1}
							/>

							{formik.errors.email && formik.touched.email ? (
								<VError title={formik.errors.email} />
							) : null}
						</div>
						<div className="pt-6 block">
							<TDInputTemplate
								placeholder="*****"
								type="password"
								label="Your password"
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
						<div className="pt-2">
							<Link to={routePaths.FORGOTPASS}>
								<p className="text-xs text-green-900 hover:underline py-2 cursor-pointer">
									Forgot password?
								</p>
							</Link>
						</div>
						<Spin
							indicator={<LoadingOutlined spin />}
							size={5}
							className="text-red-800 w-52 dark:text-gray-400"
							spinning={loading}
						>
							<div className="pt-4 pb-4 flex justify-center text-sm">
								<button
									disabled={!formik.isValid}
									type="submit"
									className="bg-red-800 hover:duration-500 w-full hover:scale-105  text-white p-3 rounded-full"
								>
									Login to your account
								</button>
							</div>
						</Spin>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Signin
