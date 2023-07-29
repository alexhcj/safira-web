import React from 'react'
import { BlogSearch } from './BlogSearch/BlogSearch'
// import { RecentPosts } from './RecentPosts/RecentPosts'
// import { BlogCategories } from './BlogCategories/BlogCategories'
// import { RecentComments } from './RecentComments/RecentComments'
import s from './blog-sidebar.module.scss'

export const BlogSidebar = ({ isLoading }) => (
	<div className={s.wrapper} >
		<div className={s.sidebar}>
			<BlogSearch isLoading={isLoading} />
			{/*<RecentComments />*/}
			{/*<RecentPosts />*/}
			{/*<BlogCategories categoryHandler={categoryHandler} />*/}
		</div>
	</div>
)
