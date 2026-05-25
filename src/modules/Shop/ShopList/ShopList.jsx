import cn from 'classnames'

import { useGridContext } from '@context/GridContext'

import { ProductCard } from '@components/ProductCard/ProductCard'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { ItemsNotFound } from '@shared/components/UI/ItemsNotFound/ItemsNotFound'

import s from './shop-list.module.scss'

const gridTypesToProduct = {
	'grid-1': 'lg',
	'grid-2': 'lg',
	'grid-3': 'lg',
	'grid-4': 'md-lg',
	'grid-list': 'list',
}

export const ShopList = ({ products, loading }) => {
	const { grid } = useGridContext()

	return (
		<>
			{loading && (
				<div className={s.center}>
					<Preloader width={50} height={50} />
				</div>
			)}
			{!loading && products.length !== 0 && (
				<div className={cn(s.grid, s[`${grid}`])}>
					{products.map((product, index) => (
						<ProductCard key={index} product={product} size={gridTypesToProduct[grid]} imgSize='md' />
					))}
				</div>
			)}
			{!loading && products.length === 0 && (
				<div className={s.center}>
					<ItemsNotFound type='product' />
				</div>
			)}
		</>
	)
}
