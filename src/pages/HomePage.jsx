import { ProductProvider } from '@context/ProductContext'

import { OfferLinks } from '@components/OfferLinks/OfferLinks'
import { Offers } from '@components/Offers/Offers'
import { ProductQuickView } from '@components/ProductQuickView/ProductQuickView'
import { Promo } from '@components/Promo/Promo'
import { FeaturedProducts } from '@components/SliderSections/FeaturedProducts/FeaturedProducts'
import { HeroSlider } from '@components/SliderSections/HeroSlider/HeroSlider'
import { MostviewProducts } from '@components/SliderSections/MostviewProducts/MostviewProducts'
import { OurBlogPosts } from '@components/SliderSections/OurBlogPosts/OurBlogPosts'

import { Space } from '@shared/components/UI/Spacing/Space'

export const HomePage = () => {
	return (
		<ProductProvider>
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
			<ProductQuickView />
		</ProductProvider>
	)
}
