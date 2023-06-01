import React from 'react'
import { ProductCard } from '../../ProductCard/ProductCard'
import s from './shop-list.module.scss'

export const ShopList = ({ products }) => {
	return (
		<div className={s.items}>
			{products.map((product, index) => {
				return (
					<div className={s.col} key={index}>
						<ProductCard product={product} size='large' />
					</div>
				)
			})}
		</div>
	)
}
