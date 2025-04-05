import cn from 'classnames'
import { gridTypes, useGridContext } from '../../../context/GridContext'
import s from './shop-list-layout.module.scss'

export const ShopListLayout = () => {
	const { grid, setGrid } = useGridContext()

	const changeGridLayout = (id) => {
		setGrid(gridTypes[id - 1].type)
	}

	return (
		<ul className={s.list}>
			{gridTypes.map((item) => (
				<li className={s.item} key={item.id} onClick={() => changeGridLayout(item.id)}>
					<img className={cn(s.image, { [s.active]: grid === item.type })} src={item.img} alt={item.alt} />
					<span className={s.tooltip}>{item.name}</span>
				</li>
			)
			)}
		</ul>
	)
}
