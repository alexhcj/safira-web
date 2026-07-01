import { Hero } from '@modules/AboutUs/AboutUsHero/Hero'
import { Advantages } from '@modules/AboutUs/Advantages/Advantages'
import { Clients } from '@modules/AboutUs/Clients/Clients'
import { Works } from '@modules/AboutUs/Works/Works'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'

export const AboutUsPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<Hero />
			<Advantages />
			<Works />
			<Clients />
		</ScrollToTop>
	)
}
