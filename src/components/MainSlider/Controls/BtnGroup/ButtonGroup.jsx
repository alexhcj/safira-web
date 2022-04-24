import { Arrow } from '../Arrow/Arrow'
import s from './btngroup.module.css'
import classnames from 'classnames/bind'

const cx = classnames.bind(s)

export const ButtonGroup = ({ next, previous, active }) => {
    const btn__group = cx('btn__group', {active: active})

	return (
		<div className={btn__group}>
			<Arrow width={32} height={35} className={s.left} onClick={() => previous()} />
			<Arrow width={32} height={35} className={s.right} onClick={() => next()} />
		</div>
	)
}
