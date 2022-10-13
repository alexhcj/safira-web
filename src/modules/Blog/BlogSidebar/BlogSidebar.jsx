import React, { useEffect, useState } from 'react'
import { BlogSearch } from './BlogSearch/BlogSearch'
// import { RecentPosts } from './RecentPosts/RecentPosts'
// import { BlogCategories } from './BlogCategories/BlogCategories'
// import { RecentComments } from './RecentComments/RecentComments'
import s from './blog-sidebar.module.scss'
import { postsAPI } from '../../../api/posts'

export const BlogSidebar = ({ setPosts, setLoadMore, setLoad, posts, load }) => {
	const limit = 4

	const [title, setTitle] = useState('')
	const [category, setCategory] = useState('')
	const [start, setStart] = useState(0)
	const [end, setEnd] = useState(limit)

	useEffect(() => {
		const params = {
			title: title,
			category: category,
			sort: 'date',
			start: start,
			end: end
		}

		const fetchData = async () => {
			try {
				const data = await postsAPI.getAll(params)
				if (load === 0){
					setPosts(data.data)
					if (data.total - 1 <= data.data.length){
						setLoadMore(false)
					} else {
						setLoadMore(true)
					}
					setEnd(data.data.length + limit)
					setStart(data.data.length)
				} else {
					const response = [...posts, ...data.data]
					if (data.total - 1 <= response.length){
						setLoadMore(false)
					}
					setEnd(response.length + limit)
					setPosts(response)
					setStart(response.length)
				}
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [title, category, load, setLoadMore])

	function setDefault(){
		setLoad(0)
		setStart(0)
		setEnd(limit)
	}

	const searchHandler = (val) => {
		setDefault()
		setTitle(val)
		setCategory('')
	}

	const categoryHandler = (val) => {
		setDefault()
		setCategory(val)
		setTitle('')
	}

	return (
		<div className={s.section} >
			<div className={s.wrapper}>
				<BlogSearch searchHandler={searchHandler} />
				{/*<RecentComments />*/}
				{/*<RecentPosts />*/}
				{/*<BlogCategories categoryHandler={categoryHandler} />*/}
			</div>
		</div>
	)
}
