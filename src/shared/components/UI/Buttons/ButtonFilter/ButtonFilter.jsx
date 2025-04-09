import { Preloader } from '../../../common/Preloader/Preloader'

import s from './button-filter.module.scss'

export const ButtonFilter = ({ text = 'Filter', isLoading, disabled, onClick }) => {
	return (
		<button className={s.btn} onClick={onClick} disabled={disabled || isLoading}>
			{isLoading ? <Preloader width='20px' height='20px' fill='#fff' /> : <span>{text}</span>}
		</button>
	)
}
