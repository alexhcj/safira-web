import cn from 'classnames'
import s from './text.module.scss'

// weights: 'medium' | 'semi' | 'bold'
export const Text = ({
	color,
	weight,
	span,
	className,
	children,
}) => {
	if (span) {
		return (
			<span
				className={cn(
					s.span,
					color && s[`color_${color}`],
					weight && s[`weight_${weight}`],
					className,
				)}
			>
				{children}
			</span>
		)
	}

	return (
		<p
			className={cn(
				s.text,
				color && s[`color_${color}`],
				weight && s[`weight_${weight}`],
				className,
			)}
		>
			{children}
		</p>
	)
}
