import { GridProvider } from '@context/GridContext'

import { useProducts } from '@hooks/services/useProducts'

import { Pagination } from '@shared/components/Pagination/Pagination'

import { ShopList } from './ShopList/ShopList'
import { ShopSort } from './ShopSort/ShopSort'
import { Sidebar } from './Sidebar/Sidebar'

import s from './shop.module.scss'

export const Shop = () => {
	const { products, meta, isLoading } = useProducts()

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className={s.main}>
						<GridProvider>
							<ShopSort meta={meta} />
							<ShopList products={products} isLoading={isLoading} />
						</GridProvider>
						<Pagination meta={meta} isLoading={isLoading} />
					</div>
					<div className={s.sidebar}>
						<Sidebar meta={meta} />
					</div>
				</div>
			</div>
		</>
	)
}
