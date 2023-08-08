import React from 'react'
import s from './tags.module.scss'

export const Tags = ({ tags }) => {
	return (
		<div className={s.tags}>
			{tags.map((item, index) => (
				<span className={s.tag} key={index}>
					{item.tag}
				</span>
			))}
		</div>
	)
}
