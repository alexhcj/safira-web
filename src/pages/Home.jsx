import React from 'react'
import {MainSlider} from "../components/MainSlider/MainSlider";
import {OfferLinks} from "../components/OfferLinks/OfferLinks";
import {Offers} from "../components/Offers/Offers";
import {Sale} from "../components/Sale/Sale";
import {Mostview} from "../components/Mostview/Mostview";
import {OurBlog} from "../components/OurBlog/OurBlog";
import {FeaturedProducts} from "../components/FeaturedProducts/FeaturedProducts";
import {Border} from "../shared/components/UI/Spacing/Border";

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
            <Border />
        </div>
    )
}
