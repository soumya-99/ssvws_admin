import React, { useEffect, useState } from "react"
import { Dialog } from "primereact/dialog"
import { useNavigate } from "react-router-dom"
import { Tabs, Button } from "antd"
import ProfileInfo from "./ProfileInfo"
import PasswordComp from "./PasswordComp"
import { routePaths } from "../Assets/Data/Routes"
import "../Styles/styles.css"
import ClientInfo from "./ClientInfo"
import PocInfo from "./PocInfo"
import ProjectInfo from "./ProjectInfo"
import VendorInfo from "./VendorInfo"
import ProdInfo from "./ProdInfo"
import PoPreview from "./Steps/PoPreview"
import TDInputTemplate from "./TDInputTemplate"
import AmendPreview from "./AmendPreview"
import { EditOutlined } from "@ant-design/icons"
import UserProfileUpdateForm from "../Screens/Forms/UserProfileUpdateForm"

const DialogBox = ({
	visible,
	flag,
	onPress,
	data,
	onPressNo,
	onPressYes,
	onEditPress,
}) => {
	const navigate = useNavigate()
	const [po_no, setPoNo] = useState("")
	useEffect(() => {
		setPoNo("")
	}, [])
	console.log(data)
	const onChange = (key) => {
		console.log(key, "onChange")
	}
	const itemsComp = [
		{
			key: "1",
			label: "User profile",
			children: (
				<>
					{/* <ProfileInfo flag={flag} /> */}

					<UserProfileUpdateForm />

					{/* <Button
						className="rounded-full bg-blue-800 text-white mt-10 float-right"
						onClick={() => onEditPress()}
						icon={<EditOutlined />}
					></Button> */}
				</>
			),
		},
		{
			key: "2",
			label: "Change password",
			children: <PasswordComp mode={2} onPress={onPress} />,
		},
	]

	return (
		<Dialog
			closable={flag != 3 ? true : false}
			header={
				<div
					className={
						flag != 1
							? "text-slate-800  font-bold"
							: "text-slate-800  font-bold w-20"
					}
				>
					{flag != 2 &&
					flag != 5 &&
					flag != 6 &&
					flag != 7 &&
					flag != 8 &&
					flag != 9 &&
					flag != 10 &&
					flag != 11
						? "Warning!"
						: flag != 10
						? "Information"
						: "Preview"}
				</div>
			}
			visible={visible}
			maximizable
			style={{
				width: "50vw",
				background: "black",
			}}
			onHide={() => {
				if (!visible) return
				onPress()
			}}
		>
			{flag == 1 && (
				<p className="m-0">
					Do you want to logout?
					<div className="flex justify-center">
						<button
							type="reset"
							onClick={onPress}
							className="inline-flex mr-3 bg-slate-800 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white border border-slate-800 bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
						>
							No
						</button>
						<button
							type="submit"
							onClick={() => {
								localStorage.clear()
								navigate(routePaths.LANDING)
							}}
							className="inline-flex bg-[#DA4167] items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
						>
							Yes
						</button>
					</div>
				</p>
			)}
			{flag == 2 && (
				<Tabs
					defaultActiveKey="1"
					size={"large"}
					animated
					centered
					items={itemsComp}
					onChange={onChange}
				/>
			)}
			{flag == 3 && <PasswordComp mode={3} onPress={onPress} />}
			{flag == 4 && (
				<p className="m-0">
					Are you sure? This action cannot be undone.
					<div className="flex justify-center">
						<button
							type="button"
							onClick={onPressNo}
							className="inline-flex mr-3 bg-slate-800 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white border border-slate-800 bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
						>
							No
						</button>
						<button
							type="button"
							onClick={onPressYes}
							className="inline-flex bg-[#DA4167] items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
						>
							Yes
						</button>
					</div>
				</p>
			)}
			{flag == 5 && (
				<p className="m-0">
				Group with code:{data} is created!
				<div className="flex justify-center">
				<button
							type="button"
							onClick={onPressYes}
							className="inline-flex bg-[#DA4167] items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
						>
							OK
						</button>
				</div>
				</p>
			)}
			
		</Dialog>
	)
}

export default DialogBox
