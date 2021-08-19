import { useEffect, useState } from 'react'
import s from './ShopSideBar.module.css'
import { productsAPI } from '../../../api'
import { convertArray } from '../../../utils'

export const ShopSideBar = () => {
    const [featuredProducts, setFeaturedProducts] = useState([])
    useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await productsAPI.getProducts()
				setFeaturedProducts(convertArray(data, 3))
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])
    function  searchByName(event) {
        let nameSearch = event.target.value
        
        

        if(nameSearch.length<=3){
            let z
        } else {
            let x
        }

    }

    return (
    <section>
        <input type="text" onInput={searchByName}/>
    </section>
    )
}