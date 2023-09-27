import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import s from './socials.module.scss'

export const Socials = ({ socials, width, height, className }) => {
	return (
		<ul className={cn(s.socials, className)}>
			{socials.map((social, index) => (
				<li key={index} className={s.item}>
					<Link className={s.link} to={social.url} style={{ width: width, height: height }}>
						{social.icon}
					</Link>
				</li>
			))}
		</ul>
	)
}
