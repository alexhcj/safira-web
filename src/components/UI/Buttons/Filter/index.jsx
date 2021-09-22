import { Preloader } from '../../Preloader'
import classNames from 'classnames/bind'
import s from './btn.module.css'

let cx = classNames.bind(s)

export const Button = ({ text = 'Filter', isLoading, disabled, searchBtnHandler }) => {
	const btnCN = cx('btn', {
		disabled: disabled,
	})

	return (
		<button className={btnCN} onClick={(e) => searchBtnHandler(e)} disabled={disabled || isLoading}>
			{isLoading ? <Preloader width='20px' height='20px' fill='#fff' /> : <span>{text}</span>}
		</button>
	)
}
