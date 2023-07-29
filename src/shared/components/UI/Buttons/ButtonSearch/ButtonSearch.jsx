import React from 'react'
import cn from 'classnames'
import { Preloader } from '../../../common/Preloader/Preloader'
import { Text } from '../../Text/Text'
import s from './button-search.module.scss'

export const ButtonSearch = ({
	children,
	isLoading,
	disabled,
	onClick
}) => {
	return (
		<button
			className={cn(s.btn, disabled && s.disabled)}
			type='button'
			onClick={onClick}
			disabled={disabled || isLoading}
		>
			{isLoading
				? <Preloader width={25} height={25} />
				: children || <Text span className={s.btn_text} color="white">Search</Text>
			}
		</button>
	)
}
