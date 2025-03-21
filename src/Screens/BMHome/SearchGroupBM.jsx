import React, { useEffect, useState } from "react"
import Sidebar from "../../Components/Sidebar"
import axios from "axios"
import { url } from "../../Address/BaseUrl"
import { Message } from "../../Components/Message"
import { Spin, Button } from "antd"
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons"
import GroupsTableViewBr from "../../Components/GroupsTableViewBr"

function SearchGroupBM() {
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
			branch_code: userDetails?.brn_code,
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

	return (
		<div>
			<Sidebar mode={2} />
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-slate-800 dark:text-gray-400"
				spinning={loading}
			>
				<main className="px-4 h-auto my-10 mx-32">
					{/* <div className="flex flex-row gap-3 mt-20">
						<input
							type="text"
							placeholder="Search by Group Name"
							className={`bg-white border-1 border-gray-400 text-gray-800 text-sm rounded-lg ${
								userDetails?.id == 3
									? "active:border-slate-600 focus:ring-slate-600 focus:border-slate-800"
									: "active:border-slate-600 focus:ring-slate-600 focus:border-slate-800"
							} focus:border-1 duration-500 block w-full p-2 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
							onChange={(e) => setSearchKeywords(e.target.value)}
						/>
						<button
							icon={<SearchOutlined />}
							iconPosition="end"
							className="bg-slate-700 text-white hover:bg-slate-800 p-5 text-center text-sm border-none rounded-lg w-36 h-10 flex justify-center items-center align-middle gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed active:ring-2 active:ring-slate-400"
							onClick={fetchSearchedGroups}
							disabled={!searchKeywords}
						>
							<SearchOutlined />
							Search
						</button>
					</div> */}
					<div className="mt-20">
						<label
							for="default-search"
							class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
						>
							Search
						</label>
						<div class="relative mt-10">
							<div class="absolute inset-y-0  start-0 flex items-center ps-3 pointer-events-none">
								<svg
									class="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</div>
							<input
								type="search"
								id="default-search"
								class="block mt-10 w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
								placeholder="Search by GRT Form No./Member Name/Member Code/Mobile No./Group Code"
								onChange={(e) => setSearchKeywords(e.target.value)}
							/>
							<button
								type="submit"
								class="text-white absolute end-2.5 disabled:bg-[#ee7c98] bottom-2.5 bg-[#DA4167] hover:bg-[#DA4167] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								onClick={fetchSearchedGroups}
								disabled={!searchKeywords}
							>
								Search
							</button>
						</div>
					</div>
					<GroupsTableViewBr
						flag="BM"
						loanAppData={groups}
						title="Groups"
						showSearch={false}
						// setSearch={(data) => setSearch(data)}
					/>
					{/* <DialogBox
					visible={visible}
					flag={flag}
					onPress={() => setVisible(false)}
				/> */}
				</main>
			</Spin>
		</div>
	)
}

export default SearchGroupBM
