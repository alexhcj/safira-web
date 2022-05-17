import { Preloader } from '../../../common/Preloader/Preloader'
import classNames from 'classnames/bind'
import s from './buttonfilter.module.css'

let cx = classNames.bind(s)

export const ButtonFilter = ({ text = 'Filter', isLoading, disabled, searchBtnHandler }) => {
	const btnCN = cx('btn', {
		disabled: disabled,
	})

	return (
		<button className={btnCN} onClick={(e) => searchBtnHandler(e)} disabled={disabled || isLoading}>
			{isLoading ? <Preloader width='20px' height='20px' fill='#fff' /> : <span>{text}</span>}
		</button>
	)
}
