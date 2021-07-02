import s from "./mostview.module.css";
import { useEffect, useState } from 'react'
import { productsAPI } from '../../api'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export const Mostview = () => {
  const [bestsellers, setBestsellers] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await productsAPI.getBestsellers()
				setBestsellers(data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

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

	return (
    <div className={s.section}>
      <div className="container">
        <div className={s.block}>
        <h5 className={s.above_heading}>Recently added our store </h5>
        <h3 className={s.heading}>Mostview Products</h3>
		<Carousel responsive={responsive} infinite={true} swipeable={false} draggable={false}>
			{bestsellers.map((slide) => {
				const { id, name, img, category, price, newprice, newProduct, sale} = slide
        let saleTxt = ''
        let newTxt = ''
        
        if(sale===true){
          saleTxt = 'SALE'
        }
        if(newProduct===true){
          newTxt = 'NEW'
        }
        
				return (
					<div className={s.item} key={id}>
						
              <p className={s.sale}>{saleTxt}</p>
              <p className={s.new}>{newTxt}</p>
              <img className={s.img} src={img} alt={name}/>
              <div className={s.product__info}>
                <h3 className={s.name}>{name}</h3>
                <h4 className={s.category}>{category}</h4>
                <p className={s.price}>{newprice}<span className={s.oldprice}>{price}</span></p>
              </div>
           
          </div>
        )
      
			})}
      
		</Carousel>
        </div>
      </div>
    </div>
	)
};
