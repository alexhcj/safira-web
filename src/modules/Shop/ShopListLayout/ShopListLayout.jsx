import cn from 'classnames'

import { useGridContext } from '@context/GridContext'

import s from './shop-list-layout.module.scss'

export const ShopListLayout = () => {
	const { grid, handleSetGrid, availableGrids } = useGridContext()

	return (
		<ul className={s.list}>
			{availableGrids.map((item) => (
				<li className={s.item} key={item.type} onClick={() => handleSetGrid(item.type)}>
					<img className={cn(s.image, { [s.active]: grid === item.type })} src={item.img} alt={item.alt} />
					<span className={s.tooltip}>{item.name}</span>
				</li>
			))}
		</ul>
	)
}
