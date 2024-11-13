function getMonthlyInstallmentDates(dayOfMonth, loanPeriodMonths = 24) {
	if (dayOfMonth < 1 || dayOfMonth > 31) {
		throw new Error("Day must be between 1 and 31")
	}

	const installmentDates = []
	const currentDate = new Date()

	for (let i = 0; i < loanPeriodMonths; i++) {
		const installmentDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() + i,
			dayOfMonth
		)

		if (installmentDate.getDate() !== dayOfMonth) {
			installmentDate.setDate(0)
		}

		installmentDates.push(installmentDate.toISOString().split("T")[0])
	}

	return installmentDates
}

// const dayOfMonth = 15 // For instance, collecting on the 15th of each month
// const installmentDates = getMonthlyInstallmentDates(dayOfMonth)
// console.log(installmentDates)

function getWeeklyInstallmentDates(dayOfWeek, loanPeriodWeeks = 48) {
	if (dayOfWeek < 1 || dayOfWeek > 7) {
		throw new Error(
			"Day of the week must be between 1 (Sunday) and 7 (Saturday)"
		)
	}

	const installmentDates = []

	let currentDate = new Date()
	let currentDay = currentDate.getDay() + 1

	let dayDifference = (dayOfWeek - currentDay + 7) % 7
	if (dayDifference === 0) dayDifference = 7

	currentDate.setDate(currentDate.getDate() + dayDifference)

	for (let i = 0; i < loanPeriodWeeks; i++) {
		installmentDates.push(currentDate.toISOString().split("T")[0])

		currentDate.setDate(currentDate.getDate() + 7)
	}

	return installmentDates
}

// const dayOfWeek = 3; // For instance, collecting on Tuesday (1 = Sunday, 2 = Monday, ..., 7 = Saturday)
// const installmentDates = getWeeklyInstallmentDates(dayOfWeek);
// console.log(installmentDates);

export { getMonthlyInstallmentDates, getWeeklyInstallmentDates }
