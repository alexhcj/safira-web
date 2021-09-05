import s from './OneRowProductSlider.module.css'
import { useState } from 'react'
import { ButtonGroup } from '../../MainSlider/Controls/BtnGroup'
import { Product } from '../../Product'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export const OneRowProductSlider = ({products, heading, above_heading, id}) => {
    const [btnShow, setBtnShow] = useState(false)
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 5,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 5,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 5,
		},
	}

	const handleBtnGroupToggle = (e) => {
		e.type === 'mouseenter' ? setBtnShow(true) : setBtnShow(false)
	}
    return (
    <div className={s.section}>
        <div className='container'>
            <div className={s.block}>
                <h5 className={s.above_heading}>{above_heading}</h5>
                <h3 className={s.heading}>{heading}</h3>
                <div className={s.slider} onMouseEnter={handleBtnGroupToggle} onMouseLeave={handleBtnGroupToggle}>
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                        swipeable={false}
                        draggable={false}
                        customTransition='transform 250ms ease'
                        containerClass={s.slider__container}
                        itemClass={s.slide}
                        arrows={false}
                        renderButtonGroupOutside={true}
                        customButtonGroup={<ButtonGroup active={btnShow} />}
                    >
                        {products.map((product) => {
                            if(product.id===id){
                                return
                            }
                            console.log(product.id)
                            return <Product size='large' key={product.id} product={product} />
                        })}
                    </Carousel>
                </div>
            </div>
        </div>
    </div>
    )
}