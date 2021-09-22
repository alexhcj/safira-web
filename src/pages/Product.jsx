import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ProductDetails, RelatedProducts } from '../components'
import { Breadcrumbs, Divider } from '../components/UI'
import { productsAPI } from '../api'

export const Product = () => {
    const location = useLocation()
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
		<div>
			<Breadcrumbs />
			{product.map((prod)=>{
                if(prod.id!==undefined){
                    return (
						<div key={prod.id} className="container">
							<ProductDetails product={prod} />
							<RelatedProducts name={location.state.name} id={id} category={location.state.category} />
						</div>
                    )
                } else {
                    console.log('here')
					return (
                    
                        <div key={'not found'} className="container">
                            <h1>NOT FOUND</h1>
                        </div>
                    )
                    
				}
            })}
			<Divider />
		</div>
	)
}
