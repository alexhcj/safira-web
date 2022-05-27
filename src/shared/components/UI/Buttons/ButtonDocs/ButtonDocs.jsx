import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as DocsSVG } from '../../../../../assets/svg/docs.svg'
import s from './button-docs.module.scss'

export const ButtonDocs = () => (
	<Link to='/docs' className={s.btn}>
		<DocsSVG width={20} height={20} fill="#ffffff" />
	</Link>
)
