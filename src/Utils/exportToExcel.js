import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

/**
 * exportToExcel
 * @param {Object[]} data — array of records, each with the same keys
 * @param {Object} headerMap — { serverKey: "Your Custom Header", … }
 */
const exportToExcel = (data, headerMap) => {
	// 1. Figure out column order & header labels
	const keys = Object.keys(headerMap)
	const headers = Object.values(headerMap)

	// 2. Create a sheet WITHOUT the default JSON header row
	const ws = XLSX.utils.json_to_sheet(data, {
		header: keys,
		skipHeader: true,
	})

	// 3. Prepend our custom header row
	XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" })

	// 4. Style the header row: yellow bg + bold text
	//    Note: requires cellStyles:true when writing
	const range = XLSX.utils.decode_range(ws["!ref"])
	for (let C = range.s.c; C <= range.e.c; ++C) {
		const cellRef = XLSX.utils.encode_cell({ r: 0, c: C })
		if (!ws[cellRef]) continue
		ws[cellRef].s = {
			fill: {
				patternType: "solid",
				fgColor: { rgb: "FFFF00" },
			},
			font: {
				bold: true,
			},
		}
	}

	// 5. Build workbook and write with styles enabled
	const wb = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

	const wbout = XLSX.write(wb, {
		bookType: "xlsx",
		type: "binary",
		cellStyles: true,
	})

	// 6. Convert to blob & trigger download
	const blob = new Blob([s2ab(wbout)], {
		type: "application/octet-stream",
	})
	const fileName = `Demand_Report_${
		metadataDtls?.split(",")[0]
	}_${fetchSearchTypeName(searchType)}.xlsx`
	saveAs(blob, fileName)
}

// helper to turn binary string → ArrayBuffer
const s2ab = (s) => {
	const buf = new ArrayBuffer(s.length)
	const view = new Uint8Array(buf)
	for (let i = 0; i < s.length; i++) {
		view[i] = s.charCodeAt(i) & 0xff
	}
	return buf
}

export { exportToExcel }
