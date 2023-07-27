import React, { createContext, useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { ShopList } from './ShopList/ShopList'
import { ShopSort } from './ShopSort/ShopSort'
import { Sidebar } from './Sidebar/Sidebar'
import { Pagination } from '../../shared/components/Pagination/Pagination'
import { ShopLayoutTypes } from './ShopListLayout/ShopListLayout'
import s from './shop.module.scss'

export const GridContext = createContext(null)

export const Shop = () => {
	const [productsGrid, setProductsGrid] = useState(ShopLayoutTypes[0].type)
	const { products, meta, loading } = useProducts()

	return (
		<>
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.main}>
						<GridContext.Provider value={{ productsGrid, setProductsGrid }}>
							<ShopSort meta={meta} />
							<ShopList products={products} />
						</GridContext.Provider>
						<Pagination meta={meta} />
					</div>
					<div className={s.sidebar}>
						<Sidebar isLoading={loading} meta={meta} />
					</div>
				</div>
			</div>
		</>
	)
}
