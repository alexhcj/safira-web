import cn from 'classnames'

import { Tooltip } from '@shared/components/UI/Tooltip/Tooltip'

import s from './button-popup.module.scss'

// sizes: lg
export const ButtonPopup = ({
	text = 'Add to Cart',
	size,
	onClick,
	className,
	outline,
	children,
	showTooltip = true,
	tooltipType = 'default',
	tooltipPosition = 'top',
}) => {
	return (
		<Tooltip text={showTooltip ? text : ''} type={tooltipType} position={tooltipPosition}>
			<button
				className={cn(s.btn, { [s.outline]: outline }, s[`btn_${size}`], className)}
				type='button'
				onClick={onClick}
			>
				{children}
			</button>
		</Tooltip>
	)
}
