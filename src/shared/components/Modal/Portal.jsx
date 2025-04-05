import { createPortal } from 'react-dom'
import { useEffect, useMemo } from 'react';

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
