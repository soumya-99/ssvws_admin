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
	LineChartOutlined,
	ContainerOutlined,
	FileSearchOutlined,
	SearchOutlined,
	DeploymentUnitOutlined,
	PlusCircleOutlined,
	SubnodeOutlined,
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
			icon: <LineChartOutlined />,
			label: <Link to={"/homemis/"}>Dashboard</Link>,
		},
		{
			key: "sub2",
			icon: <ContainerOutlined />,
			label: "Members",
			children: [
				{
					key: "sub2-1",
					icon: <ContainerOutlined />,
					label: <Link to={"/homemis/grtappls/"}>Applications</Link>,
				},
				{
					key: "sub2-2",
					icon: <SearchOutlined />,
					label: <Link to={"/homemis/searchform/"}>Search Form</Link>,
				},
				{
					key: "sub2-4",
					icon: <FileSearchOutlined />,
					label: <Link to={"/homemis/searchmember/"}>Search Member</Link>,
				},
			],
		},
		// {
		// 	key: "sub3",
		// 	icon: <DeploymentUnitOutlined />,
		// 	label: "Groups",
		// 	children: [
		// 		{
		// 			key: "sub3-1",
		// 			icon: <FileSearchOutlined />,
		// 			label: <Link to={"/homemis/searchgroup/"}>Search Group</Link>,
		// 		},
		// 		{
		// 			key: "sub3-2",
		// 			icon: <PlusCircleOutlined />,
		// 			label: <Link to={"/homemis/editgroupform/0"}>Add Group</Link>,
		// 		},
		// 		{
		// 			key: "sub3-3",
		// 			icon: <SubnodeOutlined />,
		// 			label: <Link to={"/homemis/assignmember"}>Assign Member</Link>,
		// 		},
		// 	],
		// },
		{
			label: "Reports",
			key: "sub6",
			icon: <BarsOutlined />,
		},
	]

	const itemsBM = [
		{
			key: "sub1",
			icon: <LineChartOutlined />,
			label: <Link to={"/homebm/"}>Dashboard</Link>,
		},
		{
			key: "sub2",
			icon: <ImportOutlined />,
			label: "Members",
			children: [
				{
					key: "sub2-1",
					icon: <ContainerOutlined />,
					label: <Link to={"/homebm/grtappls/"}>Applications</Link>,
				},
				{
					key: "sub2-2",
					icon: <SearchOutlined />,
					label: <Link to={"/homebm/searchform/"}>Search Form</Link>,
				},
				// {
				// 	key: "sub2-3",
				// 	icon: <FileSearchOutlined />,
				// 	label: <Link to={"/homebm/searchgroup/"}>Search Group</Link>,
				// },
			],
		},

		{
			key: "sub3",
			icon: <DeploymentUnitOutlined />,
			label: "Groups",
			children: [
				{
					key: "sub3-1",
					icon: <FileSearchOutlined />,
					label: <Link to={"/homebm/searchgroup/"}>Search Group</Link>,
				},
				{
					key: "sub3-2",
					icon: <PlusCircleOutlined />,
					label: <Link to={"/homebm/editgroupform/0"}>Add Group</Link>,
				},
				// {
				// 	key: "sub3-3",
				// 	icon: <SubnodeOutlined />,
				// 	label: <Link to={"/homebm/assignmember"}>Assign Member</Link>,
				// },
			],
		},
		// {
		// 	key: "sub2",
		// 	icon: <ImportOutlined />,
		// 	label: <Link to={"/homebm/grtappls/"}>GRT Applications</Link>,
		// },
		{
			label: "Reports",
			key: "sub6",
			icon: <BarsOutlined />,
		},
	]

	const itemsCO = [
		{
			key: "sub1",
			icon: <LineChartOutlined />,
			label: <Link to={"/homeco/"}>Dashboard</Link>,
		},
		{
			key: "sub2",
			icon: <ImportOutlined />,
			label: "Members",
			children: [
				{
					key: "sub2-1",
					icon: <ContainerOutlined />,
					label: <Link to={"/homeco/grtappls/"}>Applications</Link>,
				},
				{
					key: "sub2-2",
					icon: <SearchOutlined />,
					label: <Link to={"/homeco/searchform/"}>Search Form</Link>,
				},
				// {
				// 	key: "sub2-3",
				// 	icon: <FileSearchOutlined />,
				// 	label: <Link to={"/homeco/searchgroup/"}>Search Group</Link>,
				// },
			],
		},

		{
			key: "sub3",
			icon: <DeploymentUnitOutlined />,
			label: "Groups",
			children: [
				{
					key: "sub3-1",
					icon: <FileSearchOutlined />,
					label: <Link to={"/homeco/searchgroup/"}>Search Group</Link>,
				},
				{
					key: "sub3-2",
					icon: <PlusCircleOutlined />,
					label: <Link to={"/homeco/editgroupform/0"}>Add Group</Link>,
				},
				// {
				// 	key: "sub3-3",
				// 	icon: <SubnodeOutlined />,
				// 	label: <Link to={"/homeco/assignmember"}>Assign Member</Link>,
				// },
			],
		},
		// {
		// 	key: "sub2",
		// 	icon: <ImportOutlined />,
		// 	label: <Link to={"/homebm/grtappls/"}>GRT Applications</Link>,
		// },
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
				items={
					userDetails?.id === 3
						? items
						: userDetails?.id === 2
						? itemsBM
						: itemsCO
				}
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
