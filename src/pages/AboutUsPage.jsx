import { Hero } from '@modules/AboutUs/AboutUsHero/Hero'
import { Advantages } from '@modules/AboutUs/Advantages/Advantages'
import { Clients } from '@modules/AboutUs/Clients/Clients'
import { Works } from '@modules/AboutUs/Works/Works'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Space } from '@shared/components/UI/Spacing/Space'

export const AboutUsPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<Hero />
			<Space size='l' />
			<Advantages />
			<Space size='l' />
			<Works />
			<Space space={64} />
			<Clients />
			<Space space={53} />
		</ScrollToTop>
	)
}
