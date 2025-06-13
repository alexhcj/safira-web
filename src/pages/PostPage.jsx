import { BlogSidebar } from '@modules/Blog/BlogSidebar/BlogSidebar'

import { PostDetails } from '@components/PostDetails/PostDetails'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'
import { SidebarLayout } from '@shared/layouts/SidebarLayout/SidebarLayout'

export const PostPage = () => {
	return (
		<>
			<ScrollToTop>
				<Breadcrumbs />
				<DefaultLayout>
					<SidebarLayout main={<PostDetails />} aside={<BlogSidebar />} />
				</DefaultLayout>
			</ScrollToTop>
		</>
	)
}
