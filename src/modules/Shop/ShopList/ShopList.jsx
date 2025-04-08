import cn from 'classnames'

import { ProductCard } from '@components/ProductCard/ProductCard'
import { gridTypes, useGridContext } from '@context/GridContext'
import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { ItemsNotFound } from '@shared/components/UI/ItemsNotFound/ItemsNotFound'

import s from './shop-list.module.scss'

export const ShopList = ({ products, loading }) => {
	const { grid } = useGridContext()

	// TODO: add animation grid change (grid)
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
						<ProductCard key={index} product={product} size={grid === gridTypes[2].type ? 'row' : 'lg'} imgSize='md' />
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
