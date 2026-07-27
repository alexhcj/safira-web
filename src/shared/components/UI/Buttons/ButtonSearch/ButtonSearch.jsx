import cn from 'classnames'

import { Preloader } from '../../../common/Preloader/Preloader'
import { Text } from '../../Text/Text'

import s from './button-search.module.scss'

export const ButtonSearch = ({ children, isLoading, disabled, onClick, className }) => {
	return (
		<button className={cn(s.btn, className)} type='button' onClick={onClick} disabled={disabled || isLoading}>
			{isLoading ? (
				<Preloader width={20} height={20} />
			) : (
				children || (
					<Text span className={s.btn_text} color='white'>
						Search
					</Text>
				)
			)}
		</button>
	)
}
