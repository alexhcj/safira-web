import { ProductFunctional } from './ProductFunctional'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import s from './ProductDetails.module.css'
import stars from '../../assets/images/stars.png'

export const ProductDetails = ({ product }) => {
    let { name, img, price, newprice, description, category, quantity, rating } = product
    let pxDiff
    if (rating > 4) {
        pxDiff = 12
    } else if (rating > 3) {
        pxDiff = 9
    } else if (rating > 2) {
        pxDiff = 6
    } else if (rating > 1) {
        pxDiff = 3
    } else {
        pxDiff = 0
    }
    rating = rating * 12.5 + pxDiff

    return (
        <section className={s.section}>
            <ImageWithFallback className={s.img} src={img} imgSize='xl' />
            <div className={s.info_container}>
                <p className={s.name}>{name}</p>
                <div className={s.rating_container}>
                    <div className={s.rating} style={{ width: rating }}></div>
                    <img src={stars} className={s.img_stars} alt='rating' />
                </div>
                <p className={s.price}>
                    ${newprice}
                    <span className={s.oldprice}>${price}</span>
                </p>
                <p className={s.description}>{description}</p>
                <div className={s.divider}></div>
                <ProductFunctional quantity={quantity} />
                <p className={s.category}>
                    Category: <span className={s.category_span}>{category}</span>
                </p>
            </div>
        </section>
    )
}
