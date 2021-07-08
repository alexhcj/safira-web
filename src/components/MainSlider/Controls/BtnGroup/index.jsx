import { Arrow } from '../Arrow'
import s from './btngroup.module.css'

export const ButtonGroup = ({ next, previous }) => {
	return (
		<div className={s.btn__group}>
			<Arrow width={32} height={35} className={s.left} onClick={() => previous()} />
			<Arrow width={32} height={35} className={s.right} onClick={() => next()} />
		</div>
	)
}
