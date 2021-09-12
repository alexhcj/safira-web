import { useEffect, useState, useRef } from 'react'
import { productsAPI } from '../../../api'
import { Button } from '../../UI/Buttons/Filter'
import classNames from 'classnames/bind'
import s from './sidebar.module.css'

let cx = classNames.bind(s)

export const ShopSideBar = ({ searchHandler }) => {
	const [products, setProducts] = useState([])
	const [search, setSearch] = useState('')
	const [currentSearch, setCurrentSearch] = useState('')
	const [validationToggle, setValidationToggle] = useState(false)
	const [popoverToggle, setPopoverToggle] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [focus, setFocus] = useState(false)
	const ref = useRef(null)
	const limit = 5

	const popupCN = cx('popup', {
		active: popoverToggle && products,
		focus: focus,
	})

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			try {
				const data = await productsAPI.getProducts({ search, limit })
				// if (data.total === 0) {
				//     const noresult = [{id: 1, category: 'No result'}]
				//     setProducts([...noresult])
				//     console.log(products)
				// }

				setProducts(data.data)
			} catch (e) {
				console.log(e)
			}

			setIsLoading(false)
		}

		const debounce = setTimeout(() => {
			fetchData()
		}, 300)

		return () => {
			clearTimeout(debounce)
		}
	}, [search])

	useEffect(() => {
		document.addEventListener('keydown', escKeyHandler)
		document.addEventListener('click', outsideClickHandler)

		return () => {
			document.removeEventListener('keydown', escKeyHandler)
			document.removeEventListener('click', outsideClickHandler)
		}
	}, [])

	const escKeyHandler = (e) => {
		if (e.key === 'Escape') {
			setPopoverToggle(false)
			setValidationToggle(false)
		}
	}

	const onClickHandler = () => {
		setPopoverToggle(true)
	}

	const outsideClickHandler = (e) => {
		if (e.target.nodeName === 'SPAN' && search === '') {
			setPopoverToggle(true)
			return null
		}

		if (!ref.current.contains(e.target)) {
			setPopoverToggle(false)
			setValidationToggle(false)
		}
	}

	const autoCompleteClickHandler = (search) => {
		setSearch(search)
	}

	const searchBtnClickHandler = (e) => {
		e.preventDefault()

		// empty input req
		if (search === '' || search === undefined) {
			setValidationToggle(true)
			setPopoverToggle(true)
			return null
		}

		searchHandler(search)
		setCurrentSearch(search)
		setProducts([])
		setSearch('')
	}

	const inputHandler = (e) => {
		const input = e.target.value

		inputValidationHandler(input)
		setSearch(input)
	}

	// validation popup toggle handler
	const inputValidationHandler = (input) => {
		// empty
		if (input !== '' || input !== undefined) {
			setValidationToggle(false)
		}

		// no results
		// length (get from longest product title)
		// only alphabet regexp
	}

	const onFocus = () => {
		setFocus(true)
	}

	const onBlur = () => {
		setFocus(false)
	}

	return (
		<aside>
			<h3 className={s.title}>Filter by name</h3>
			<div className={s.search}>
				<input
					className={`${s.input} ${validationToggle ? `${s.error}` : ''} `}
					type='text'
					value={search}
					placeholder='Search...'
					onChange={(e) => inputHandler(e)}
					onClick={(e) => onClickHandler(e)}
					ref={ref}
				/>
				<span className={`${s.validation} ${validationToggle ? `${s.active}` : ''} `}>
					Enter product or select from list
				</span>
			</div>
			<ul className={popupCN} onFocus={onFocus} onBlur={onBlur}>
				{products.map((product) => {
					return (
						<li
							className={s.item}
							onClick={() => autoCompleteClickHandler(product.name)}
							key={product.id}
							onFocus={onFocus}
							onBlur={onBlur}
						>
							{product.name}
						</li>
					)
				})}
			</ul>
			<div className={s.bottom}>
				<Button
					text='Search'
					isLoading={isLoading}
					disabled={isLoading}
					searchBtnHandler={searchBtnClickHandler}
				></Button>
				<span>{currentSearch}</span>
			</div>
		</aside>
	)
}

// 2. debounce Danil

// TODO: should not dissapear when switch browser tabs
// TODO: prevent last query when select fetched coincidences

// BUG: when select 2 times in a row the same product popoup appears under the search input
// BUG: when click on search btn then right "white" side of sidebar then again on search => it doesn't work
// Difference event click:
// Normal click path: (8) [div, div, div.app, div#root, body, html, document, Window]
// VS
// Unnormal [button.btn_btn__2zejw, div.sidebar_bottom__1tlv1, aside, div.shop_sidebar__21I2u, div.shop_wrapper__3ZbI6, div.container, div, div, div.app, div#root, body, html, document, Window]
