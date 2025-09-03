import { useEffect, useState } from 'react'

import AliceCarousel from 'react-alice-carousel'

import FourPinesLogo from '@assets/images/brands/4-pines.png'
import AsahiLogo from '@assets/images/brands/asahi.png'
import AwsMarketLogo from '@assets/images/brands/aws-market.png'
import BlueMoonLogo from '@assets/images/brands/blue-moon.png'
import Casolana from '@assets/images/brands/casolana.png'
import CongaraFoodsInc from '@assets/images/brands/conagra-foods-inc.png'
import Corona from '@assets/images/brands/corona.png'
import Emborg from '@assets/images/brands/emborg.png'
import FairPrice from '@assets/images/brands/fair-price.png'
import Fresh from '@assets/images/brands/fresh.png'
import Gardenia from '@assets/images/brands/gardenia.png'
import GeneralMillsInc from '@assets/images/brands/general-mills-inc.png'
import Hoegarden from '@assets/images/brands/hoegaarden.png'
import Iliada from '@assets/images/brands/iliada.png'
import Kronenbourg from '@assets/images/brands/kronenbourg.png'
import Minutemaid from '@assets/images/brands/minutemaid.png'
import NaturelLogo from '@assets/images/brands/naturel.png'
import Okeanoss from '@assets/images/brands/okeanoss.png'
import Pasar from '@assets/images/brands/pasar.png'
import Paulaner from '@assets/images/brands/paulaner.png'
import SierraNevada from '@assets/images/brands/sierra-nevada.png'
import Singha from '@assets/images/brands/singha.png'
import Skol from '@assets/images/brands/skol.png'
import Stella from '@assets/images/brands/stella.png'
import Sunshine from '@assets/images/brands/sunshine.png'
import TastyFoodAffair from '@assets/images/brands/tasty-food-affair.png'
import TigerBrand from '@assets/images/brands/tiger-brand.png'
import Tsingtao from '@assets/images/brands/tsingtao.png'
import Watties from '@assets/images/brands/watties.png'

import s from './brands-slider.module.scss'

const brands = [
	{ img: FourPinesLogo, alt: '4 pines company logo' },
	{ img: AsahiLogo, alt: 'Asahi company logo' },
	{ img: AwsMarketLogo, alt: 'Aw\'s market company logo' },
	{ img: BlueMoonLogo, alt: 'Blue moon company logo' },
	{ img: Casolana, alt: 'Casolana company logo' },
	{ img: CongaraFoodsInc, alt: 'Congara foods inc. company logo' },
	{ img: Corona, alt: 'Corona company logo' },
	{ img: Emborg, alt: 'Emborg company logo' },
	{ img: FairPrice, alt: 'Fair price company logo' },
	{ img: Fresh, alt: 'Fresh company logo' },
	{ img: Gardenia, alt: 'Gardenia company logo' },
	{ img: GeneralMillsInc, alt: 'General mills inc. company logo' },
	{ img: Hoegarden, alt: 'Hoegarden company logo' },
	{ img: Iliada, alt: 'Iliada company logo' },
	{ img: Kronenbourg, alt: 'Kronenbourg company logo' },
	{ img: Minutemaid, alt: 'Minutemaid company logo' },
	{ img: NaturelLogo, alt: 'Naturel company logo' },
	{ img: Okeanoss, alt: 'Okeanoss company logo' },
	{ img: Pasar, alt: 'Pasar company logo' },
	{ img: Paulaner, alt: 'Paulaner company logo' },
	{ img: SierraNevada, alt: 'Sierra nevada company logo' },
	{ img: Singha, alt: 'Singha company logo' },
	{ img: Skol, alt: 'Skol company logo' },
	{ img: Stella, alt: 'Stella company logo' },
	{ img: Sunshine, alt: 'Sunshine company logo' },
	{ img: TastyFoodAffair, alt: 'Tasty food affair company logo' },
	{ img: TigerBrand, alt: 'Tiger brand company logo' },
	{ img: Tsingtao, alt: 'Tsingtao company logo' },
	{ img: Watties, alt: 'Watties company logo' },
]

const shuffleArray = (array) => {
	return array
		.map((item) => ({ item, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ item }) => item)
}

export const BrandsSlider = () => {
	const [randomBrands, setRandomBrands] = useState([])

	useEffect(() => {
		// check if we already stored selection for this session
		const stored = sessionStorage.getItem('randomBrands')

		if (stored) {
			setRandomBrands(JSON.parse(stored))
		} else {
			// create new random 10 brands
			const selected = shuffleArray(brands).slice(0, 10)
			setRandomBrands(selected)
			sessionStorage.setItem('randomBrands', JSON.stringify(selected))
		}
	}, [])

	const responsive = {
		0: {
			items: 5,
		},
	}

	const items = randomBrands.map((brand, index) => {
		return (
			<div className={s.item} key={index} style={{ padding: '0 15px' }}>
				<img className={s.logo} src={brand.img} alt={brand.alt} draggable='false' />
			</div>
		)
	})

	return (
		<div className='container'>
			<div className={s.box}>
				<AliceCarousel
					responsive={responsive}
					items={items}
					infinite={true}
					disableDotsControls={true}
					disableButtonsControls={true}
					mouseTracking={true}
					animationDuration={250}
				/>
			</div>
		</div>
	)
}
