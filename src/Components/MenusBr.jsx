import React, { useState } from "react"
import "./Menus.css"
import {
	BarChartOutlined,
	UserOutlined,
	BarsOutlined,
	LogoutOutlined,
	ArrowRightOutlined,
	MinusCircleOutlined,
	ImportOutlined,
} from "@ant-design/icons"
import { Menu } from "antd"
import { Link } from "react-router-dom"
import { routePaths } from "../Assets/Data/Routes"
import { CheckOutlined, UploadFileOutlined } from "@mui/icons-material"
import IMG from "../Assets/Images/ssvws_crop-round.jpg"
import Tooltip from "@mui/material/Tooltip"
import { useNavigate } from "react-router-dom"
import DialogBox from "./DialogBox"

function MenusBr({ theme }) {
	const userDetails = JSON.parse(localStorage.getItem("user_details"))
	const [current, setCurrent] = React.useState("sub1")
	const [visibleModal, setVisibleModal] = useState(() => false)
	const [visibleModal2, setVisibleModal2] = useState(() => false)

	const navigate = useNavigate()

	const onClick = (e) => {
		console.log("click ", e)
		setCurrent(e.key)
	}

	const items = [
		{
			key: "sub1",
			icon: <ImportOutlined />,
			label: <Link to={"/homemis/"}>Dashboard</Link>,
		},
		// {
		// 	key: "sub2",
		// 	icon: <ImportOutlined />,
		// 	label: "Applications",
		// 	children: [
		// 		{
		// 			key: "sub2",
		// 			icon: <ImportOutlined />,
		// 			label: <Link to={"/homemis/grtappls/"}>GRT Applications</Link>,
		// 		},
		// 	],
		// },
		{
			key: "sub2",
			icon: <ImportOutlined />,
			label: <Link to={"/homemis/grtappls/"}>GRT Applications</Link>,
		},
		{
			label: "Reports",
			key: "sub6",
			icon: <BarsOutlined />,
		},
	]

	const itemsBM = [
		{
			key: "sub1",
			icon: <ImportOutlined />,
			label: <Link to={"/homebm/"}>Dashboard</Link>,
		},
		// {
		// 	key: "sub2",
		// 	icon: <ImportOutlined />,
		// 	label: "Applications",
		// 	children: [
		// 		{
		// 			key: "sub2",
		// 			icon: <ImportOutlined />,
		// 			label: <Link to={"/homebm/grtappls/"}>GRT Applications</Link>,
		// 		},
		// 	],
		// },
		{
			key: "sub2",
			icon: <ImportOutlined />,
			label: <Link to={"/homebm/grtappls/"}>Applications</Link>,
		},
		{
			label: "Reports",
			key: "sub6",
			icon: <BarsOutlined />,
		},
	]

	return (
		<div className="bg-[#EEEEEE44] flex justify-between align-middle gap-4 rounded-full">
			<img src={IMG} className="w-14 h-14 p-2 -mr-6" alt="Flowbite Logo" />
			<Menu
				onClick={onClick}
				selectedKeys={[current]}
				items={userDetails?.id === 3 ? items : itemsBM}
				mode="horizontal"
				style={{
					width: 1000,
					backgroundColor: "transparent",
					border: "none",
				}}
				className="rounded-full items-center justify-center"
			/>
			<div className="flex">
				<Tooltip title="Profile" placement="bottom">
					<button
						onClick={() => setVisibleModal2(!visibleModal2)}
						className="w-10 h-10 bg-yellow-50 flex self-center justify-center items-center rounded-full mr-2"
					>
						<UserOutlined className="text-purple-800 text-lg self-center" />
					</button>
				</Tooltip>
				<Tooltip title="Log Out" placement="bottom">
					<button
						onClick={() => setVisibleModal(!visibleModal)}
						className="w-10 h-10 bg-yellow-50 flex self-center justify-center items-center rounded-full mr-2"
					>
						<LogoutOutlined className="text-purple-800 text-lg self-center" />
					</button>
				</Tooltip>
			</div>
			<DialogBox
				flag={1}
				onPress={() => setVisibleModal(!visibleModal)}
				visible={visibleModal}
			/>
			<DialogBox
				flag={2}
				onPress={() => setVisibleModal2(!visibleModal2)}
				visible={visibleModal2}
			/>
		</div>
	)
}

export default MenusBr
