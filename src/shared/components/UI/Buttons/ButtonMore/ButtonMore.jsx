import cn from 'classnames'

import s from './button-more.module.scss'

export const ButtonMore = ({ text = 'Show more', onClick, className }) => {
	return (
		<button className={cn(s.btn, className)} onClick={onClick}>
			{text}
		</button>
	)
}
