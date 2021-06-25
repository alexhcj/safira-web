import React from 'react'
import { MainSlider, OfferLinks, OurBlog, Sale, Mostview} from '../components'

export const Home = () => {
	return (
        <div>
            <MainSlider />
            <OfferLinks />
            <Sale />
            <Mostview />
            <OurBlog />
        </div>
    )
}
