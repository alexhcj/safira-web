import React from 'react'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { PostDetails } from '../components/PostDetails/PostDetails'

export const PostPage = () => {
	return (
		<div>
			<Breadcrumbs />
			<PostDetails />
		</div>
	)
}
