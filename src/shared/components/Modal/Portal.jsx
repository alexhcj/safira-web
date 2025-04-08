import { useEffect, useMemo } from 'react'

import { createPortal } from 'react-dom'

export const Portal = (props) => {
	const root = useMemo(() => document.createElement('div'), [])

	useEffect(() => {
		document.body.appendChild(root)

		return () => {
			if (root) {
				document.body.removeChild(root)
			}
		}
	}, [root])

	return createPortal(props.children, root)
}
