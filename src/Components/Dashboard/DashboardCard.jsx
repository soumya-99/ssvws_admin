import React from "react"
import { Spin } from "antd"
import "../../Screens/BMHome/Dashboard/Dashboard.css"

export default function DashboardCard({
	title,
	left1Data,
	left2Data,
	right1Data,
	right2Data,
	leftColor = "#000000",
	rightColor = "#000000",
	loading = false,
}) {
	return (
		<div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-md p-6">
			<h2 className="text-xl font-medium text-slate-700">{title}</h2>
			<div className="grid grid-cols-2 gap-4 mt-4 text-slate-700">
				<Spin spinning={loading}>
					<div>
						<p className="text-sm">{left1Data.label}</p>
						<p className="text-2xl font-bold" style={{ color: leftColor }}>
							{left1Data.value}
						</p>
					</div>
				</Spin>
				<Spin spinning={loading}>
					<div>
						<p className="text-sm">{right1Data.label}</p>
						<p className="text-2xl font-semibold" style={{ color: rightColor }}>
							{right1Data.value}
						</p>
					</div>
				</Spin>
				<Spin spinning={loading}>
					<div>
						<p className="text-sm">{left2Data.label}</p>
						<p className="text-2xl font-bold" style={{ color: leftColor }}>
							{left2Data.value}
						</p>
					</div>
				</Spin>
				<Spin spinning={loading}>
					<div>
						<p className="text-sm">{right2Data.label}</p>
						<p className="text-2xl font-semibold" style={{ color: rightColor }}>
							{right2Data.value}
						</p>
					</div>
				</Spin>
			</div>
		</div>
	)
}
