import { NavLink } from 'react-router-dom'
// import { ImageWithFallback } from '../../../utils/ImageWithFallback'
// import { Timer } from '../Timer'
import s from './dealsweek.module.scss'
import {Tags} from "../../../shared/components/UI/Tags/Tags";
import {Space} from "../../../shared/components/UI/Spacing/Space";
import {Title} from "../../../shared/components/UI/Title/Title";
import {Text} from "../../../shared/components/UI/Text/Text";
import {Price} from "../../Price/Price";
import {Button} from "../../../shared/components/UI/Buttons/Button/Button";

const data = [
	{id: 1,
		slug: 'purple-passion-fruit',
		name: 'Purple Passion Fruit',
		img: 'https://react-shop-safira.herokuapp.com/public/images/products/purple-passion-fruit/326x326.jpg',
		category: 'Fruits',
		price: 48,
		discount_price: 39.99,
		tags: [
			{text: 'new'}
		]
	}
]

export const DealsWeek = () => {
	const { id, slug, name, tags, price, discount_price, img, category } = data[0]

	const url = {
		pathname: `/products/${slug}`,
		state: {
			name: name,
			category: category,
		},
	}

	return (
		<>
			<h3 className={s.heading}>Deals Of The Week</h3>
			<div key={id} className={s.wrapper}>
				<Tags tags={tags} />
				<div className={s.content}>
					<NavLink to={url}>
						<img src={img} alt="Purple Passion Fruit"/>
					</NavLink>
					<Space space={16} />
					<NavLink className={s.link} to={url}>
						<Title className={s.name} tag="h6">{name}</Title>
					</NavLink>
					<Space space={16} />
					{/* TODO: refactor. make Link Component */}
					<NavLink className={s.link} to='/shop'>
						<Text className={s.category}>{category}</Text>
					</NavLink>
					<Space size="x" />
					{/* TODO: refactor prices font size */}
					<Price price={price} discount_price={discount_price} />
					{/* TODO: on Timer */}
					{/*<Timer time='2022-06-09' />*/}
					<Space size="mm" />
					<Button className={s.btn}>
						<Text span className={s.btn_text} color="white">Add to cart</Text>
					</Button>
				</div>
			</div>
		</>
	)
}
