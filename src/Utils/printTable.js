export const printTable = (
	dataArray,
	title,
	searchType,
	metadata,
	fromDate,
	toDate
) => {
	// Step 1: Generate HTML table string
	const tableHTML = `
    <html>
      <head>
        <title>${title}</title>
        <style>
            table, td, th {
            border: 1px solid;
            }

            table {
            width: 100%;
            border-collapse: collapse;
            }
            .center-div {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              margin-bottom: 20px;
            }
            .italic {
              font-style: italic;
            }
        </style>
      </head>
      <body>
      <h2 style="text-align: center">SSVWS</h2>
      ${
				searchType === "G"
					? `<div class="center-div">
        <div class="italic">
          Group: ${metadata?.group_name}, ${metadata?.group_code}
        </div>
        <div class="italic">
          Showing results from ${new Date(fromDate)?.toLocaleDateString(
						"en-GB"
					)} to ${new Date(toDate)?.toLocaleDateString("en-GB")}
        </div>
        <div class="italic">
          Branch: ${metadata?.branch_name}, ${metadata?.branch_code}
        </div>
      </div>`
					: `<div class="center-div">
        <div class="italic">
									Member: ${metadata?.client_name}, ${metadata?.member_code}
								</div>
								<div class="italic">
									Branch: ${metadata?.branch_name}, ${metadata?.branch_code}
								</div>
								<div class="italic">
									Group: ${metadata?.group_name}, ${metadata?.group_code}
								</div>
								<div class="italic">
									Showing results from ${new Date(fromDate)?.toLocaleDateString(
										"en-GB"
									)} to ${new Date(toDate)?.toLocaleDateString("en-GB")}
								</div>
								<div class="italic">Loan ID: ${metadata?.loan_id}</div>
      </div>`
			}

        <table>
          <thead>
            <tr>
              ${Object.keys(dataArray[0])
								.map((key) => `<th>${key}</th>`)
								.join("")}
            </tr>
          </thead>
          <tbody>
            ${dataArray
							.map(
								(item) => `
              <tr>
                ${Object.values(item)
									.map((value) => `<td>${value}</td>`)
									.join("")}
              </tr>
            `
							)
							.join("")}
          </tbody>
        </table>
      </body>
    </html>
  `

	// Step 2: Open a new about:blank page
	const printWindow = window.open("", "_blank")
	if (printWindow) {
		printWindow.document.write(tableHTML)
		printWindow.document.close()

		// Step 3: Print the page
		printWindow.print()
		printWindow.onafterprint = () => {
			printWindow.close()
		}
	} else {
		alert("Popup blocked. Please allow popups for this website.")
	}
}

// // Usage example with a sample array of objects
// const sampleData = [
//   { name: 'Alice', age: 30, city: 'New York' },
//   { name: 'Bob', age: 25, city: 'San Francisco' }
// ];

// const App = () => (
//   <div>
//     <button onClick={() => printTable(sampleData)}>Print Table</button>
//   </div>
// );

// export default App;