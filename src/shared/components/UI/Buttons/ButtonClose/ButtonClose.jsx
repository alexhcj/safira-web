import cn from 'classnames'

import Close from '@assets/svg/close.svg?react'


import s from './button-close.module.scss'

export const ButtonClose = ({ onClick, isLoading, disabled, classNames }) => {
	return (
		<button
			className={cn(s.btn, disabled && s.disabled, classNames)}
			type='button'
			onClick={onClick}
			disabled={disabled || isLoading}
		>
			<Close className={s.btn_svg} />
		</button>
	)
}
