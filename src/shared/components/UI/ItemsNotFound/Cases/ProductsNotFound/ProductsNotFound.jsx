import { ReactComponent as ProductsNotFoundSVG } from '../../../../../../assets/svg/products-not-found.svg'
import s from './products-not-found.module.scss'

export const ProductsNotFound = () => {
	return (
		<div className={s.box}>
			<ProductsNotFoundSVG className={s.image} />
			<h3 className={s.title}>Products not found</h3>
			<p className={s.text}>
				Your search did not match any products.
				<br />
				Please modify it or try later.
			</p>
		</div>
	)
}
