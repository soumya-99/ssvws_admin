import React, { useState } from "react"
import { routePaths } from "../../Assets/Data/Routes"
import { useNavigate } from "react-router-dom"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import axios from "axios"
import { url } from "../../Address/BaseUrl"
import { Message } from "../../Components/Message"

const UserProfileUpdateForm = ({ mode }) => {
	const navigate = useNavigate()
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""

	const [formData, setFormData] = useState({
		u_name: "",
		u_phone: "",
		u_email: "",
		u_branch_name: "",
		u_gender: "",
	})

	const handleFormChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}))
	}

	const handleUpdateProfile = async () => {
		const creds = {
			emp_name: formData.u_name,
			branch_id: "",
			phone_home: "",
			phone_mobile: "",
			email: "",
			gender: "",
			emp_id: "",
		}
		await axios
			.post(`${url}/admin/save_profile_web`, creds)
			.then((res) => {
				console.log(res.data)
				Message("success", "Profile updated successfully!")
			})
			.catch((err) => {
				console.log("Errr occurred!!!", err)
			})
	}

	return (
		<div className="max-w-sm mx-auto">
			<div className="grid grid-cols-2 gap-4 justify-between">
				<div className="sm:col-span-2">
					<TDInputTemplateBr
						placeholder="Type name..."
						type="text"
						label="Name"
						name="u_name"
						formControlName={formData.u_name || userDetails?.emp_name}
						handleChange={(e) => handleFormChange("u_name", e.target.value)}
						// handleBlur={""}
						mode={1}
					/>
				</div>
				<div>
					<TDInputTemplateBr
						placeholder="Branch Name"
						type="text"
						label="Branch Name"
						name="u_branch_name"
						formControlName={formData.u_branch_name || userDetails?.branch_name}
						handleChange={(e) =>
							handleFormChange("u_branch_name", e.target.value)
						}
						// handleBlur={""}
						mode={1}
					/>
				</div>
				<div>
					<TDInputTemplateBr
						placeholder="Phone No."
						type="number"
						label="Phone No."
						name="u_phone"
						formControlName={formData.u_phone || userDetails?.phone_mobile}
						handleChange={(e) => handleFormChange("u_phone", e.target.value)}
						// handleBlur={""}
						mode={1}
					/>
				</div>
				<div className="mb-5">
					<TDInputTemplateBr
						placeholder="Email ID"
						type="email"
						label="Email ID"
						name="u_email"
						formControlName={formData.u_email || userDetails?.email}
						handleChange={(e) => handleFormChange("u_email", e.target.value)}
						// handleBlur={""}
						mode={1}
					/>
				</div>

				<div className="mb-5">
					<TDInputTemplateBr
						placeholder="Select Gender..."
						type="text"
						label="Gender"
						name="u_gender"
						formControlName={formData.u_gender || userDetails?.gender}
						handleChange={(e) => handleFormChange("u_gender", e.target.value)}
						// handleBlur={""}
						data={[
							{ code: "M", name: "Male" },
							{ code: "F", name: "Female" },
							{ code: "O", name: "Others" },
						]}
						mode={2}
					/>
				</div>
			</div>

			<div className="flex justify-between">
				<button
					onClick={() => console.log("Update profile")}
					className="text-white bg-blue-900 hover:bg-
      blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-400"
				>
					Update
				</button>
			</div>
		</div>
	)
}

export default UserProfileUpdateForm
