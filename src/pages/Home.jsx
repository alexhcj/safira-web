import React from 'react'
import { MainSlider, OfferLinks, OurBlog, Sale, Mostview, Offers, FeaturedProducts} from '../components'
import { Divider } from '../components/UI/Divider'

export const Home = () => {
	return (
        <div>
            <MainSlider />
            <OfferLinks />
            <Offers />
            <Sale />
            <Mostview />
            <OurBlog />
            <FeaturedProducts />
            <Divider />
        </div>
    )
}
