import s from './faq.module.scss'

const questionsList = [
	{
		title: 'Free Home Delivery',
		text: (
			<>
				<p>Enjoy free delivery on orders over $75.</p>
				<p>
					Our refrigerated trucks ensure your groceries arrive fresh and ready to enjoy. We offer flexible delivery
					windows to fit your schedule, including same-day delivery for urgent needs.
				</p>
			</>
		),
	},
	{
		title: 'Corporate Catering Solutions',
		text: (
			<>
				<p>Specialized bulk ordering and catering services for businesses, offices, and events.</p>
				<p>
					From daily office snacks to large corporate events, we provide customized food solutions with volume discounts
					and dedicated account management.
				</p>
			</>
		),
	},
	{
		title: '100% Organic Foods',
		text: (
			<>
				<p>Extensive selection of certified organic produce, dairy, meat, and pantry staples.</p>
				<p>
					We work directly with organic farmers and certified suppliers to bring you pesticide-free, non-GMO options for
					healthier living.
				</p>
			</>
		),
	},
	{
		title: 'Meal Planning Packages',
		text: (
			<>
				<p>Curated meal kits and family packages designed by our nutritionists.</p>
				<p>
					Choose from weekly meal plans, dietary-specific options (keto, vegan, gluten-free), and seasonal menus that
					take the guesswork out of healthy eating.
				</p>
			</>
		),
	},
]

export const Faq = () => {
	return (
		<div className={s.box}>
			<h3 className={s.title}>What can we do for you ?</h3>
			<div className={s.accordion}>
				{questionsList.map((item, index) => (
					<div className={s.accordion__item} key={index}>
						<input type='checkbox' id={'acc' + index} className={s.accordion__toggle} hidden />
						<label htmlFor={'acc' + index} className={s.accordion__label}>
							{item.title}
						</label>
						<div className={s.accordion__content}>{item.text}</div>
					</div>
				))}
			</div>
		</div>
	)
}
