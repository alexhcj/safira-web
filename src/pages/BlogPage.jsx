import React from 'react'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Blog } from '../modules/Blog/Blog'

const BlogPage = () => {
	return (
		<div>
			<Breadcrumbs />
			<Blog />
		</div>
	)
}

export default BlogPage
