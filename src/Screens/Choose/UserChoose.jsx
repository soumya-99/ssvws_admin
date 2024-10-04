import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import IMG from "../../Assets/Images/puri_flyer.jpg"
import LOGO from "../../Assets/Images/ssvws_logo.jpg"
import { motion } from "framer-motion"
import { routePaths } from "../../Assets/Data/Routes"
import { DollarOutlined, UserOutlined } from "@ant-design/icons"

function UserChoose() {
	const navigate = useNavigate()

	return (
		<div
			className="bg-red-800 p-20 flex justify-center min-h-screen min-w-screen"
			style={{
				backgroundImage: `url(${IMG})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, type: "spring" }}
				className="grid grid-cols-2 gap-0 h-auto w-4/5"
			>
				<div className="sm:p-5 rounded-l-3xl border-white border--0 bg-gradient-to-r from-red-50 from-10% via-gray-50 via-70% to-[#ffffff8c] to-90% flex flex-col justify-around align-middle">
					<div className="h-auto w-auto rounded-3xl p-10 flex flex-col justify-center align-middle items-center bg-transparent">
						<div
							className="p-10 mx-auto mt-6 flex flex-col justify-center align-middle items-center rounded-3xl shadow-md"
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.25)",
								backdropFilter: "blur(8px)",
							}}
						>
							<img src={LOGO} className="w-40 mb-14" />
							<div className="text-4xl font-bold text-red-700">S S V W S</div>
							<div className="text-xl font-semibold text-blue-500">
								Sripur Swami Vivekananda Welfare Society
							</div>
						</div>
					</div>
					{/* <div className="h-auto w-auto bg-transparent rounded-3xl p-10 flex flex-col justify-center align-middle items-center bg-red-400">
						<img src={LOGO} className="h-40 w-40" />
						<div>PURDCS - Puri Urban and Rural Development Credit Society</div>
					</div> */}
				</div>
				<div
					className={`sm:p-5 sm:rounded-r-3xl border-white border-l-0 border-2 w-auto h-auto grid grid-cols-2 place-items-center`}
					style={{
						backgroundColor: "rgba(255, 255, 255, 0.55)",
						backdropFilter: "blur(8px)",
						// display: "flex",
						// justifyContent: "space-evenly",
						// alignItems: "center",
						// flexDirection: "column",
					}}
				>
					{/* <div>
						<Link to={routePaths.LOAN_FORM + "0"}>
							<div
								className="h-48 w-48 self-center bg-[#6457A6] rounded-full p-1 text-white text-xl"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
									gap: 10,
								}}
							>
								<DollarOutlined className="text-3xl" />
								<div>Loan Form</div>
							</div>
						</Link>
					</div> */}
					{/* <div>
						<Link to={routePaths.APPRAISER_LOGIN}>
							<div
								className="h-48 w-48 self-center bg-red-800 rounded-full p-1 text-white text-wrap text-xl"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
									gap: 10,
								}}
							>
								<UserOutlined className="text-3xl" />
								<div>Appraiser Login</div>
							</div>
						</Link>
					</div> */}
					<div>
						<Link to={routePaths.MIS_ASSISTANT_LOGIN}>
							<div
								className="h-48 w-48 self-center bg-blue-800 rounded-full p-1 text-white text-center text-wrap text-xl"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
									gap: 10,
								}}
							>
								<UserOutlined className="text-3xl self-center" />
								<div>MIS Assistant</div>
							</div>
						</Link>
					</div>
					{/* <div>
						<Link to={routePaths.CREDIT_MANAGER_LOGIN}>
							<div
								className="h-48 w-48 self-center bg-teal-700 rounded-full p-1 text-white text-center text-wrap text-xl"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
									gap: 10,
								}}
							>
								<UserOutlined className="text-3xl self-center" />
								<div>Credit Manager Login</div>
							</div>
						</Link>
					</div>
					<div>
						<Link to={routePaths.CEO_LOGIN}>
							<div
								className="h-48 w-48 self-center bg-slate-700 rounded-full p-1 text-white text-center text-wrap text-xl"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
									gap: 10,
								}}
							>
								<UserOutlined className="text-3xl self-center" />
								<div>CEO Login</div>
							</div>
						</Link>
					</div> */}
				</div>
			</motion.div>

			{/* Mobile View */}
			{/* <div className={`block w-80 sm:hidden h-auto space-y-5 rounded-3xl`}>
				<div className={`flex-col items-center justify-center mt-7 p-10`}>
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

					<div>Login form template mobile was here...</div>
				</div>
			</div> */}
		</div>
	)
}

export default UserChoose
