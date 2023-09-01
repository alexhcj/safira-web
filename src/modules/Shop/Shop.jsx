import React from 'react'
import { GridProvider } from '../../context/GridContext'
import { useProducts } from '../../hooks/services/useProducts'
import { ShopList } from './ShopList/ShopList'
import { ShopSort } from './ShopSort/ShopSort'
import { ItemsNotFound } from '../../shared/components/UI/ItemsNotFound/ItemsNotFound'
import { Sidebar } from './Sidebar/Sidebar'
import { Pagination } from '../../shared/components/Pagination/Pagination'
import s from './shop.module.scss'

export const Shop = () => {
	const { products, meta, loading } = useProducts()

	return (
		<>
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.main}>
						<GridProvider>
							<ShopSort meta={meta} />
							{products.length !== 0 ? (
								<ShopList products={products} loading={loading} />
							) : (
								<ItemsNotFound type='product' />
							)}
						</GridProvider>
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
