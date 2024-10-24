import React, { useEffect, useState } from "react"
import Sidebar from "../../Components/Sidebar"
import axios from "axios"
import { url } from "../../Address/BaseUrl"
import { Message } from "../../Components/Message"
import { Spin, Button, Transfer } from "antd"
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons"
import GroupsTableViewBr from "../../Components/GroupsTableViewBr"
import FormHeader from "../../Components/FormHeader"

const mockData = Array.from({
	length: 20,
}).map((_, i) => ({
	key: i.toString(),
	title: `content${i + 1}`,
	description: `description of content${i + 1}`,
}))

const initialTargetKeys = mockData
	.filter((item) => Number(item.key) > 10)
	.map((item) => item.key)

function AssignMemberToGroup() {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""
	const [loading, setLoading] = useState(false)

	const [searchKeywords, setSearchKeywords] = useState(() => "")
	const [groups, setGroups] = useState(() => [])
	const [copyLoanApplications, setCopyLoanApplications] = useState(() => [])

	const [approvalStatus, setApprovalStatus] = useState("S")

	const fetchSearchedGroups = async () => {
		setLoading(true)
		const creds = {
			group_name: searchKeywords,
		}
		await axios
			.post(`${url}/admin/search_group_web`, creds)
			.then((res) => {
				console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJj", res?.data)
				setGroups(res?.data?.msg)
			})
			.catch((err) => {
				Message("error", "Some error occurred while searching...")
			})
		setLoading(false)
	}

	const [targetKeys, setTargetKeys] = useState(initialTargetKeys)
	const [selectedKeys, setSelectedKeys] = useState([])
	const onChange = (nextTargetKeys, direction, moveKeys) => {
		console.log("targetKeys:", nextTargetKeys)
		console.log("direction:", direction)
		console.log("moveKeys:", moveKeys)
		setTargetKeys(nextTargetKeys)
	}
	const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
		console.log("sourceSelectedKeys:", sourceSelectedKeys)
		console.log("targetSelectedKeys:", targetSelectedKeys)
		setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
	}
	const onScroll = (direction, e) => {
		console.log("direction:", direction)
		console.log("target:", e.target)
	}

	return (
		<div>
			<Sidebar mode={1} />
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-blue-800 dark:text-gray-400"
				spinning={loading}
			>
				<main className="px-4 h-auto my-10 mx-32">
					<FormHeader text={`Assign Member to Group`} mode={1} />
					<div className="flex flex-row gap-3">Assign member to Group</div>

					<div className="grid grid-cols-2">
						<div>
							<TDInputTemplateBr
								placeholder="Type self occupation..."
								type="text"
								label="Self Occupation"
								name="o_self_occupation"
								formControlName={formik.values.o_self_occupation}
								handleChange={formik.handleChange}
								mode={1}
								disabled={disableCondition(
									userDetails?.id,
									memberDetails?.approval_status
								)}
							/>
						</div>
						<div></div>
					</div>

					<div className="sm:col-span-2">
						<Transfer
							className="align-middle justify-center"
							dataSource={mockData}
							titles={["Members", "Assigned in Group"]}
							listStyle={{
								width: 250,
								height: 300,
							}}
							operations={["Assign", "Back"]}
							targetKeys={targetKeys}
							selectedKeys={selectedKeys}
							onChange={onChange}
							onSelectChange={onSelectChange}
							onScroll={onScroll}
							render={(item) => item.title}
						/>
					</div>
				</main>
			</Spin>
		</div>
	)
}

export default AssignMemberToGroup
