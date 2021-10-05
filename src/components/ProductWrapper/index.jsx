import { ProductDetails, RelatedProducts } from ".."
import { useState, useEffect} from "react"
import { productsAPI } from "../../api"
import { useParams } from "react-router"
import { ProductSpec } from "../ProductSpec"

export const ProductWrapper = () => {
	const { id } = useParams()
	const [product, setProduct] = useState([''])
    useEffect(()=>{
        const fetchdata = async ()=> {
            try {
                const data = await productsAPI.getProduct(id)
 
                setProduct(data)
            } catch(e) {
                console.log(e)
            }
            
        }
        fetchdata()
        
    }, [id])
    return (
        <div className="container">
            {product.map((prod)=>{
                if(prod.id!==undefined){
                    return (
                        <div key={prod.id}>
                            <ProductDetails product={prod} />
                            <ProductSpec product={prod}/>
                            <RelatedProducts name={prod.name} id={id} category={prod.category} />
                        </div>
                    )
                }
                return null
            })}
        </div>
    )
}