import cn from 'classnames'
import { Link } from 'react-router-dom'

import s from './socials.module.scss'

export const Socials = ({ socials, width, height, className }) => {
	return (
		<ul className={cn(s.socials, className)}>
			{socials.map((social, index) => (
				<li key={index} className={s.item}>
					<Link className={s.link} to={social.url} target='_blank' style={{ width: width, height: height }}>
						{social.icon}
					</Link>
				</li>
			))}
		</ul>
	)
}
