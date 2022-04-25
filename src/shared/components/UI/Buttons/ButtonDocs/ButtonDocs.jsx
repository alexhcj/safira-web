import { Link } from 'react-router-dom'
// import { DocsSVG } from '../../../../../assets/svg/'
import s from './buttondocs.module.css'

export const ButtonDocs = () => (
	<Link to='/docs' className={s.btn}>
		<div>Docs</div>
		{/*<DocsSVG fill='#fff' />*/}
	</Link>
)

// TODO: change animation. mb add 2 solo svg docs and add for each custom animation
