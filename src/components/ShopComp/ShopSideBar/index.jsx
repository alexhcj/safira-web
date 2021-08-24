import s from './ShopSideBar.module.css'
import { convertArray } from '../../../utils'
import { productsAPI } from '../../../api'
import { useEffect, useState } from 'react'


export const ShopSideBar = ({searchHandler, search, searchListHandler}) => {
	const [products, setProducts] = useState([])
	const [input, setInput] = useState([])
	const [isLoading, setLoading] = useState()

    const limit = 5
    useEffect(() => {
		
		const fetchData = async () => {
			try {
				setLoading(true)
				const data = await productsAPI.getProducts(limit, input)
				
				setProducts(data)
			} catch (e) {
				console.log(e)
			}
			setLoading(false)
		} 
		
		
		fetchData()
	}, [input])
	const inputHandler = (val)=> {
		setInput(val)
		searchHandler(input)
	}
    function autocompleteHandler(name){
		setInput(name)
		setProducts([])
		searchHandler(name)
	}
	return (
		<section>
			<input 
				value={input} 
				placeholder='Search here...' 
				className={s.name} type='text' 
				onChange={(e)=>inputHandler(e.target.value)}
			/>
			<div>{products.map((product) => {
				if(search.length>2){
					return (
						<div
							onClick={()=>autocompleteHandler(product.name)}
							key={product.id}>{product.name}
						</div>
					)
				}
			})}
			</div>
			<button 
				className={s.btn} 
				onClick={()=>searchListHandler(search)}
				disabled={isLoading}
			>
				{isLoading && <div className={s.ldsring}><div></div><div></div><div></div><div></div></div>}
				{!isLoading && <span>Filter</span>}
			</button>
			
		</section>
	)
}
