import {ReactComponent as CartSVG} from '../../../../assets/svg/cart.svg'
import {ReactComponent as HeartSVG} from '../../../../assets/svg/heart.svg'
import {ReactComponent as MagnifierSVG} from '../../../../assets/svg/magnifier.svg'
import {ReactComponent as SyncSVG} from '../../../../assets/svg/sync.svg'
import classNames from 'classnames/bind'
import s from './hovermenu.module.css'
import {ButtonPopup} from "../Buttons/ButtonPopup/ButtonPopup";

let cx = classNames.bind(s)

export const Hovermenu = ({ menuToggle, size }) => {
	let menuCN = cx('menu', { active: menuToggle, large: size })

	return (
		<div className={menuCN}>
			<ButtonPopup to='/shop' text='Add to Cart'>
				<CartSVG />
			</ButtonPopup>
			<ButtonPopup to='/shop' text='Quick View'>
				<MagnifierSVG />
			</ButtonPopup>
			<ButtonPopup to='/shop' text='Add to Wishlist'>
				<HeartSVG />
			</ButtonPopup>
			<ButtonPopup to='/shop' text='Add to Compare'>
				<SyncSVG />
			</ButtonPopup>
		</div>
	)
}


// const btns = [
// 	{ id: 1, link: '/shop', text: 'Add to Cart', svg: <CartSVG /> },
// 	{ id: 2, link: '/shop', text: 'Quick View', svg: <MagnifierSVG /> },
// 	{ id: 3, link: '/shop', text: 'Add to Wishlist', svg: <HeartSVG /> },
// 	{ id: 4, link: '/shop', text: 'Add to Compare', svg: <SyncSVG /> },
// ]

// export const Hovermenu = ({ menuToggle, size }) => {
// 	const [btnToggle, setBtnToggle] = useState(false)

// 	let menuCN = cx('menu', { active: menuToggle, large: size })

// 	return (
// 		<div className={menuCN}>
// 			{btns.map((btn) => {
// 				const { id, link, text, svg } = btn

// 				return (
// 					<PopupBtn
// 						key={id}
// 						to={link}
// 						text={text}
// 						children={svg}
// 						// onMouseEnter={setBtnToggle(!btnToggle)}
// 						// onMouseLeave={setBtnToggle(!btnToggle)}
// 					/>
// 				)
// 			})}
// 		</div>
// 	)
// }


// TODO: refactor buttons. add handlers, routes, data flow
// TODO: when hover on btn => popup appears. expectation: when mouselave from btn => popup disappears. real: if fast hover mouse on appeared popup => it still showed
// BUG: hover on product img near popup hover element mouse get triggered from default cursor to hover state
