import React, { useContext } from 'react'
import cn from 'classnames'
import { GridContext } from '../Shop'
import GridImage1 from '../../../assets/images/shop/grid-3.png'
import GridImage2 from '../../../assets/images/shop/grid-4.png'
import GridImage3 from '../../../assets/images/shop/grid-list.png'
import s from './shop-list-layout.module.scss'

export const ShopLayoutTypes = [
	{ id: 1, type: 'grid-3', name: '3', img: GridImage1, alt: 'Products 3-column grid' },
	{ id: 2, type: 'grid-4', name: '4', img: GridImage2, alt: 'Products 4-column grid' },
	{ id: 3, type: 'grid-list', name: 'List', img: GridImage3, alt: 'Products list grid' },
]

export const ShopListLayout = () => {
	const { productsGrid, setProductsGrid } = useContext(GridContext)

	const changeGridLayout = (id) => {
		setProductsGrid(ShopLayoutTypes[id - 1].type)
	}

	return (
		<ul className={s.list}>
			{ShopLayoutTypes.map((grid) => (
				<li className={s.item} key={grid.id} onClick={() => changeGridLayout(grid.id)}>
					<img className={cn(s.image, { [s.active]: productsGrid === grid.type })} src={grid.img} alt={grid.alt} />
					<span className={s.tooltip}>{grid.name}</span>
				</li>
			)
			)}
		</ul>
	)
}
