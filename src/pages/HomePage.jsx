import React from 'react'
import { ProductProvider } from '../context/ProductContext'
import { HeroSlider } from '../components/SliderSections/HeroSlider/HeroSlider'
import { OfferLinks } from '../components/OfferLinks/OfferLinks'
import { Offers } from '../components/Offers/Offers'
import { Promo } from '../components/Promo/Promo'
import { MostviewProducts } from '../components/SliderSections/MostviewProducts/MostviewProducts'
import { OurBlogPosts } from '../components/SliderSections/OurBlogPosts/OurBlogPosts'
import { FeaturedProducts } from '../components/SliderSections/FeaturedProducts/FeaturedProducts'
import { Border } from '../shared/components/UI/Spacing/Border'
import { Space } from '../shared/components/UI/Spacing/Space'
import { ProductQuickView } from '../components/ProductQuickView/ProductQuickView'
import { ScrollToTop } from '../shared/components/ScrollToTop/ScrollToTop'

export const HomePage = () => {
	return (
		<ProductProvider>
			<ScrollToTop>
				<HeroSlider />
				<Space size='l' />
				<OfferLinks />
				<Space space={65} />
				<Offers />
				<Space space={65} />
				<Promo />
				<Space space={65} />
				<MostviewProducts />
				<Space space={65} />
				<OurBlogPosts />
				<Space space={65} />
				<FeaturedProducts />
				<Space space={46} />
				<Border />
				<ProductQuickView />
			</ScrollToTop>
		</ProductProvider>
	)
}
