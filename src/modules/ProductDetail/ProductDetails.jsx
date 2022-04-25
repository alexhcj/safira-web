import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {productsAPI} from "../../api/products";
import { GoodToCart } from '../../shared/components/GoodToCart'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
// import {ProductSpecification} from "../../components/ProductSpecification/ProductSpecification";
// import {RelatedProducts} from "../../components/RelatedProducts";
import {Border} from "../../shared/components/UI/Spacing/Border";
import {Space} from "../../shared/components/UI/Spacing/Space";
import {Text} from "../../shared/components/UI/Text/Text";
import {Rating} from "../../shared/components/Rating/Rating";
import s from './productdetails.module.scss'
import {Title} from "../../shared/components/UI/Title/Title";
import {Price} from "../../components/Price/Price";
import PreloaderSVG from "../../assets/svg/preloader.svg";

export const ProductDetails = () => {
    const {slug} = useParams()
    const [product, setProduct] = useState([])

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const {product} = await productsAPI.findOne(slug)
                setProduct(product)
            } catch(e) {
                console.log(e)
            }

        }
        fetchData()

    }, [slug])

    const { name, img, price, description, category, quantity, rating } = product

    return (
        <div className="container">
            <div className={s.product}>
                <div className={s.img}>
                    {img ? <ImageWithFallback className={s.product_img} src={img} imgSize='xl' alt={name} /> :
											<img src={PreloaderSVG} alt="Preloader"/>	}
                </div>
                <div className={s.content}>
										<Title tag='h4' type="title">{name}</Title>
                    <Space size="ss" />
										<Rating rating={rating} />
                    <Space size="xss" />
										{price && <Price price={price.price} discount_price={price.discount_price} />}
                    <Space size="xs" />
                    <Text>{description}</Text>
                    <Space size="m" />
                    <Border />
                    <Space size="m" />
                    <GoodToCart quantity={quantity} />
										<Space size="m" />
                    <div className={s.category}>
                        <Text span weight="medium">Category:</Text>
												{/* TODO: add redirect to shop with category filter */}
												<NavLink to='/shop'>
													<Text className={s.tag} span>{category}</Text>
												</NavLink>
                    </div>
                </div>
								<Space size="l" />
                {/*<ProductSpecification product={product}/>*/}
                {/*<RelatedProducts name={prod.name} id={id} category={prod.category} />*/}
            </div>
        </div>
    )
}
