import React from 'react'
import s from './tags.module.scss'
import cn from 'classnames'

// sizes: lg | md
export const Tags = ({ tags, size }) => {
	return (
		<div className={cn(s.tags, size && s[`tags_${size}`])}>
			{tags.map((item, index) => (
				<span className={s.tag} key={index}>{item.tag}</span>
			))}
		</div>
	)
}
