import s from './ShopSideBar.module.css'
import { productsAPI } from '../../../api'
import { useEffect, useState, useRef} from 'react'
import { ShopBanner } from './ShopBanner'


export const ShopSideBar = ({searchHandler, isLoading}) => {
	const [products, setProducts] = useState([])
	const [input, setInput] = useState('')
	const [popupToggle, setPopupToggle] = useState(false)
	const ref = useRef(null)
	// const [isDrag, setDrag] = useState(false)
	// const [diffX, setdiffX] = useState()
	// const [dragX, setDragX] = useState(0)
	const params = {
		search: input,
		limit: 5
	}
    useEffect(() => {
		const fetchData = async () => {
			try {
				if(input.length>2){
					const data = await productsAPI.getProducts(params)
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

	// const startDragg = (e) => {
	// 	setDrag(true)
	// 	setdiffX(e.screenX)
	// }
	
	// const stopDragg = () => {
	// 	setDrag(false)
	// }

	// const dragging = (e) => {
	// 	if(isDrag===true){
	// 		if(dragX>=263){
	// 			setDragX(262)
	// 		} else if(dragX<=-1){
	// 			setDragX(0)
	// 		} else {
	// 			setDragX(e.screenX - diffX)
	// 		}
	// 	 }
	// }

	//TAGS||CATEGORIES

	// let categoriesArr = []
	// const categoryHandler = (e) => {
	// 	if(e.target.checked){
	// 		categoriesArr.push(e.target.value)
	// 	} else {
	// 		categoriesArr = categoriesArr.filter(cat => {
	// 			if(cat!==e.target.value){
	// 				return true
	// 			}
	// 		})
	// 	}
	// 	console.log(categoriesArr)
	// }

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
			<div style={{width:223,margin: 20,height:10, background: "green"}}></div>
			{/* <div className={s.price_input}
				style={{left: dragX}}
				onMouseDown={(e)=>startDragg(e)}
				onMouseMove={(e)=>dragging(e)}
				onMouseUp={()=>stopDragg()}></div> */}
				
			<button 
				className={s.btn} 
				disabled={isLoading}
				onClick={()=>searchBtnHandler()}
			>
				{isLoading && <div className={s.ldsring}><div></div><div></div><div></div><div></div></div>}
				{!isLoading && <span>Filter</span>}
			</button>

			<ShopBanner />
			
		</section>
	)
}
