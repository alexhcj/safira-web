import s from './price.module.scss'
import {Text} from "../../shared/components/UI/Text/Text";

export const Price = ({price, discount_price}) => {
	return (
		<div className={s.box}>
			<Text span size="price" color="primary">${discount_price}</Text>
			<Text span size="discount_price">${price}</Text>
		</div>
	)
}
