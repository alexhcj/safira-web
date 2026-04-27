import cn from 'classnames'

import { formatPrice } from '@utils/number/convert'

import { Text } from '../UI/Text/Text'

import s from './price.module.scss'

// types: 'sm' | 'large'
export const Price = ({ price, discountPrice, type, className }) => {
	return (
		<div className={cn(s.box, type && s[type], className)}>
			{discountPrice && (
				<Text className={s.discount_price} span>
					{formatPrice(discountPrice)}
				</Text>
			)}
			<Text className={cn(s.price, discountPrice && s.default)} span>
				{formatPrice(price)}
			</Text>
		</div>
	)
}
