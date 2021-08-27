import s from './ShopSideBar.module.css'
import { productsAPI } from '../../../api'
import { useEffect, useState, useRef} from 'react'


export const ShopSideBar = ({searchHandler, isLoading}) => {
	const [products, setProducts] = useState([])
	const [input, setInput] = useState('')
	const [popupToggle, setPopupToggle] = useState(false)
	const ref = useRef(null)

    const limit = 5
    useEffect(() => {
		const fetchData = async () => {
			try {
				const search = input
				if(input.length>2){
					const data = await productsAPI.getProducts(search, limit)
					setProducts(data.data)
				}
			} catch (e) {
				console.log(e)
			}
		} 
		fetchData()

		
	}, [input])

	useEffect(() => {
		document.addEventListener('keydown', escKeyHandler)
		document.addEventListener('click', clickOutsideHandler)

		return () => {
			document.removeEventListener('keydown', escKeyHandler)
			document.removeEventListener('click', clickOutsideHandler)
		}
	}, [])
	
	const escKeyHandler = (e) => {
		if (e.key === 'Escape') {
			setPopupToggle(false)
		}
	}

	const clickHandler = () => {
		setPopupToggle(!popupToggle)
	}

	const clickOutsideHandler = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			setPopupToggle(false)
		}
	}

    const autocompleteHandler = (name) => {
		setInput(name)
		setProducts([])
	}

	const searchBtnHandler = () => {
		searchHandler(input)
		setProducts([])
	}

	return (
		<section>
			<input className={s.name} type='text'
				value={input}
				placeholder='Search here...' 
				onInput={(e)=>setInput(e.target.value)}
				onFocus={(e)=>clickHandler(e)}
				ref={ref}
			/>
			<div 
				 className={`${s.popup_container} ${popupToggle&&input.length>2 ? `${s.active}` : ''} `}>{products.map((product) => {
					return (
						<div className={s.popup_item}
							onClick={()=>autocompleteHandler(product.name)}
							key={product.id}>{product.name}
						</div>
					)	
				})}
			</div>
			<button 
				className={s.btn} 
				disabled={isLoading}
				onClick={()=>searchBtnHandler()}
			>
				{isLoading && <div className={s.ldsring}><div></div><div></div><div></div><div></div></div>}
				{!isLoading && <span>Filter</span>}
			</button>
			
		</section>
	)
}
