import { useEffect, useState } from 'react'
import { productsAPI } from '../../../api'
import { Product } from '../../Product'
import s from './shoplist.module.css'

export const ShopList = ({ sort, searchList }) => {
    const [products, setProducts] = useState([])
    const limit = 12

    useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await productsAPI.getProducts(limit, searchList)
				setProducts(data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [searchList])
    
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
