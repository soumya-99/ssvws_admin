import { useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"

const useIdleTimer = (timeout = 5 * 60 * 1000) => {
	const navigate = useNavigate()
	const timerRef = useRef(null)

	const logout = useCallback(() => {
		localStorage.clear()

		// Optionally, you can add more logout logic here (e.g., API calls)

		// Redirect to the login page
		navigate("/", { replace: true })
	}, [navigate])

	const resetTimer = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current)
		}
		timerRef.current = setTimeout(logout, timeout)
	}, [logout, timeout])

	useEffect(() => {
		const events = ["mousemove", "keydown", "scroll", "click"]

		events.forEach((event) => window.addEventListener(event, resetTimer))

		resetTimer()

		return () => {
			events.forEach((event) => window.removeEventListener(event, resetTimer))
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [resetTimer])

	return
}

export default useIdleTimer
