import React from "react"
import { Button, message, Space } from "antd"
export const Message = (type, msg) => {
	message.open({
		type: type,
		content: msg,
		duration: 1.3,
	})
}

// export default Message
