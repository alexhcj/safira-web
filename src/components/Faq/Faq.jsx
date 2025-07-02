import { useState } from 'react'

import cn from 'classnames'

import ArrowSVG from '@assets/svg/arrow.svg?react'

import s from './faq.module.scss'

const questions = [
	{
		title: 'What are your delivery hours and areas?',
		text: 'We deliver Monday through Sunday from 8 AM to 10 PM. Our delivery area covers most metropolitan areas within a 25-mile radius of our distribution centers. You can check if we deliver to your location by entering your zip code during checkout. Same-day delivery is available for orders placed before 2 PM.',
	},
	{
		title: 'How do you ensure food freshness during delivery?',
		text: 'All perishable items are stored in temperature-controlled facilities and transported in insulated bags or refrigerated vehicles. Frozen items are packed with dry ice, and fresh produce is carefully selected and packed to maintain quality. We guarantee freshness upon delivery or offer a full refund.',
	},
	{
		title: 'What payment methods do you accept?',
		text: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and EBT/SNAP for eligible food items. Payment is processed securely through encrypted checkout, and you can save multiple payment methods to your account for faster ordering.',
	},
	{
		title: 'Can I modify or cancel my order after placing it?',
		text: 'Orders can be modified or cancelled within 1 hour of placement if they haven`t entered the preparation stage. After this window, changes may not be possible. You can track your order status in real-time through your account dashboard or our mobile app.',
	},
	{
		title: 'Do you offer organic and specialty diet options?',
		text: 'Yes! We carry a wide selection of organic produce, gluten-free products, vegan and vegetarian options, keto-friendly items, and allergen-free alternatives. Use our advanced filters to easily find products that match your dietary preferences and restrictions.',
	},
	{
		title: 'What is your return and refund policy?',
		text: 'We offer a 100% satisfaction guarantee. If you`re not happy with any item, contact us within 24 hours of delivery for a full refund or replacement. For damaged or spoiled items, we provide immediate refunds and investigate with our quality control team to prevent future issues.',
	},
	{
		title: 'Do you offer bulk ordering or wholesale prices?',
		text: 'Yes, we offer bulk pricing for orders over $200 and wholesale accounts for businesses, restaurants, and institutions. Bulk customers enjoy discounted rates, priority delivery scheduling, and dedicated customer support. Contact our business sales team to set up a wholesale account.',
	},
	{
		title: 'How do I track my order and delivery?',
		text: 'Once your order is confirmed, you`ll receive tracking information via email and SMS. You can monitor your order`s progress through our website or mobile app, including when it`s being prepared, packed, and out for delivery. You`ll get a notification when the driver is 10 minutes away.',
	},
	{
		title: 'Are there any delivery fees or minimum order requirements?',
		text: 'Delivery is free for orders over $35. Orders under $35 have a $4.99 delivery fee. We also offer a premium membership program for $9.99/month that includes free delivery on all orders, exclusive discounts, and early access to sales and new products.',
	},
]

export const Faq = () => {
	const [checkedQuestions, setCheckedQuestions] = useState([]) // user already looked
	const [activeQuestions, setActiveQuestions] = useState([]) // currently opened

	const handleActiveQuestions = (index) => {
		setActiveQuestions(
			activeQuestions.includes(index) ? activeQuestions.filter((item) => item !== index) : [...activeQuestions, index],
		)
	}

	return (
		<div className='container'>
			<h3 className={s.title}>Below are frequently asked questions, you may find the answer for yourself</h3>
			<p className={s.text}>
				This FAQ covers the most common concerns customers have when ordering food online: delivery logistics, food
				safety, payment options, order management, dietary needs, customer service policies, bulk ordering, order
				tracking, and fees. Each answer provides specific, actionable information that would be helpful for actual
				customers.
			</p>
			<ul className={s.accordion}>
				{questions.map(({ title, text }, index) => (
					<li className={s.accordion__item} key={index}>
						<input type='checkbox' id={'acc' + index} className={s.accordion__toggle} hidden />
						<label
							htmlFor={'acc' + index}
							className={cn(s.accordion__label, { [s.checked]: checkedQuestions.includes(index) })}
							onClick={() => {
								handleActiveQuestions(index)
								setCheckedQuestions([...checkedQuestions, index])
							}}
						>
							{title}
							<ArrowSVG
								className={cn(s.accordion__icon, {
									[s.checked]: checkedQuestions.includes(index),
									[s.unchecked]: !checkedQuestions.includes(index),
									[s.active]: activeQuestions.includes(index),
								})}
							/>
						</label>
						<div className={s.accordion__content}>{text}</div>
					</li>
				))}
			</ul>
		</div>
	)
}
