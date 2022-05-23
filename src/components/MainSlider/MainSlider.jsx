import Carousel from 'react-multi-carousel'
import { Dot } from './Controls/Dot/Dot'
import {Button} from "../../shared/components/UI/Buttons/Button/Button";
import {Text} from "../../shared/components/UI/Text/Text";
import 'react-multi-carousel/lib/styles.css'
import Slide1 from '../../assets/images/slider/1.jpg'
import Slide2 from '../../assets/images/slider/2.jpg'
import Slide3 from '../../assets/images/slider/3.jpg'
import s from './main-slider.module.scss'

const slides = [
	{
		id: 1,
		title: "Vegetables big sale",
		subTitle: "Fresh farm products",
		text: "10% certifled-organic mix of fruit and veggies. Perfect for weekly cooking and snacking!",
		img: Slide1
	},
	{
		id: 2,
		title: "Fresh vegetables",
		subTitle: "Natural farm products",
		text: "Widest range of farm-fresh Vegetables, Fruits & seasonal produce",
		img: Slide2
	},
	{
		id: 3,
		title: "Fresh tomatoes",
		subTitle: "Natural farm products",
		text: "Natural organic tomatoes make your health stronger. Put your information here",
		img: Slide3
	}
]

export const MainSlider = () => {
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 1,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	}

	return (
		<div className={s.slider}>
				<Carousel
					responsive={responsive}
					autoPlay={true}
					autoPlaySpeed={5000}
					swipeable={true}
					draggable={true}
					showDots={true}
					infinite={true}
					arrows={false}
					dotListClass={s.list}
					customDot={<Dot />}
				>
					{slides.map((slide) => {
						const { id, title, subTitle, text, img } = slide

						return (
							<div className={s.item} key={id}>
								<img src={img} alt={title} />
								<div className={s.inner}>
									<div className='container'>
										<div className={s.content}>
											<h1 className={s.title}>{title}</h1>
											<h2 className={s.subTitle}>{subTitle}</h2>
											<p className={s.text}>{text}</p>
											<Button to='/shop'>
												<Text className={s.btn_text} color="white">Read more</Text>
											</Button>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</Carousel>
		</div>
	)
}

// BUG: fix appearence of 2nd slide when refresh page (infinite)
// : infinite param causes 2nd slide appear when page renders
// : if add isLoading state => will appear always last slide and no matter of quantity slides in db
// : if no isLoading state => will appear last - 1 slide

// TODO: fix jumping content
