import React from "react"
import Backbtn from "./Backbtn"
import { motion } from "framer-motion"
import PrintComp from "./PrintComp"

function FormHeader({ text, mode = 0, data, title }) {
	return (
		<div className="bg-transparent dark:bg-gray-800 relative overflow-hidden mb-5">
			<div
				className={
					mode === 0
						? "flex flex-col bg-red-800 dark:bg-red-800 w-full md:flex-row items-center align-middle justify-start gap-3 space-x-2 px-8 rounded-full py-3"
						: mode === 1
						? "flex flex-col bg-blue-800 dark:bg-blue-800 w-full md:flex-row items-center align-middle justify-start gap-3 space-x-2 px-8 rounded-full py-3"
						: mode === 2
						? "flex flex-col bg-teal-800 dark:bg-teal-800 w-full md:flex-row items-center align-middle justify-start gap-3 space-x-2 px-8 rounded-full py-3"
						: "flex flex-col bg-slate-800 dark:bg-slate-800 w-full md:flex-row items-center align-middle justify-start gap-3 space-x-2 px-8 rounded-full py-3"
				}
			>
				<Backbtn />

				<motion.h2
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, type: "just" }}
					className="md:text-2xl sm:text-xl font-semibold text-white capitalize dark:text-gray-400 "
				>
					{text}
				</motion.h2>
				{/* <div className="absolute right-4">
					{mode == 1 && data && <PrintComp toPrint={data} title={title} />}
				</div> */}
			</div>
		</div>
	)
}

export default FormHeader
