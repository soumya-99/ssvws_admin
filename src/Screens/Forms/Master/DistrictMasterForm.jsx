import React, { useEffect, useState } from "react"
import "../../LoanForm/LoanForm.css"
import { useParams } from "react-router"
import BtnComp from "../../../Components/BtnComp"
import VError from "../../../Components/VError"
import { useNavigate } from "react-router-dom"
// import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Message } from "../../../Components/Message"
import { url } from "../../../Address/BaseUrl"
import { Badge, Spin, Card } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useLocation } from "react-router"
import TDInputTemplateBr from "../../../Components/TDInputTemplateBr"
import { formatDateToYYYYMMDD } from "../../../Utils/formateDate"
import DialogBox from "../../../Components/DialogBox"
// import { disableInputArray } from "./disableInputArray"
import { disableCondition } from "../disableCondition"

function DistrictMasterForm() {
	const params = useParams()

	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const masterDetails = location.state || {}

	const navigate = useNavigate()
	const userDetails = JSON.parse(localStorage.getItem("user_details"))

	const [visible, setVisible] = useState(() => false)

	console.log(params, "params")
	console.log(location, "location")
	const [states, setStates] = useState(() => [])

	const [masterData, setMasterData] = useState({
		state_id: "",
		district_name: "",
	})

	const handleChangeForm = (e) => {
		const { name, value } = e.target
		setMasterData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	useEffect(() => {
		setMasterData({
			state_id: masterDetails?.state_id || "",
			district_name: masterDetails?.dist_name || "",
		})
	}, [])

	const fetchStates = async () => {
		setLoading(true)
		await axios
			.get(`${url}/admin/get_states`)
			.then((res) => {
				console.log("STATESSS ------------------", res?.data)
				setStates(res?.data?.msg)
			})
			.catch((err) => {
				console.log("ERR", err)
			})
		setLoading(false)
	}

	useEffect(() => {
		fetchStates()
	}, [])

	const handleSaveBankMaster = async () => {
		setLoading(true)
		const creds_edit = {
			dist_id: masterDetails?.dist_id || "",
			state_id: masterData?.state_id || "",
			dist_name: masterData?.district_name || "",
			created_by: userDetails?.emp_id || "",
			modified_by: userDetails?.emp_id || "",
		}

		const creds_add = {
			dist_id: "",
			state_id: masterData?.state_id || "",
			dist_name: masterData?.district_name || "",
			created_by: userDetails?.emp_id || "",
			modified_by: userDetails?.emp_id || "",
		}

		const creds = params.id > 0 ? creds_edit : creds_add

		await axios
			.post(`${url}/admin/save_district`, creds)
			.then((res) => {
				console.log("desig details saved.", res?.data)
				Message("success", "District saved.")
				navigate(-1)
			})
			.catch((err) => {
				Message("error", "Some error occurred.")
				console.log("ERR", err)
			})
		setLoading(false)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		setVisible(true)
	}

	const onReset = () => {
		setMasterData({
			state_id: "",
			district_name: "",
		})
	}

	return (
		<>
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>
				<form onSubmit={onSubmit}>
					<div>
						<div>
							<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
								<div>
									<TDInputTemplateBr
										placeholder="State..."
										type="text"
										label="State"
										name="state_id"
										formControlName={masterData.state_id}
										handleChange={handleChangeForm}
										mode={2}
										data={states?.map((item, i) => ({
											code: item?.sl_no,
											name: item?.state,
										}))}
									/>
								</div>
								<div>
									<TDInputTemplateBr
										placeholder="District..."
										type="text"
										label="District"
										name="district_name"
										formControlName={masterData.district_name}
										handleChange={handleChangeForm}
										mode={1}
									/>
								</div>
							</div>
						</div>

						<div className="mt-10">
							<BtnComp mode="A" onReset={onReset} />
						</div>
					</div>
				</form>
			</Spin>

			<DialogBox
				flag={4}
				onPress={() => setVisible(!visible)}
				visible={visible}
				onPressYes={() => {
					if (!masterData.district_name || !masterData.state_id) {
						Message("warning", "Fill all the values properly!")
						setVisible(false)
						return
					}
					handleSaveBankMaster()
					setVisible(!visible)
				}}
				onPressNo={() => setVisible(!visible)}
			/>
		</>
	)
}

export default DistrictMasterForm
