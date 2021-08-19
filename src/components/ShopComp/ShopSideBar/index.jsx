import { useEffect, useState } from 'react'
import { shopProductsAPI } from '../../../api'
import { convertArray } from '../../../utils'
import s from './shopsidebar.module.css'

export const ShopSideBar = () => {
	const [shopProducts, setShopProducts] = useState([])
	const [input, setInput] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await shopProductsAPI.getShopProducts(input)
				setShopProducts(convertArray(data, 3))
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [input])

	const searchByName = (event) => {
		setInput(event.target.value)
	}

	const debounce = (fn, ms) => {
		let timeout

		return function () {
			const fnCall = () => {
				fn.apply(this, arguments)
			}

			clearTimeout(timeout)

			timeout = setTimeout(fnCall, ms)
		}
	}

	const search = debounce(searchByName, 500)
    
	return (
		<section>
			<input type='text' onChange={search} />
			{/* {console.log(shopProducts[0][1].name)} */}
		</section>
	)
}
