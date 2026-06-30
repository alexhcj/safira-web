import cn from 'classnames'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'

import AmericanExpress from '@assets/images/payment-methods/american-express.png'
import HSBC from '@assets/images/payment-methods/hsbc.png'
import ICBC from '@assets/images/payment-methods/icbc.png'
import Maestro from '@assets/images/payment-methods/maestro.png'
import Mir from '@assets/images/payment-methods/mir.png'
import Paypal from '@assets/images/payment-methods/paypal.png'
import Visa from '@assets/images/payment-methods/visa.png'

import s from './payment-methods.module.scss'

/**
 * @typedef {Object} PaymentMethod
 * @property {string} id
 * @property {*} img
 * @property {string} alt
 */

/** @type {Readonly<PaymentMethod[]>} */
export const DEFAULT_PAYMENT_METHODS = Object.freeze([
	{ id: 'paypal', img: Paypal, alt: 'Paypal' },
	{ id: 'maestro', img: Maestro, alt: 'Maestro' },
	{ id: 'visa', img: Visa, alt: 'Visa' },
	{ id: 'american-express', img: AmericanExpress, alt: 'American Express' },
	{ id: 'mir', img: Mir, alt: 'Mir' },
	{ id: 'hsbc', img: HSBC, alt: 'Hongkong and Shanghai Banking Corporation' },
	{ id: 'icbc', img: ICBC, alt: 'Industrial and Commercial Bank of China' },
])

/**
 * Renders a list of supported payment method logos.
 *
 * @param {Object} props
 * @param {Readonly<PaymentMethod[]>} [props.methods]
 *        Payment methods to render.
 * @param {'transparent' | 'white'} [props.variant='transparent']
 *        Controls the visual theme of the payment methods list.
 * @param {string} [props.className]
 *        Additional CSS class names applied to the root element.
 */
export const PaymentMethods = ({ methods = DEFAULT_PAYMENT_METHODS, variant = 'transparent', className }) => {
	return (
		<div className={cn(s.list, s[`variant_${variant}`], className)}>
			{methods.map(({ id, img, alt }) => (
				<div className={s.item} key={id}>
					<ImageWithFallback src={img} alt={alt} imgSize='payment-method' onlySrc />
				</div>
			))}
		</div>
	)
}
