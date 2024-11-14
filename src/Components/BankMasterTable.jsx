import React, { useState } from "react"
import { routePaths } from "../Assets/Data/Routes"
import { Link } from "react-router-dom"
import Tooltip from "@mui/material/Tooltip"
import { Paginator } from "primereact/paginator"
import { motion } from "framer-motion"
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	EditOutlined,
	PlusOutlined,
	FileTextOutlined,
	SyncOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { Tag } from "antd"

function BankMasterTable({
	loanAppData,
	setSearch,
	title,
	flag,
	showSearch = true,
	isForwardLoan = false,
	isRejected = false,
}) {
	const navigate = useNavigate()

	const [first, setFirst] = useState(0)
	const [rows, setRows] = useState(10)

	const onPageChange = (event) => {
		setFirst(event.first)
		setRows(event.rows)
	}

	// const goTo = (item) => {
	// 	navigate(`${routePaths.EDIT_APPLICATION}`, {
	// 		state: { loanAppData: item },
	// 	})
	// }

	// useEffect(() => {
	// 	goTo()
	// })

	return (
		<>
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, type: "spring", stiffness: 30 }}
			>
				<div
					className={`flex flex-col p-1 ${
						flag === "MIS" ? "bg-blue-800" : "bg-slate-800"
					} rounded-lg my-3 ${
						flag === "MIS" ? "dark:bg-blue-800" : "dark:bg-slate-800"
					} md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-3`}
				>
					<div className="w-full">
						<button
							className="bg-white w-20 h-12 rounded-lg float-right text-center ml-3"
							onClick={() => {
								navigate(`/homebm/masterbanks/0`)
							}}
						>
							<PlusOutlined className="text-xl" />
						</button>
						<div className="flex items-center justify-between">
							<motion.h2
								initial={{ opacity: 0, y: -50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 1, type: "just" }}
								className="text-xl w-48 capitalize text-nowrap font-bold text-white dark:text-white sm:block hidden mx-4"
							>
								{title}
							</motion.h2>

							<label htmlFor="simple-search" className="sr-only">
								Search
							</label>
							{showSearch && (
								<div className="relative w-full -right-12 2xl:-right-12">
									<div className="absolute inset-y-0 left-0 flex items-center md:ml-4 pl-3 pointer-events-none">
										<svg
											aria-hidden="true"
											className="w-5 h-5 text-gray-500 dark:text-gray-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<motion.input
										type="text"
										id="simple-search"
										initial={{ opacity: 0, width: 0 }}
										animate={{ opacity: 1, width: "95%" }}
										transition={{ delay: 1.1, type: "just" }}
										className={`bg-white border rounded-lg ${
											flag === "MIS" ? "border-blue-700" : "border-slate-700"
										} text-gray-800 block w-full h-12 pl-10 dark:bg-gray-800 md:ml-4 duration-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-lg focus:border-blue-600`}
										placeholder="Search"
										required=""
										onChange={(text) => setSearch(text.target.value)}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</motion.section>
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, type: "spring", stiffness: 30 }}
			>
				<table className="w-full text-sm text-left rtl:text-right shadow-lg text-green-900dark:text-gray-400">
					<thead
						className={`text-md text-gray-700 capitalize ${
							flag === "MIS" ? "bg-blue-100" : "bg-slate-100"
						} dark:bg-gray-700 dark:text-gray-400`}
					>
						<tr>
							{/* <th scope="col" className="p-4">
								#
							</th> */}
							<th scope="col" className="p-4">
								Bank Name
							</th>
							<th scope="col" className="p-4">
								Branch Name
							</th>
							<th scope="col" className="p-4">
								IFSC
							</th>
							<th scope="col" className="p-4">
								SOL ID.
							</th>
							<th scope="col" className="p-4">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{loanAppData &&
							loanAppData?.slice(first, rows + first).map((item, i) => (
								<tr
									className={
										"bg-white border-b dark:bg-gray-800 dark:border-gray-700"
									}
									key={i}
								>
									{/* <th
										scope="row"
										className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{item.sl_no}
									</th> */}
									<td className="px-6 py-4">{item?.bank_name}</td>
									<td className="px-6 py-4">{item?.branch_name}</td>
									<td className="px-6 py-4">{item?.ifsc}</td>
									<td className="px-6 py-4">{item?.sol_id}</td>

									<td className="px-6 py-4">
										{flag === "BM" && (
											// </Link>
											<button
												// to={routePaths.BM_EDIT_GRT + item?.form_no}
												onClick={() => {
													console.log("LLSKSIODFUISFH", item)
													navigate(
														`/homebm/masterbanks/${item?.bank_code || 0}`,
														{
															state: item,
														}
													)
												}}
											>
												<EditOutlined
													className={`text-md ${
														flag === "MIS" ? "text-blue-800" : "text-slate-800"
													}`}
												/>
											</button>
										)}
									</td>
								</tr>
							))}
					</tbody>
				</table>
				<Paginator
					first={first}
					rows={rows}
					totalRecords={loanAppData?.length}
					rowsPerPageOptions={[3, 5, 10, 15, 20, 30, loanAppData?.length]}
					onPageChange={onPageChange}
				/>
			</motion.section>
		</>
	)
}

export default BankMasterTable
