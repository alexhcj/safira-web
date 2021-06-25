import React from 'react'
import { MainSlider, OfferLinks, OurBlog, Sale, Mostview, Offers} from '../components'

export const Home = () => {
	return (
        <div>
            <MainSlider />
            <OfferLinks />
            <Offers />
            <Sale />
            <Mostview />
            <OurBlog />
        </div>
    )
}
