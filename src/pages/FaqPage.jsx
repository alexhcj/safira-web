import React from 'react'

import { Faq } from '@components/Faq/Faq'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Space } from '@shared/components/UI/Spacing/Space'

export const FaqPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<Faq />
			<Space size='l' />
		</ScrollToTop>
	)
}
