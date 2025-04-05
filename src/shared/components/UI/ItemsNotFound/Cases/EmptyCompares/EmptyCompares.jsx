import { NavLink } from 'react-router-dom'
import { Button } from '../../../Buttons/Button/Button'
import { ReactComponent as EmptyCompareSVG } from '../../../../../../assets/svg/empty-compare.svg'
import s from './empty-compares.module.scss'

export const EmptyCompares = () => {
	return (
		<div className={s.box}>
			<EmptyCompareSVG className={s.image} />
			<h3 className={s.title}>Compares list is empty</h3>
			<p className={s.text}>
				You could select products to compare in{' '}
				{
					<NavLink className={s.link} to='/categories'>
						catalog
					</NavLink>
				}
				<br />
				Compare. Choose. Buy.
			</p>
			<div className={s.actions}>
				<Button>
					<NavLink className={s.button_text} to='/'>
						Home
					</NavLink>
				</Button>
				<Button>
					<NavLink className={s.button_text} to='/categories'>
						Catalog
					</NavLink>
				</Button>
			</div>
		</div>
	)
}
