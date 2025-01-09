// import React, { useState } from "react"
import React, { useState, useEffect, useRef } from 'react';
import { routePaths } from "../Assets/Data/Routes"
import { Link } from "react-router-dom"
import Tooltip from "@mui/material/Tooltip"
import { Paginator } from "primereact/paginator"
import { motion } from "framer-motion"
import {
	CheckCircleOutlined,
	LoadingOutlined,
	ClockCircleOutlined,
	EditOutlined,
	FileTextOutlined,
	SyncOutlined,
	CloseCircleOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { Tag, Spin, Divider, Collapse } from "antd"
import axios from "axios"
import DialogBox from "./DialogBox"
import { url } from "../Address/BaseUrl"
// import Panel from "antd/es/splitter/Panel"
// import { Collapse } from "antd";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Message } from './Message';

const { Panel } = Collapse;

function RecoveryCoApproveTable({
	loanAppData,
	setSearch_Co,
	title,
	flag,
	showSearch = true,
	isForwardLoan = false,
	isRejected = false,
	loanType = "R",
	fetchLoanApplications,
	fetchLoanApplicationsDate,
}) {
	const navigate = useNavigate()

	const userDetails = JSON.parse(localStorage.getItem("user_details")) || ""

	const [visible, setVisible] = useState(() => false)

	const [loading, setLoading] = useState(() => false)
	const [cachedPaymentId, setCachedPaymentId] = useState("")


	// acordian start
	// const [products, setProducts] = useState([]);
	const [expandedRows, setExpandedRows] = useState(null);
	const toast = useRef(null);
	const isMounted = useRef(false);
	// const [rowClick, setRowClick] = useState(true);
	// const productService = new ProductService();
	const [selectedProducts, setSelectedProducts] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [LoanCoMember, setLoanCoMember] = useState(() => [])

	// const [useData, setSetData] = useState([])

	useEffect(() => {
		// setSetData(loanAppData)
		if (isMounted.current) {
			const summary = expandedRows !== null ? 'All Rows Expanded' : 'All Rows Collapsed';
			toast.current.show({ severity: 'success', summary: `${summary}`, life: 3000 });
		}
		// setProducts(useData)

		// console.log(loanAppData, 'loanAppData');
	}, [expandedRows]);


	const onRowExpand = (event) => {
		setExpandedRows(null);
		console.log(event.data, 'event.data');
		fetchLoanGroupMember()

		// toast.current.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
	}

	const onRowCollapse = (event) => {
		console.log(event.data, 'event.data close');
		// toast.current.show({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
	}

	const allowExpansion = (rowData) => {
		return loanAppData.length > 0;
	};

	const onPageChange = (event) => {
		setCurrentPage(event.first);
		setRowsPerPage(event.rows);
	};

	const collapseAll = () => {

		setExpandedRows(null);
	};

	const handleSelectionChange = (e) => {
		// Update the selected products
		setSelectedProducts(e.value);

		// Log selected rows for debugging or further processing
		console.log("Selected Rows: ", e.value);

		// Perform any additional logic here, such as enabling a button or triggering another action
		if (e.value.length > 0) {
			console.log(`You selected ${e.value.length} rows`);
		} else {
			console.log("No rows selected");
		}
	};


	const fetchLoanGroupMember = async () => {
		setLoading(true)
		await axios
			.post(`${url}/fetch_cowise_recov_member_dtls`, {
				branch_code: userDetails?.brn_code,
				from_dt: fetchLoanApplicationsDate.fromDate,
				to_dt: fetchLoanApplicationsDate.toDate,
				co_id: fetchLoanApplicationsDate.selectedEmployeeId,
			})
			.then((res) => {
				if (res?.data?.suc === 1) {
					setLoanCoMember(res?.data?.msg)
					setLoading(false)
				} else {
					Message("error", "No incoming loan applications found.")
				}
			})
			.catch((err) => {
				Message("error", "Some error occurred while fetching loans!")
				console.log("ERRR", err)
			})
		
	}


	// acordian end



	const approveRecoveryTransaction = async (paymentId) => {
		setLoading(true)
		const creds = {
			approved_by: userDetails?.emp_id,
			payment_id: paymentId,
		}
		await axios
			.post(`${url}/admin/approve_recovery_loan`, creds)
			.then((res) => {
				console.log("RESSS approveRecoveryTransaction", res?.data)
			})
			.catch((err) => {
				console.log("ERRR approveRecoveryTransaction", err)
			})
		setLoading(false)
	}

	const rowExpansionTemplate = () => {
		return (
			<div className="orders-subtable">
				
				<DataTable value={LoanCoMember} responsiveLayout="scroll"
					tableClassName="w-full text-sm text-left rtl:text-right shadow-lg text-green-900dark:text-gray-400 table_Custome table_Custome_2nd"
				>
					{/* <Column field="transaction_date" header="Payment Date" sortable></Column> */}
					<Column field="transaction_date" header="Payment Date " body={(rowData) => new Date(rowData?.transaction_date).toLocaleDateString("en-GB")} ></Column>
					<Column field="payment_id" header="Payment ID"></Column>
					<Column header="Group - Loan ID (Member)"
						body={(rowData) =>
							`${rowData.group_name} - ${rowData.loan_id} (${rowData.client_name})`
						}></Column>
					<Column field="tot_emi" header="Total EMI"></Column>
					<Column header="Amount"
						body={(rowData) =>
							`${rowData.amt} - (${rowData.tr_mode})`
						}
					></Column>
					<Column field="outstanding" header="Outstanding"></Column>
					<Column field="created_by" header="Created By"></Column>
					{/* <Column headerStyle={{ width: '4rem'}}></Column> */}
				</DataTable>
			</div>
		);
	}

	return (
		<Spin
			indicator={<LoadingOutlined spin />}
			size="large"
			className="text-blue-800 dark:text-gray-400"
			spinning={loading}
		>
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, type: "spring", stiffness: 30 }}
			>
				<div
					className={`flex flex-col p-1 ${flag === "MIS" ? "bg-blue-800" : "bg-slate-800"
						} rounded-lg my-3 ${flag === "MIS" ? "dark:bg-blue-800" : "dark:bg-slate-800"
						} md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-1.5`}
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
										className={`bg-white border rounded-lg ${flag === "MIS" ? "border-blue-700" : "border-slate-700"
											} text-gray-800 block w-full h-12 pl-10 dark:bg-gray-800 md:ml-4 duration-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-lg focus:border-blue-600`}
										placeholder="Search"
										required=""
										onChange={(text) => setSearch_Co(text.target.value)}
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




				{/* <div className="datatable-rowexpansion-demo"> */}
				<Toast ref={toast} />

				{/* <div className="card acordianTable"> */}
				<DataTable
					value={loanAppData?.map((item, i) => ([{ ...item, id: i }])).flat()}
					expandedRows={expandedRows}
					onRowToggle={(e) => setExpandedRows(e.data)}
					onRowExpand={onRowExpand}
					onRowCollapse={onRowCollapse}
					selectionMode="checkbox"
					selection={selectedProducts}
					// onSelectionChange={(e) => setSelectedProducts(e.value)}
					onSelectionChange={(e) => handleSelectionChange(e)}
					tableStyle={{ minWidth: "50rem" }}
					rowExpansionTemplate={rowExpansionTemplate}
					dataKey="id"
					paginator
					rows={rowsPerPage}
					first={currentPage}
					onPage={onPageChange}
					rowsPerPageOptions={[5, 10, 20]} // Add options for number of rows per page
					tableClassName="w-full text-sm text-left rtl:text-right shadow-lg text-green-900dark:text-gray-400 table_Custome table_Custome_1st" // Apply row classes
				>
					<Column expander={allowExpansion} style={{ width: '3em' }} />
					<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
					<Column field="group_name" header="Group Name"></Column>
					<Column field="group_code" header="Group Code"></Column>
					<Column field="created_by" header="Created By"></Column>
					<Column field="outstanding" header="Outstanding" ></Column>
					<Column field="created_code" header="Created Code"></Column>
					<Column field="credit_amt" header="Credit Amount"></Column>
					<Column field="transaction_date" header="Payment Date " body={(rowData) => new Date(rowData?.transaction_date).toLocaleDateString("en-GB")} ></Column>
					{/* <Column headerStyle={{ width: '4rem'}} ></Column> */}
				</DataTable>

				<div className='grid-cols-2 gap-5 mt-5 items-center text-center'>
					<button className='w-24'
						onClick={() => {
							// setCachedPaymentId(item?.payment_id)
							// setVisible(true)
						}}
					>
						{/* DA4167 */}
						<CheckCircleOutlined title='Approve'
							className={`text-2xl bg-[#0694a2] w-20 h-10 text-[#ffeaef] rounded-sm flex justify-center items-center`}
						/>
					</button>

					<button
						onClick={() => {
							// setCachedPaymentId(item?.payment_id)
							// setVisible(true)
						}}
					>
						{/* DA4167 */}
						<CloseCircleOutlined
							className={`text-2xl bg-[#DA4167] w-20 h-10 text-[#ffeaef] rounded-sm flex justify-center items-center`}
						/>
					</button>
				</div>
				{/* </div>
		</div> */}



				
			</motion.section>

			<DialogBox
				flag={4}
				onPress={() => setVisible(!visible)}
				visible={visible}
				onPressYes={async () => {
					// editGroup()
					await approveRecoveryTransaction(cachedPaymentId)
						.then(() => {
							fetchLoanApplications("R")
						})
						.catch((err) => {
							console.log("Err in RecoveryCoApproveTable.jsx", err)
						})
					setVisible(!visible)
				}}
				onPressNo={() => setVisible(!visible)}
			/>
		</Spin>
	)
}

export default RecoveryCoApproveTable
