import React, { useEffect, useState, useRef } from "react"
import "../LoanForm/LoanForm.css"
import "./EditLoanFormMisStyles.css"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import { FieldArray, Formik, useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Message } from "../../Components/Message"
import { url } from "../../Address/BaseUrl"
import { Spin } from "antd"
import {
	LoadingOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
} from "@ant-design/icons"
import FormHeader from "../../Components/FormHeader"
import { routePaths } from "../../Assets/Data/Routes"
import { useLocation } from "react-router"
import Sidebar from "../../Components/Sidebar"
import DialogBox from "../../Components/DialogBox"
import { Stepper } from "primereact/stepper"
import { StepperPanel } from "primereact/stepperpanel"
import { Button } from "primereact/button"
import BasicDetailsForm from "../Forms/BasicDetailsForm"
import OccupationDetailsForm from "../Forms/OccupationDetailsForm"
import HouseholdDetailsForm from "../Forms/HouseholdDetailsForm"
import FamilyMemberDetailsForm from "../Forms/FamilyMemberDetailsForm"

const MAX_FILE_SIZE = 200000

function EditGRTFormMis() {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const memberDetailsData = location.state || {}
	const navigate = useNavigate()

	console.log(params, "params")
	console.log(location, "location")

	const stepperRef = useRef(null)

	return (
		<>
			<Sidebar mode={1} />
			<section className="bg-blue-50 dark:bg-[#001529] flex justify-center align-middle p-5">
				<div className=" bg-white p-5 w-4/5 min-h-screen rounded-3xl">
					<div className="w-auto mx-14 my-4">
						<FormHeader text="Pending GRT Preview & Edit" mode={1} />
					</div>
					<Spin
						indicator={<LoadingOutlined spin />}
						size="large"
						className="text-blue-800 dark:text-gray-400"
						spinning={loading}
					>
						<div className="card">
							<Stepper
								ref={stepperRef}
								style={{ flexBasis: "50rem" }}
								orientation="vertical"
								linear={true}
								className="mx-14"
							>
								<StepperPanel header="Basic Details">
									<div className="flex flex-column">
										<div className="border-2 p-5 border-dashed rounded-3xl surface-border border-round surface-ground flex-auto font-medium">
											<BasicDetailsForm memberDetails={memberDetailsData} />
										</div>
									</div>
									<div className="flex py-4">
										<Button
											className="rounded-full p-5 text-white bg-blue-800 border-blue-800 gap-2 ring-blue-500"
											onClick={() => stepperRef.current.nextCallback()}
										>
											<ArrowRightOutlined />
										</Button>
									</div>
								</StepperPanel>
								<StepperPanel header="Occupation Details">
									<div className="flex flex-column h-12rem">
										<div className="border-2 p-5 border-dashed rounded-3xl surface-border border-round surface-ground flex-auto font-medium">
											<OccupationDetailsForm />
										</div>
									</div>
									<div className="flex py-4 gap-2">
										<Button
											className="rounded-full p-5 text-white bg-red-800 border-red-800 gap-2 ring-red-500"
											onClick={() => stepperRef.current.prevCallback()}
										>
											<ArrowLeftOutlined />
										</Button>
										<Button
											className="rounded-full p-5 text-white bg-blue-800 border-blue-800 gap-2 ring-blue-500"
											onClick={() => stepperRef.current.nextCallback()}
										>
											<ArrowRightOutlined />
										</Button>
									</div>
								</StepperPanel>
								<StepperPanel header="Household Details">
									<div className="flex flex-column h-12rem">
										<div className="border-2 p-5 border-dashed rounded-3xl surface-border border-round surface-ground flex-auto font-medium">
											<HouseholdDetailsForm />
										</div>
									</div>
									<div className="flex py-4 gap-2">
										<Button
											className="rounded-full p-5 text-white bg-red-800 border-red-800 gap-2 ring-red-500"
											onClick={() => stepperRef.current.prevCallback()}
										>
											<ArrowLeftOutlined />
										</Button>
										<Button
											className="rounded-full p-5 text-white bg-blue-800 border-blue-800 gap-2 ring-blue-500"
											onClick={() => stepperRef.current.nextCallback()}
										>
											<ArrowRightOutlined />
										</Button>
									</div>
								</StepperPanel>
								<StepperPanel header="Family Member Details">
									<div className="flex flex-column h-12rem">
										<div className="border-2 p-5 border-dashed rounded-3xl surface-border border-round surface-ground flex-auto font-medium">
											<FamilyMemberDetailsForm
												memberDetails={memberDetailsData}
											/>
										</div>
									</div>
									<div className="flex py-4">
										<Button
											className="rounded-full p-5 text-white bg-red-800 border-red-800 gap-2 ring-red-500"
											onClick={() => stepperRef.current.prevCallback()}
										>
											<ArrowLeftOutlined />
										</Button>
									</div>
								</StepperPanel>
							</Stepper>
						</div>
					</Spin>
				</div>
			</section>

			{/* <DialogBox
				flag={4}
				onPress={() => setVisibleModal(!visibleModal)}
				visible={visibleModal}
				onPressYes={() => {
					if (commentsBranchManager) {
						setVisibleModal(!visibleModal)
						sendToCreditManager("A")
					} else {
						Message("error", "Write Comments.")
						setVisibleModal(!visibleModal)
					}
				}}
				onPressNo={() => {
					setVisibleModal(!visibleModal)
					Message("warning", "User cancelled operation.")
				}}
			/>

			<DialogBox
				flag={4}
				onPress={() => setVisibleModal2(!visibleModal2)}
				visible={visibleModal2}
				onPressYes={(e) => {
					if (commentsBranchManager && creditManagerId) {
						setVisibleModal2(!visibleModal2)
						handleReject("R", e)
					} else {
						Message("error", "Write Comments.")
						setVisibleModal2(!visibleModal2)
					}
				}}
				onPressNo={() => {
					setVisibleModal2(!visibleModal2)
					Message("warning", "User cancelled operation.")
				}}
			/> */}
			{/* <DialogBox
				flag={4}
				onPress={() => setVisibleModal2(!visibleModal2)}
				visible={visibleModal2}
				onPressYes={() => {
					setVisibleModal2(!visibleModal2)
				}}
				onPressNo={() => {
					setVisibleModal2(!visibleModal2)
				}}
			/> */}
		</>
	)
}

export default EditGRTFormMis
