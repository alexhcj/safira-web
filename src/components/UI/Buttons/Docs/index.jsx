import { Link } from 'react-router-dom'
import { DocsSVG } from '../../../svg'
import s from './docsbtn.module.css'

export const Button = () => (
	<Link to='/docs' className={s.btn}>
		<DocsSVG fill='#fff' />
	</Link>
)

// TODO: change animation. mb add 2 solo svg docs and add for each custom animation