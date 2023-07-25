import React from 'react'
import { useProducts } from '../../hooks/useProducts'
import { ShopList } from './ShopList/ShopList'
import { ShopSort } from './ShopSort/ShopSort'
import { Sidebar } from './Sidebar/Sidebar'
import { Pagination } from '../../shared/components/Pagination/Pagination'
import s from './shop.module.scss'

export const Shop = () => {
	const { data, meta, loading } = useProducts()

	return (
		<>
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.main}>
						<ShopSort meta={meta} />
						<ShopList products={data} />
						<Pagination meta={meta} />
					</div>
					<div className={s.sidebar}>
						<Sidebar isLoading={loading} />
					</div>
				</div>
			</div>
		</>
	)
}
