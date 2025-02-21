import React, { useEffect, useRef, useState } from "react"
import { routePaths } from "../Assets/Data/Routes"
import { Link } from "react-router-dom"
import Tooltip from "@mui/material/Tooltip"
import { Paginator } from "primereact/paginator"
import { motion } from "framer-motion"
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	EditOutlined,
	EyeOutlined,
	FileTextOutlined,
	SyncOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { Tag } from "antd"
import { DataTable } from "primereact/datatable"
import Column from "antd/es/table/Column"
import { Toast } from "primereact/toast"
import { Message } from "@mui/icons-material"
import axios from "axios"
import { url } from "../Address/BaseUrl"

function TranceferCOPending({
	loanAppData,
	radioType,
	setSearch,
	title,
	flag,
	showSearch = true,
	isForwardLoan = false,
	isRejected = false,
	fetchLoanApplicationsDate,
}) {
	const navigate = useNavigate()

	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""

	const [first, setFirst] = useState(0)
	const [rows, setRows] = useState(10)
	const [expandedRows, setExpandedRows] = useState(null)
	const toast = useRef(null)
	const isMounted = useRef(false)
	const [selectedProducts, setSelectedProducts] = useState(null)
	const [currentPage, setCurrentPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [getloanAppData, setLoanAppData] = useState([])

	const [loading, setLoading] = useState(() => false)
	const [LoanGroupMember, setLoanGroupMember] = useState(() => [])



	


	const fetchLoanGroupMember = async (group_code, radioType) => {
		console.log(group_code, "res?.data?.msg", {
			branch_code : userDetails?.brn_code,
			approval_status : radioType,
			prov_grp_code : group_code
		})

		setLoading(true)
		await axios
			.post(`${url}/admin/form_fwd_bm_to_mis_mem_dtls`, {
				branch_code : userDetails?.brn_code,
				approval_status : radioType,
				prov_grp_code : group_code
			})
			.then((res) => {
				if (res?.data?.suc === 1) {
					setLoading(false)
					setLoanGroupMember(res?.data?.msg)
					console.log(res?.data?.msg, "res?.data?.msg", 'sucsess')
				} else {
					Message("error", "No incoming loan applications found.")
				}
			})
			.catch((err) => {
				Message("error", "Some error occurred while fetching loans!")
				console.log("ERRR", err)
			})
	}





	useEffect(() => {
		// alert(getloanAppData)
		// alert(radioType)
		if (loanAppData.length > 0) {
			setLoanAppData(loanAppData)
		}
		console.log(loanAppData, 'fffffffffffffffffffffffffffffffff');
		
	}, [loanAppData,])



	

	// useEffect(() => {
	// 	if (isMounted.current) {
	// 		const summary =
	// 			expandedRows !== null ? "All Rows Expanded" : "All Rows Collapsed"
	// 		toast.current.show({
	// 			severity: "success",
	// 			summary: `${summary}`,
	// 			life: 3000,
	// 		})
	// 	}
	// }, [expandedRows])

	// const onRowExpand = (event) => {
	// 	setExpandedRows(null)
	// 	console.log(event.data.group_code, "res?.data?.msg", event?.data)
	// 	fetchLoanGroupMember(event?.data?.prov_grp_code, radioType)

	// }

	// const onRowCollapse = (event) => {
	// 	console.log(event.data, "event.data close")
	// }

	// const allowExpansion = (rowData) => {
	// 	return getloanAppData.length > 0
	// }

	useEffect(() => {
		fetchLoanGroupMember([])
		// setExpandedRows(null);
		console.log(loanAppData, 'fffffffffffffffffffffffffffffffff');
		
	}, [fetchLoanApplicationsDate,])

	const onPageChange = (event) => {
		setCurrentPage(event.first)
		setRowsPerPage(event.rows)
	}

	const handleSelectionChange = (e) => {
		// Update the selected products setPaymentDate
		console.log(e.value, "kkkkkkkkkkkkkkkkkkkk")
		// Perform any additional logic here, such as enabling a button or triggering another action
		setSelectedProducts(e.value)
		
	}

	// const goTo = (item) => {
	// 	navigate(`${routePaths.EDIT_APPLICATION}`, {
	// 		state: { loanAppData: item },
	// 	})
	// }

	// useEffect(() => {
	// 	goTo()
	// })

// 	const rowExpansionTemplate = () => {
// 			return (
// 				<div className="orders-subtable">
// 					<DataTable
// 						value={LoanGroupMember}
// 						responsiveLayout="scroll"
// 						tableClassName="w-full text-sm text-left rtl:text-right shadow-lg text-green-900dark:text-gray-400 table_Custome table_Custome_2nd"
// 					>
// 						<Column
// 							field="form_no"
// 							header="Form No."
// 						></Column>
// 						<Column field="member_code" header="Member Code"
// 						></Column>
// 						<Column field="client_name" header="Client Name"></Column>
// 						<Column field="grt_date" header="GRT Date"
// 						body={(rowData) =>
// 							new Date(rowData?.grt_date).toLocaleDateString("en-GB")
// 						}
// 						></Column>
// 						<Column
//     field=""
//     header="Action"
//     body={(rowData) => (
//         <button
//             onClick={() => {
//                 console.log("Selected Item:", rowData);
//                 if (flag === "MIS") {
//                     navigate(`/homemis/editgrtform/${rowData?.form_no}`, {
//                         state: rowData,
//                     });
//                 } else if (flag === "BM") {
//                     navigate(`/homebm/editgrtform/${rowData?.form_no}`, {
//                         state: rowData,
//                     });
//                 } else {
//                     navigate(`/homeco/editgrtform/${rowData?.form_no}`, {
//                         state: rowData,
//                     });
//                 }
//             }}
//         >
//             <EditOutlined className="text-md text-[#DA4167]" />
//         </button>
//     )}
// />
// 						<Column headerStyle={{ width: '4rem'}}></Column>
// 					</DataTable>
// 				</div>
// 			)
// 		}


	return (
		<>
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, type: "spring", stiffness: 30 }}
			>
				<div
					className={`flex flex-col bg-slate-800
					 rounded-lg my-3 dark:bg-slate-800
					 md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-1.5`}
				>
					<div className="w-full">
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
										animate={{ opacity: 1, width: "92%" }}
										transition={{ delay: 1.1, type: "just" }}
										className={`bg-white border rounded-lg border-slate-700
										 text-gray-800 block w-full h-12 pl-10 dark:bg-gray-800 md:ml-4 duration-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-lg `}
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
				<Toast ref={toast} />

				{/* {ShowApprov && (

				<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, type: "spring", stiffness: 30 }}
				>
				<div className='grid-cols-2 gap-5 mb-3 items-center text-left'>
				<button 
				className={`inline-flex items-center px-4 py-2 mt-0 ml-0 sm:mt-0 text-sm font-small text-center text-white border hover:border-green-600 border-teal-500 bg-teal-500 transition ease-in-out hover:bg-green-600 duration-300 rounded-full  dark:focus:ring-primary-900`}
				onClick={() => {

				setVisible(true)
				}}><CheckCircleOutlined class={`mr-2`} /> Approve  

				</button>

				<button 
				className={`inline-flex items-center px-4 py-2 mt-0 ml-4 sm:mt-0 text-sm font-medium text-center text-white border border-[#DA4167] bg-[#DA4167] transition ease-in-out hover:bg-[#ac3246] hover:border-[#ac3246] duration-300 rounded-full  dark:focus:ring-primary-900`}
				onClick={() => {
				setVisible_Reject(true)
				}}><CheckCircleOutlined class={`mr-2`} /> Reject  

				</button>		
				</div>
				</motion.section>

				)} */}



				<DataTable
					value={getloanAppData?.map((item, i) => [{ ...item, id: i }]).flat()}
					// expandedRows={expandedRows}
					// onRowToggle={(e) => setExpandedRows(e.data)}
					// onRowExpand={onRowExpand}
					// onRowCollapse={onRowCollapse}
					selectionMode="checkbox"
					// selection={selectedProducts}
					// onSelectionChange={(e) => setSelectedProducts(e.value)}
					onSelectionChange={(e) => handleSelectionChange(e)}
					tableStyle={{ minWidth: "50rem" }}
					// rowExpansionTemplate={rowExpansionTemplate}
					dataKey="id"
					paginator
					rows={rowsPerPage }
					first={currentPage}
					onPage={onPageChange}
					rowsPerPageOptions={[5, 10, 20]} // Add options for number of rows per page
					tableClassName="w-full text-sm text-left rtl:text-right shadow-lg text-green-900dark:text-gray-400 table_Custome table_Custome_1st" // Apply row classes
				>

					

					
					<Column
						header="Sl No."
						body={(rowData) => (
							<span style={{ fontWeight: "bold" }}>{rowData?.id + 1}</span>
						)}
					></Column>
					{/* <Column expander={allowExpansion} style={{ width: "3em" }} /> */}
					<Column
						field="group_name"
						header="Group Name"
					></Column>
					
					<Column
						field="group_code"
						header="Group Code"
					></Column>

					<Column
						field="trf_date"
						header="Transaction Date"
						body={(rowData) =>
						new Date(rowData?.trf_date).toLocaleDateString("en-GB")
						}
					></Column>
					<Column
    field=""
    header="Action"
    body={(rowData) => (

		<>
		
		{/* {rowData?.approval_status === "A" && (
		<button
		onClick={() => {
			navigate(`/homebm/trancefercofrom/${rowData?.group_code}`, {
			state: {
			...rowData, // Spread existing rowData
			approval_status: radioType, // Explicitly include approval_status
			},
			});

			}}
		>

		<EyeOutlined className="text-md text-[#DA4167]"  /> 
		</button>
		)} */}

		
		{rowData?.approval_status === "U" && (
		<button
		onClick={() => {
		console.log("Selected Item:", rowData);
		// navigate(`/homebm/trancefercofrom/${rowData?.group_code}`, {
		// state: rowData,
		// });

		navigate(`/homebm/trancefercofromapprove/${rowData?.group_code}`, {
		state: {
		...rowData, // Spread existing rowData
		approval_status: radioType, // Explicitly include approval_status
		},
		});

		}}
		>

		<EditOutlined className="text-md text-[#DA4167]" /> {JSON.stringify(rowData, null, 2)}
		</button>
		)}
		
		</>
        
    )}
/>






				</DataTable>
				<>{JSON.stringify(getloanAppData[0], null, 2)}  // </>

			</motion.section>

			
		</>
	)
}

export default TranceferCOPending
