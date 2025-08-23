import cn from 'classnames'

import { Tooltip } from '@shared/components/UI/Tooltip/Tooltip'

import s from './button-with-tooltip.module.scss'

/**
 * Button component with a tooltip
 * @param {string} text - Text to display in tooltip (defaults to 'Add to Cart')
 * @param {('primary'|'outline')} buttonType - Type of button styling
 * @param {('default'|'lg')} buttonSize - Size of the button (defaults to 'default')
 * @param {Function} onClick - Click handler function
 * @param {string} className - Additional CSS class names
 * @param {ReactNode} children - Child elements
 * @param {boolean} showTooltip - Whether to show the tooltip (defaults to true)
 * @param {string} tooltipType - Type of tooltip (defaults to 'default')
 * @param {string} tooltipPosition - Position of tooltip (defaults to 'top')
 */
export const ButtonWithTooltip = ({
	text = 'Add to Cart',
	buttonType,
	buttonSize = 'default',
	onClick,
	className,
	children,
	showTooltip = true,
	tooltipType = 'default',
	tooltipPosition = 'top',
}) => {
	return (
		<Tooltip text={showTooltip ? text : ''} type={tooltipType} position={tooltipPosition}>
			<button
				className={cn(s.btn, s[`btn_${buttonType}`], s[`btn_${buttonSize}`], className)}
				type='button'
				onClick={onClick}
			>
				{children}
			</button>
		</Tooltip>
	)
}
