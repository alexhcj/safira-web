import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import s from './socials.module.scss'

export const Socials = ({ socials, className }) => {
	console.log(socials)
	return (
		<ul className={cn(s.socials, className)}>
			{socials.map((social, index) => (
				<li key={index}>
					<Link className={s.socials_link} to={social.url}>
						{social.icon}
					</Link>
				</li>
			))}
		</ul>
	)
}
