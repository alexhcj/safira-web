import { Link } from 'react-router-dom'

import DocsSVG from '@assets/svg/docs.svg?react'


import s from './button-docs.module.scss'

export const ButtonDocs = () => (
	<Link to='/docs' className={s.btn}>
		<DocsSVG width={20} height={20} fill='#ffffff' />
	</Link>
)
