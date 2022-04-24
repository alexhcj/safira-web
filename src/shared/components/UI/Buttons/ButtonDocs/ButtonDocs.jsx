import { Link } from 'react-router-dom'
import { DocsSVG } from '../../../../../components/svg'
import s from './buttondocs.module.css'

export const ButtonDocs = () => (
	<Link to='/docs' className={s.btn}>
		<DocsSVG fill='#fff' />
	</Link>
)

// TODO: change animation. mb add 2 solo svg docs and add for each custom animation
