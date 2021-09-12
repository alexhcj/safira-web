import { useState } from 'react'
import { Preloader } from '../../Preloader'
import classNames from 'classnames/bind'
import s from './btn.module.css'

let cx = classNames.bind(s)

export const Button = ({ text = 'Filter', isLoading, searchBtnHandler }) => {
	const [focus, setFocus] = useState(false)

	const btnCN = cx('btn', {
		focus: focus,
	})

	const onFocus = () => {
		setFocus(true)
	}

	const onBlur = () => {
		setFocus(false)
	}

	return (
		<button className={btnCN} onClick={(e) => searchBtnHandler(e)} onFocus={onFocus} onBlur={onBlur}>
			{isLoading ? <Preloader width='20px' height='20px' fill='#fff' /> : <span>{text}</span>}
		</button>
	)
}
