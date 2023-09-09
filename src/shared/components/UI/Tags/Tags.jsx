import React from 'react'
import s from './tags.module.scss'

export const Tags = ({ tags, createdAt }) => {
	const isProductNew = new Date() < new Date(new Date(createdAt).setDate(new Date().getDate() + 2 * 7))

	return (
		<div className={s.tags}>
			{isProductNew && <span className={s.tag}>new</span>}
			{/*{tags &&*/}
			{/*	tags.tags.promotions.map((tag) => (*/}
			{/*		<span className={`${s.tag} ${s.promotion}`} key={tag}>*/}
			{/*			{tag}*/}
			{/*		</span>*/}
			{/*	))}*/}
		</div>
	)
}
