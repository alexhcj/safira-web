import React from 'react'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { PostDetails } from '../components/PostDetails/PostDetails'
import { SidebarLayout } from '../shared/layouts/SidebarLayout/SidebarLayout'
import { BlogSidebar } from '../modules/Blog/BlogSidebar/BlogSidebar'
import { DefaultLayout } from '../shared/layouts/DefaultLayout/DefaultLayout'

export const PostPage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<SidebarLayout main={<PostDetails />} aside={<BlogSidebar />} />
			</DefaultLayout>
		</>
	)
}
