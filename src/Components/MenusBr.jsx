import React, { useState } from "react"
import "./Menus.css"
import {
	BarChartOutlined,
	UserOutlined,
	BarsOutlined,
	LogoutOutlined,
	ImportOutlined,
	LineChartOutlined,
	ContainerOutlined,
	FileSearchOutlined,
	SearchOutlined,
	DeploymentUnitOutlined,
	PlusCircleOutlined,
	ThunderboltOutlined,
	CheckCircleOutlined,
	DatabaseOutlined,
	EyeOutlined,
	UserAddOutlined,
	SettingOutlined,
	FastForwardOutlined,
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
		// {
		// 	key: "sub5",
		// 	icon: <DatabaseOutlined />,
		// 	label: "Master",
		// 	children: [
		// 		{
		// 			key: "sub5-1",
		// 			icon: <DatabaseOutlined />,
		// 			label: <Link to={"/homebm/masterbanks"}>Banks</Link>,
		// 		},
		// 		{
		// 			key: "sub5-2",
		// 			icon: <DatabaseOutlined />,
		// 			label: <Link to={"/homebm/masteremployees"}>Employees</Link>,
		// 		},
		// 		// {
		// 		// 	key: "sub4-2",
		// 		// 	icon: <CheckCircleOutlined />,
		// 		// 	label: (
		// 		// 		<Link to={"/homebm/disburseloanapprove"}>Disbursement Approve</Link>
		// 		// 	),
		// 		// },
		// 		// {
		// 		// 	key: "sub3-3",
		// 		// 	icon: <SubnodeOutlined />,
		// 		// 	label: <Link to={"/homebm/assignmember"}>Assign Member</Link>,
		// 		// },
		// 	],
		// },
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
		{
			key: "sub_att",
			icon: <ImportOutlined />,
			label: "Attendance",
			children: [
				{
					key: "sub4-1",
					icon: <UserAddOutlined />,
					label: (
						<Link to={"/homebm/attendancebm"}>
							Attendance Dashboard
						</Link>
					),
				},
			],
		},
		{
			key: "sub4",
			icon: <ThunderboltOutlined />,
			label: "Loans",
			children: [
				{
					key: "sub4-1",
					icon: <ThunderboltOutlined />,
					label: <Link to={"/homebm/disburseloan"}>Disburse Loan</Link>,
				},
				// {
				// 	key: "sub4-2",
				// 	icon: <CheckCircleOutlined />,
				// 	label: <Link to={"/homebm/approveloan"}>Approve Transaction</Link>,
				// },
				{
					key: "sub4-2",
					icon: <CheckCircleOutlined />,
					label: "Approve Transaction",
					children: [
						{
							key: "sub4-2-1",
							icon: <CheckCircleOutlined />,
							label: <Link to={"/homebm/approvedisbursed"}>Disburse</Link>,
						},
						{
							key: "sub4-2-2",
							icon: <CheckCircleOutlined />,
							label: <Link to={"/homebm/approveloan"}>Recovery</Link>,
						},
					],
				},
				{
					key: "sub4-3",
					icon: <EyeOutlined />,
					label: <Link to={"/homebm/viewloan"}>View Loan</Link>,
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
		// reports to be enabled later

		{
			label: "Reports",
			key: "sub6",
			icon: <BarsOutlined />,
			children: [
				// {
				// 	key: "sub6-1",
				// 	icon: <BarChartOutlined />,
				// 	label: (
				// 		<Link to={"/homebm/memberwiserecoveryreport"}>
				// 			Memberwise Recovery
				// 		</Link>
				// 	),
				// },
				// {
				// 	key: "sub6-2",
				// 	icon: <BarChartOutlined />,
				// 	label: (
				// 		<Link to={"/homebm/groupwiserecoveryreport"}>
				// 			Groupwise Recovery
				// 		</Link>
				// 	),
				// },
				// {
				// 	key: "sub6-3",
				// 	icon: <BarChartOutlined />,
				// 	label: <Link to={"/homebm/demandreport"}>Demand</Link>,
				// },
				{
					key: "sub6-4",
					icon: <BarChartOutlined />,
					label: <Link to={"/homebm/loanstatements"}>Loan Statements</Link>,
				},
				{
					key: "sub6-5",
					icon: <BarChartOutlined />,
					label: <Link to={"/homebm/loantxns"}>Loan Transactions</Link>,
				},
				{
					key: "sub6-6",
					icon: <BarChartOutlined />,
					label: <Link to={"/homebm/demandreport"}>Demand Report</Link>,
				},
				{
					key: "sub6-7",
					icon: <BarChartOutlined />,
					label: (
						<Link to={"/homebm/outstasndingreport"}>Outstanding Report</Link>
					),
				},
				// {
				// 	key: "sub6-8",
				// 	icon: <BarChartOutlined />,
				// 	label: <Link to={"/homebm/summaryreports"}>Summary Reports</Link>,
				// 	children: [
				// 		{
				// 			key: "sub6-8-1",
				// 			icon: <BarChartOutlined />,
				// 			label: (
				// 				<Link to={"/homebm/summaryreports/fundwise"}>
				// 					Fundwise Report
				// 				</Link>
				// 			),
				// 		},
				// 		{
				// 			key: "sub6-8-2",
				// 			icon: <BarChartOutlined />,
				// 			label: (
				// 				<Link to={"/homebm/summaryreports/schemewise"}>
				// 					Schemewise Report
				// 				</Link>
				// 			),
				// 		},
				// 	],
				// },
				{
					key: "sub6-8",
					icon: <BarChartOutlined />,
					label: <Link to={"/homebm/fundwisesummary"}>Fundwise Report</Link>,
				},
				{
					key: "sub6-9",
					icon: <BarChartOutlined />,
					label: (
						<Link to={"/homebm/schemewisesummary"}>Schemewise Report</Link>
					),
				},
				{
					key: "sub6-10",
					icon: <BarChartOutlined />,
					label: (
						<Link to={"/homebm/demandvscollectionreport"}>
							Demand vs. Collection
						</Link>
					),
				},
			],
		},
		{
			/* ===========================to be enabled================= */
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

		{
			key: "sub4",
			icon: <ThunderboltOutlined />,
			label: "Loans",
			children: [
				{
					key: "sub4-1",
					icon: <ThunderboltOutlined />,
					label: <Link to={"/homeco/disburseloan"}>Disburse Loan</Link>,
				},
				// {
				// 	key: "sub4-2",
				// 	icon: <CheckCircleOutlined />,
				// 	label: (
				// 		<Link to={"/homeco/editgroupform/0"}>Disbursement Approve</Link>
				// 	),
				// },
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

	const itemsAdmin = [
		{
			key: "sub1",
			icon: <LineChartOutlined />,
			label: <Link to={"/homeadmin/"}>Dashboard</Link>,
		},
		{
			key: "sub5",
			icon: <DatabaseOutlined />,
			label: "Master",
			children: [
				{
					key: "sub5-1",
					icon: <DatabaseOutlined />,
					label: <Link to={"/homeadmin/masterbanks"}>Banks</Link>,
				},
				{
					key: "sub5-2",
					icon: <DatabaseOutlined />,
					label: <Link to={"/homeadmin/masteremployees"}>Employees</Link>,
				},
			],
		},
		{
			key: "sub2",
			icon: <ImportOutlined />,
			label: "User Management",
			children: [
				{
					key: "sub2-1",
					icon: <UserAddOutlined />,
					label: <Link to={"/homeadmin/createuser/0"}>Create User</Link>,
				},
				{
					key: "sub2-2",
					icon: <SettingOutlined />,
					label: <Link to={"/homeadmin/manageuser/"}>Manage User</Link>,
				},
				{
					key: "sub2-3",
					icon: <FastForwardOutlined />,
					label: <Link to={"/homeadmin/transferuser/0"}>Transfer User</Link>,
				},
			],
		},
		{
			key: "sub4",
			icon: <ImportOutlined />,
			label: "Attendance",
			children: [
				{
					key: "sub4-1",
					icon: <UserAddOutlined />,
					label: (
						<Link to={"/homeadmin/attendancedashboard"}>
							Attendance Dashboard
						</Link>
					),
				},
			],
		},
		{
			label: "Reports",
			key: "sub3",
			icon: <BarsOutlined />,
			children: [
				{
					key: "sub3-4",
					icon: <BarChartOutlined />,
					label: <Link to={"/homeadmin/loanstatements"}>Loan Statements</Link>,
				},
				{
					key: "sub3-5",
					icon: <BarChartOutlined />,
					label: <Link to={"/homeadmin/loantxns"}>Loan Transactions</Link>,
				},
				{
					key: "sub3-6",
					icon: <BarChartOutlined />,
					label: <Link to={"/homeadmin/demandreport"}>Demand Report</Link>,
				},
				{
					key: "sub3-7",
					icon: <BarChartOutlined />,
					label: (
						<Link to={"/homeadmin/outstasndingreport"}>Outstanding Report</Link>
					),
				},
				// {
				// 	key: "sub3-8",
				// 	icon: <BarChartOutlined />,
				// 	label: <Link to={"/homeadmin/summaryreports"}>Summary Reports</Link>,
				// 	children: [
				// 		{
				// 			key: "sub3-8-1",
				// 			icon: <BarChartOutlined />,
				// 			label: (
				// 				<Link to={"/homeadmin/summaryreports/fundwise"}>
				// 					Fundwise Report
				// 				</Link>
				// 			),
				// 		},
				// 		{
				// 			key: "sub3-8-2",
				// 			icon: <BarChartOutlined />,
				// 			label: (
				// 				<Link to={"/homeadmin/summaryreports/schemewise"}>
				// 					Schemewise Report
				// 				</Link>
				// 			),
				// 		},
				// 	],
				// },
				{
					key: "sub3-8",
					icon: <BarChartOutlined />,
					label: <Link to={"/homeadmin/fundwisesummary"}>Fundwise Report</Link>,
				},
				{
					key: "sub3-9",
					icon: <BarChartOutlined />,
					label: (
						<Link to={"/homeadmin/schemewisesummary"}>Schemewise Report</Link>
					),
				},
				{
					key: "sub3-10",
					icon: <BarChartOutlined />,
					label: (
						<Link to={"/homeadmin/demandvscollectionreport"}>
							Demand vs. Collection
						</Link>
					),
				},
			],
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
						: userDetails?.id === 4
						? itemsAdmin
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
						className="w-10 h-10 bg-[#DA4167] text-slate-50 flex self-center justify-center items-center rounded-full mr-2"
					>
						<UserOutlined className="text-slate-50 text-lg self-center" />
					</button>
				</Tooltip>
				<Tooltip title="Log Out" placement="bottom">
					<button
						onClick={() => setVisibleModal(!visibleModal)}
						className="w-10 h-10 bg-teal-500 flex self-center justify-center items-center rounded-full mr-2"
					>
						<LogoutOutlined className="text-slate-50 text-lg self-center" />
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
