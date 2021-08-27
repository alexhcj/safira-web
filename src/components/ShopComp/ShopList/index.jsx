import { Product } from '../../Product'
import s from './shoplist.module.css'

export const ShopList = ({ products }) => {
	return (
		<div className={s.items}>
			{products.map((product) => {
				return (
					<div className={s.col} key={product.id}>
						<Product product={product} size='large' />
					</div>
				)
			})}
		</div>
	)
}
