import React, { useState, useEffect, useCallback } from "react"
import Sidebar from "../../../Components/Sidebar"
import axios from "axios"
import { url } from "../../../Address/BaseUrl"
import { Message } from "../../../Components/Message"
import { Spin, Popconfirm } from "antd"
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons"
import debounce from "lodash.debounce"
import DynamicTailwindTable from "../../../Components/Reports/DynamicTailwindTable"
import { transactionFieldNames } from "../../../Utils/Reports/headerMap"

const RejectTransaction = () => {
	const userDetails = JSON.parse(localStorage.getItem("user_details")) || {}

	const [loading, setLoading] = useState(false)
	const [searchKeywords, setSearchKeywords] = useState("")
	const [data, setData] = useState([])
	const [selectedRowIndices, setSelectedRowIndices] = useState([])
	const [suggestions, setSuggestions] = useState([])
	const [showSuggestions, setShowSuggestions] = useState(false)

	useEffect(() => {
		if (data.length > 0) {
			setSelectedRowIndices(data.map((_, idx) => idx))
		} else {
			setSelectedRowIndices([])
		}
	}, [data])

	const fetchGroupNames = async (query) => {
		setLoading(true)
		try {
			const creds = {
				branch_code: userDetails?.brn_code,
				grps: query,
			}
			const res = await axios.post(`${url}/fetch_group_name`, creds)
			if (res?.data?.suc === 1 && Array.isArray(res?.data?.msg)) {
				setSuggestions(res?.data?.msg)
				setShowSuggestions(true)
			} else {
				setSuggestions([])
				setShowSuggestions(false)
			}
		} catch (err) {
			console.error(err)
			setSuggestions([])
			setShowSuggestions(false)
		}
		setLoading(false)
	}

	const debouncedFetchGroups = useCallback(
		debounce((nextValue) => {
			fetchGroupNames(nextValue)
		}, 500),
		[]
	)

	const handleSearchChange = (e) => {
		const value = e.target.value
		setSearchKeywords(value)
		if (value.length >= 3) {
			debouncedFetchGroups(value)
		} else {
			debouncedFetchGroups.cancel()
			setSuggestions([])
			setShowSuggestions(false)
		}
	}

	const handleSuggestionClick = (grp) => {
		setSearchKeywords(grp?.group_code || grp?.group_name)
		setSuggestions([])
		setShowSuggestions(false)
		// Optionally, trigger the main search here
		// fetchSearchedGroups()
	}

	const fetchSearchedGroups = async () => {
		setLoading(true)
		const creds = {
			group_code: searchKeywords,
			branch_code: userDetails.brn_code,
		}

		try {
			const res = await axios.post(
				`${url}/fetch_reject_loan_transactions_data`,
				creds
			)
			if (res.data.suc === 0) {
				Message("warning", res.data.msg)
				setLoading(false)
				return
			}
			setData(res.data.data || [])
		} catch (err) {
			console.error(err)
			Message("error", "Some error occurred while searching...")
		} finally {
			setLoading(false)
		}
	}

	const rejectTnx = async () => {
		setLoading(true)

		const modifiedArr = data
			.filter((_, i) => selectedRowIndices.includes(i))
			.map((txn) => ({
				payment_date: txn.transaction_date,
				loan_id: txn.loan_id,
				payment_id: txn.transaction_id,
				tr_type: txn.tr_type,
			}))

		const creds = {
			reject_trans: modifiedArr,
		}

		try {
			const res = await axios.post(`${url}/reject_loan_transactions`, creds)
			console.log("RES", res?.data)
			Message("success", "Loan Txns rejected.")
		} catch (err) {
			Message("error", "Some error occurred.")
			console.log("ERRR", err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex">
			<Sidebar mode={2} />
			<div className="flex-1">
				<Spin
					indicator={<LoadingOutlined spin />}
					spinning={loading}
					className="text-slate-800 dark:text-gray-400"
				>
					<main className="px-4 my-10 mx-32">
						{/* Search Section */}
						<div className="mt-20">
							<label htmlFor="default-search" className="sr-only">
								Search
							</label>
							<div className="relative mt-10">
								<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
									<svg
										className="w-4 h-4 text-gray-500 dark:text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 20 20"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
										/>
									</svg>
								</div>
								<input
									type="search"
									id="default-search"
									className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
									placeholder="Search by Group Code/Group Name"
									value={searchKeywords}
									onChange={handleSearchChange}
								/>
								<button
									type="button"
									className="text-white absolute end-2.5 bottom-2.5 bg-[#DA4167] hover:bg-[#C33157] disabled:bg-[#ee7c98] disabled:cursor-not-allowed font-medium rounded-md text-sm px-4 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={fetchSearchedGroups}
									disabled={!searchKeywords}
								>
									Search
								</button>
							</div>
						</div>

						{showSuggestions && suggestions?.length > 0 && (
							<ul className="absolute w-96 left-36 right-0 mt-1 z-10 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
								{suggestions?.map((grp, idx) => (
									<li
										key={idx}
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b-2"
										onClick={() => handleSuggestionClick(grp)}
									>
										{grp?.group_code} - {grp?.group_name}
									</li>
								))}
							</ul>
						)}

						{/* Title */}
						<div className="w-full bg-slate-800 text-slate-50 p-3 pl-5 mt-5 rounded-lg font-bold text-xl">
							Reject Transaction
						</div>

						{/* Dynamic Table */}
						<div className="mt-5">
							<DynamicTailwindTable
								data={data}
								pageSize={50}
								dateTimeExceptionCols={[0]}
								showCheckbox
								// disableAllCheckbox
								selectedRowIndices={selectedRowIndices}
								onRowSelectionChange={setSelectedRowIndices}
								headersMap={transactionFieldNames}
								colRemove={[6]}
								columnTotal={[4, 5]}
							/>
						</div>

						{data?.length > 0 && selectedRowIndices?.length !== 0 && (
							<div>
								<Popconfirm
									title={`Reject Transaction?`}
									description={
										<>
											<div>Are you sure to Reject Transaction?</div>
										</>
									}
									onConfirm={async () => {
										await rejectTnx()
										setData([])
										Message("success", "Transaction Rejected.")
									}}
									onCancel={() => null}
									okText="Reject"
									cancelText="No"
									disabled={selectedRowIndices?.length === 0}
								>
									<button
										className={`items-center -mt-16 px-6 py-3 text-sm font-medium text-center text-white border border-[#DA4167] bg-[#DA4167] transition ease-in-out hover:bg-[#ac3246] hover:border-[#ac3246] duration-300 rounded-full dark:focus:ring-primary-900`}
									>
										<CheckCircleOutlined /> <span className="ml-2">Reject</span>
									</button>
								</Popconfirm>
							</div>
						)}
					</main>
				</Spin>
			</div>
		</div>
	)
}

export default RejectTransaction
