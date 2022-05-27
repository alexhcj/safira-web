import React from 'react'
import { Preloader } from '../../../common/Preloader/Preloader'
import cn from 'classnames'
import s from './button-filter.module.scss'

export const ButtonFilter = ({ text = 'Filter', isLoading, disabled, searchBtnHandler }) => {
	return (
		<button
			className={cn(s.btn, disabled && s.disabled)}
			onClick={(e) => searchBtnHandler(e)}
			disabled={disabled || isLoading}
		>
			{isLoading ? <Preloader width='20px' height='20px' fill='#fff' /> : <span>{text}</span>}
		</button>
	)
}
