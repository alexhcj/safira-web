import { useLocation } from 'react-router-dom'
import cn from 'classnames'
import s from './button-popup.module.scss'

// sizes: lg
export const ButtonPopup = ({ text = 'Add to Cart', size, onClick, className, outline, children }) => {
	const location = useLocation()

	return (
		<div className={s.wrapper}>
			<button
				className={cn(s.btn, { [s.outline]: outline }, s[`btn_${size}`], className)}
				type='button'
				onClick={onClick}
			>
				{children}
			</button>
			{location.pathname !== '/compare' && <span className={s.popup}>{text}</span>}
		</div>
	)
}
