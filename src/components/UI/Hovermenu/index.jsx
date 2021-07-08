import { CartSVG, HeartSVG, MagnifierSVG, SyncSVG } from '../../svg'
import { PopupBtn } from '../../UI/Buttons'
import classNames from 'classnames/bind'
import s from './hovermenu.module.css'

let cx = classNames.bind(s)

export const Hovermenu = ({ menuToggle, size }) => {
	let menuCN = cx('menu', { active: menuToggle, large: size })

	return (
		<div className={menuCN}>
			<PopupBtn to='/shop' text='Add to Cart'>
				<CartSVG />
			</PopupBtn>
			<PopupBtn to='/shop' text='Quick View'>
				<MagnifierSVG />
			</PopupBtn>
			<PopupBtn to='/shop' text='Add to Wishlist'>
				<HeartSVG />
			</PopupBtn>
			<PopupBtn to='/shop' text='Add to Compare'>
				<SyncSVG />
			</PopupBtn>
		</div>
	)
}

// TODO: refactor buttons. add handlers, routes, data flow
// TODO: when hover on btn => popup appears. expectation: when mouselave from btn => popup disappears. real: if fast hover mouse on appeared popup => it still showed