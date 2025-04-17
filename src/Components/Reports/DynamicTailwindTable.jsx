import React, { useState, useMemo } from "react"
import { Pagination } from "antd"

const DynamicTailwindTable = ({
	data = [],
	headerBgColor = "bg-slate-800",
	pageSize = 50,
	columnTotal = [],
	colRemove = [],
	headersMap = null,
	dateTimeExceptionCols = [],
	showCheckbox = false,
	selectedRowIndices = [],
	onRowSelectionChange = () => {},
}) => {
	const [currentPage, setCurrentPage] = useState(1)

	const isDataEmpty = !data || data.length === 0

	const originalHeaders = useMemo(() => {
		return isDataEmpty ? [] : Object.keys(data[0])
	}, [data, isDataEmpty])

	const filteredHeadersWithIndex = useMemo(() => {
		return originalHeaders
			.map((header, index) => ({ header, index }))
			.filter((item) => !colRemove.includes(item.index))
	}, [originalHeaders, colRemove])

	const totals = useMemo(() => {
		const result = {}
		columnTotal.forEach((origIndex) => {
			if (origIndex >= 0 && origIndex < originalHeaders.length) {
				const headerKey = originalHeaders[origIndex]
				result[origIndex] = data.reduce((acc, row) => {
					const value = parseFloat(row[headerKey])
					return !isNaN(value) ? acc + value : acc
				}, 0)
			}
		})
		return result
	}, [data, columnTotal, originalHeaders])

	const currentData = useMemo(() => {
		return data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	}, [data, currentPage, pageSize])

	const visibleIndices = useMemo(
		() => currentData.map((_, i) => (currentPage - 1) * pageSize + i),
		[currentData, currentPage, pageSize]
	)

	const allVisibleSelected = useMemo(
		() => visibleIndices.every((idx) => selectedRowIndices.includes(idx)),
		[visibleIndices, selectedRowIndices]
	)

	if (isDataEmpty) {
		return <div>No data available</div>
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
	}

	const handleSelectAllChange = () => {
		let newSelection
		if (allVisibleSelected) {
			newSelection = selectedRowIndices.filter(
				(idx) => !visibleIndices.includes(idx)
			)
		} else {
			newSelection = Array.from(
				new Set([...selectedRowIndices, ...visibleIndices])
			)
		}
		onRowSelectionChange(newSelection)
	}

	const handleCheckboxChange = (globalIndex) => {
		const isAlready = selectedRowIndices.includes(globalIndex)
		const newSelection = isAlready
			? selectedRowIndices.filter((idx) => idx !== globalIndex)
			: [...selectedRowIndices, globalIndex]
		onRowSelectionChange(newSelection)
	}

	const formatCellValue = (value, colIndex) => {
		const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
		if (typeof value === "string" && isoRegex.test(value)) {
			if (dateTimeExceptionCols.includes(colIndex)) {
				return new Date(value).toLocaleDateString("en-GB")
			}
			return new Date(value).toLocaleString("en-GB")
		}
		return value
	}

	return (
		<>
			<div
				className="relative overflow-auto shadow-md sm:rounded-lg mt-5 max-h-[500px]
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-transparent
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
			>
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead
						className={`text-xs uppercase text-slate-50 sticky top-0 ${headerBgColor}`}
					>
						<tr>
							{showCheckbox && (
								<th className="px-6 py-3">
									<input
										className="rounded-sm checked:bg-pink-600"
										type="checkbox"
										checked={allVisibleSelected}
										onChange={handleSelectAllChange}
									/>
								</th>
							)}
							{filteredHeadersWithIndex.map((item, i) => (
								<th key={i} className="px-6 py-3 font-semibold">
									{headersMap
										? headersMap[item.header] || item.header
										: item.header}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{currentData.map((row, rowIndex) => {
							const globalIndex = (currentPage - 1) * pageSize + rowIndex
							const isChecked = selectedRowIndices.includes(globalIndex)

							return (
								<tr
									key={rowIndex}
									className={
										rowIndex % 2 === 0 ? "bg-slate-100 text-slate-900" : ""
									}
								>
									{showCheckbox && (
										<td className="px-6 py-3">
											<input
												className="rounded-sm checked:bg-pink-600"
												type="checkbox"
												checked={isChecked}
												onChange={() => handleCheckboxChange(globalIndex)}
											/>
										</td>
									)}
									{filteredHeadersWithIndex.map((item, colIndex) => (
										<td key={colIndex} className="px-6 py-3">
											{row[item.header] !== undefined
												? formatCellValue(row[item.header], item.index)
												: "---"}
										</td>
									))}
								</tr>
							)
						})}
					</tbody>

					<tfoot className="sticky bottom-0">
						<tr className="text-slate-50 bg-slate-700">
							{showCheckbox && <td className="px-6 py-3" />}
							{filteredHeadersWithIndex.map((item, i) => (
								<td key={i} className="px-6 py-3">
									{i === 0
										? "Total"
										: columnTotal.includes(item.index) &&
										  totals[item.index] !== undefined
										? totals[item.index].toFixed(2)
										: ""}
								</td>
							))}
						</tr>
					</tfoot>
				</table>
			</div>

			<div className="flex justify-end my-4">
				<Pagination
					current={currentPage}
					pageSize={pageSize}
					total={data.length}
					onChange={handlePageChange}
					showSizeChanger={false}
				/>
			</div>
		</>
	)
}

export default DynamicTailwindTable
