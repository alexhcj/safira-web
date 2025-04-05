import { useEffect, useState } from 'react';
import s from './blog-categories.module.scss'
import { postsAPI } from '../../../../api/posts'

export const BlogCategories = ({ categoryHandler }) => {
	const [categories, setCategories] = useState([])
	const [active, setActive] = useState('')

	useEffect(() => {
		const params = {}

		const fetchData = async () => {
			try {
				const data = await postsAPI.getAll(params)
				setCategories(data)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [])

	const categoryChangeHandler = (val) => {
		categoryHandler(val)
		setActive(val)
	}

	return (
		<div className={s.section}>
			<p className={s.heading}>Categories</p>
			<ul>
				{categories.map((category) => {
					let itemClassName
					active === category.category ? (itemClassName = s.chosen) : (itemClassName = s.category)
					return (
						<li
							id={category.category}
							className={itemClassName}
							key={category.id}
							onClick={(e) => {
								categoryChangeHandler(category.category, e)
							}}
						>
							{category.category}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
// .contains
