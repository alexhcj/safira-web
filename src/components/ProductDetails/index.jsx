import s from './ProductDetails.module.css'
import { ProductFunctional } from './ProductFunctional'

export const ProductDetails = ({product}) => {
    let {name, img, price, newprice, description, category, quantity} = product
    return (
        <section className={s.section}>
                            <img src={img} alt="product" className={s.img} />
                            <div className={s.info_container}>
                                <p className={s.name}>{name}</p>
                                    
                                    <div className={s.rating}></div>

                                <p className={s.price}>
                                    ${newprice}
                                    <span className={s.oldprice}>${price}</span>
                                </p>
                                <p className={s.description}>{description}</p>
                                <div className={s.divider}></div>
                                <ProductFunctional quantity={quantity} />
                                <p className={s.category}>Category: <span className={s.category_span}>{category}</span></p>
                            </div>
        </section>
    )
}