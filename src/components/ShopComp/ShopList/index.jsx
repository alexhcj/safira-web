import { useEffect, useState } from 'react'
import { productsAPI } from '../../../api'
import { Product } from '../../Product'
import s from './shoplist.module.css'

export const ShopList = ({ search, sort, order }) => {
	const [products, setProducts] = useState([])
	const limit = 12
    const tags = 'new'

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (sort === 'added') {
					const data = await productsAPI.getProductsByTags(limit, sort, tags, order)
					setProducts(data)
				} else {
					const data = await productsAPI.getProducts(limit, search, sort, order)
					setProducts(data)
				}
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [search, sort, order])

	return (
		<div className={s.items}>
			{products.map((product) => {
				return (
					<div className={s.col} key={product.id}>
						<Product product={product} size='large' />
					</div>
				)
			})}
		</div>
	)
}
