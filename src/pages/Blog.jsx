import React from 'react'
import { BlogComp } from '../components/BlogComp'
import { Breadcrumbs } from '../components/UI'

export const Blog = () => {

	return (
		<div>
			<Breadcrumbs />
			<div className="container">
				<BlogComp />
			</div>
		</div>
	)
}
