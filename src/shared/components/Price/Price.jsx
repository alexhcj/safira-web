import cn from 'classnames'

import { formatPrice } from '@utils/number/convert'

import { Text } from '../UI/Text/Text'

import s from './price.module.scss'

export const Price = ({ price, discount_price, type, className }) => {
	return (
		<div className={cn(s.box, type && s[type], className)}>
			{discount_price && (
				<Text className={s.discount_price} span>
					{formatPrice(discount_price)}
				</Text>
			)}
			<Text className={cn(s.price, discount_price && s.default)} span>
				{formatPrice(price)}
			</Text>
		</div>
	)
}
