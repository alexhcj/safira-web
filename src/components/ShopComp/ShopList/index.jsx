import { Product } from '../../Product'
import s from './shoplist.module.css'

export const ShopList = ({ currentProducts }) => {
	return (
		<div className={s.items}>
			{currentProducts.map((product) => {
				return (
					<div className={s.col} key={product.id}>
						<Product product={product} size='large' />
					</div>
				)
			})}
		</div>
	)
}
