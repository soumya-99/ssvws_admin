import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import LOGO from "../Assets/Images/inverted.png"
import { Divider } from "@mui/material"
import { Drawer } from "antd"
import { motion } from "framer-motion"
import MenusBr from "./MenusBr"

function Sidebar({ mode = 0 }) {
	const location = useLocation()
	const [current, setCurrent] = React.useState("mail")
	const [theme, setTheme] = useState(localStorage.getItem("col"))
	const paths = location.pathname.split("/")
	const userDetails = JSON.parse(localStorage.getItem("user_details"))
	const [open, setOpen] = useState(false)
	useState(() => {
		setTheme(localStorage.getItem("col"))
	}, [localStorage.getItem("col")])
	useEffect(() => {
		setOpen(false)
	}, [location.pathname])
	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}
	const drawerWidth = 257
   
	return (
		<div className="bg-gray-200 dark:bg-gray-800 ">
			<button
				onClick={showDrawer}
				data-drawer-target="sidebar-multi-level-sidebar"
				data-drawer-toggle="sidebar-multi-level-sidebar"
				aria-controls="sidebar-multi-level-sidebar"
				type="button"
				className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clip-rule="evenodd"
						fill-rule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
			</button>
			<Drawer
				className="md:hidden w-72 p-0"
				placement={"left"}
				closable={true}
				onClose={onClose}
				open={open}
				key={"left"}
			>
				<Divider />
				<MenusBr mode={"vertical"} theme={"light"} />

				<Divider />
			</Drawer>
			<aside
				id="sidebar-multi-level-sidebar"
				className={
					mode === 0
						? "fixed top-0 z-20 left-0 w-full h-auto transition-transform -translate-x-full sm:translate-x-0 p-4 justify-center bg-red-800"
						: mode === 1
						? "fixed top-0 z-20 left-0 w-full h-auto transition-transform -translate-x-full sm:translate-x-0 p-4 justify-center bg-slate-800 shadow-lg"
						: mode === 2
						? "fixed top-0 z-20 left-0 w-full h-auto transition-transform -translate-x-full sm:translate-x-0 p-4 justify-center bg-slate-800 shadow-lg"
						: "fixed top-0 z-20 left-0 w-full h-auto transition-transform -translate-x-full sm:translate-x-0 p-4 justify-center bg-slate-800 shadow-lg"
				}
				aria-label="Sidebar"
			>
				<div className="flex items-center w-full justify-center">
					{/* <div className="flex items-center justify-center p-3 rounded-full">
						<motion.img
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5, type: "spring" }}
							src={LOGO}
							className="h-14 mb-5"
							alt="Flowbite Logo"
						/>
					</div> */}
					<MenusBr />
					{/* <img className='absolute bottom-0 h-40 blur-1' src={sidebar2} alt="Flowbite Logo" /> */}
				</div>
				{/* <motion.img initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5, type:'spring'
              }} src={sidebar1} className="h-14" alt="Flowbite Logo" /> */}
			</aside>

			<div
				className={`w-full p-0.5 py-1 bg-slate-600 text-slate-100 justify-center align-middle
				 font-thin text-sm fixed left-0 top-20 shadow-sm z-10`}
			>
				<div className="mt-2 italic ml-10">
					⇨{" "}
					{userDetails?.id == 1
						? `Credit Officer - ${userDetails?.emp_name} `
						: userDetails?.id == 2
						? `Branch Manager - ${userDetails?.emp_name} `
						: userDetails?.id == 3
						? `MIS Assistant - ${userDetails?.emp_name} `
						: userDetails?.id == 4
						? `Administrator - ${userDetails?.emp_name} `
						:  userDetails?.id == 5
						? `General User - ${userDetails?.emp_name}`
						: userDetails?.id==11?
						`Admin 2 - ${userDetails?.emp_name}`
						:`HO User - ${userDetails?.emp_name} `}

						({userDetails?.branch_name})
				</div>
			</div>
		</div>
	)
}

export default Sidebar
