import React, { useEffect, useState } from 'react'
import { productsAPI } from '../../api/products'
import 'react-multi-carousel/lib/styles.css'
// import { SliderSection } from '../SliderSection/SliderSection'

export const Mostview = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const params = {
			sort: 'views',
			limit: 10,
		}

		const fetchData = async () => {
			try {
				const data = await productsAPI.getAll(params)
				setProducts(data.data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

	return (
		<div>
			{/*<OneRowProductSlider
			 heading={'Mostview Products'}
			  above_heading={'Recently added our store'}
			  products={products} />*/}
		</div>
	)
}

// TODO: create sliders layout 1.main (fullwidth | big) 2.
//  best && new (column slider) with outdoor controls 3. mostview && ourblog (common)
