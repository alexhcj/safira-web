import { useEffect, useState, useRef } from 'react'
import { productsAPI } from '../../../../api'
import { Button } from '../../../UI/Buttons/Filter'
import { ErrorPopup } from '../../../UI'
import classNames from 'classnames/bind'
import s from './search.module.css'

let cx = classNames.bind(s)

export const Search = ({ searchHandler }) => {
	const [products, setProducts] = useState([])
	const [search, setSearch] = useState('')
	const [currentSearch, setCurrentSearch] = useState('')
	const [popoverToggle, setPopoverToggle] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const ref = useRef(null)
	const limit = 5

	// input validation
	const [validationToggle, setValidationToggle] = useState(false)
	const [validationError, setValidationError] = useState('')

	// btn
	const [disabled, setDisabled] = useState(false)

	const popupCN = cx('popup', {
		active: popoverToggle && products,
	})

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			try {
				if (!validationError) {
					const data = await productsAPI.getProducts({ search, limit })

					// no result
					if (search !== '' && data.total === 0) {
						inputValidationHandler('noresult')
						setPopoverToggle(false)
						setIsLoading(false)
						return null
					}

					setProducts(data.data)
				}
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
	}, [search, validationError])

	const outsideClickHandler = (e) => {
		// prevent toggle off on span click
		if (e.target.nodeName === 'SPAN') {
			return null
		}

		if (ref.current && ref.current.contains(e.target)) {
			setPopoverToggle(false)
			setValidationToggle(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', outsideClickHandler)

		return () => {
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

		if (validationError && search !== '') {
			setValidationToggle(true)
		}
	}

	const autoCompleteClickHandler = (search) => {
		setSearch(search)
		setDisabled(false)
		setValidationError('')
	}

	const searchBtnClickHandler = (e) => {
		e.preventDefault()

		// empty input req onClick
		if (search === '' || search === undefined) {
			inputValidationHandler('empty')
			return null
		}

		if (validationError) {
			setValidationToggle(true)
		}

		if (!validationError) {
			searchHandler(search)
			setCurrentSearch(search)
			setProducts([])
			setSearch('')
		}
	}

	const inputHandler = (e) => {
		const input = e.target.value

		if (!popoverToggle) setPopoverToggle(true)

		inputValidationHandler(input)
		setSearch(input)
	}

	const inputValidationHandler = (input) => {
		// no result
		if (input === 'noresult') {
			setValidationError('noresult')
			setValidationToggle(true)
			setDisabled(true)
			return null
		}

		// empty
		if (input === 'empty') {
			setValidationError('empty')
			setValidationToggle(true)
			setPopoverToggle(true)
			return null
		}

		// alphanumeric and spaces regexp
		if (!input.match('^[a-zA-Z ]*$')) {
			setValidationError('text')
			setValidationToggle(true)
			setDisabled(true)
			return null
		}

		// max length
		if (input.length >= 35) {
			setValidationError('length')
			setValidationToggle(true)
			setDisabled(true)
			return null
		}

		// else close validation popup & disable error
		if (input !== '' || input !== undefined) {
			setValidationError('')
			setValidationToggle(false)
			setDisabled(false)
			// setTimeout
		}
	}

	return (
		<aside>
			<div className={s.search}>
				<input
					className={s.input}
					ref={ref}
					type='text'
					value={search}
					maxLength='35'
					placeholder='Search...'
					onKeyDown={escKeyHandler}
					onBlur={outsideClickHandler}
					onChange={(e) => inputHandler(e)}
					onClick={(e) => onClickHandler(e)}
				/>
				{<ErrorPopup error={validationError} toggle={validationToggle} />}
			</div>
			<ul className={popupCN}>
				{products.map((product) => {
					return (
						<li className={s.item} key={product.id} onClick={() => autoCompleteClickHandler(product.name)}>
							{product.name}
						</li>
					)
				})}
			</ul>
			<div className={s.bottom}>
				<Button
					text='Search'
					isLoading={isLoading}
					disabled={disabled}
					searchBtnHandler={searchBtnClickHandler}
				/>
				<span className={s.current}>{currentSearch}</span>
			</div>
		</aside>
	)
}

// BUG: when click on search btn then right "white" side of sidebar then again on search => it doesn't work
// Difference event click:
// Normal click path: (8) [div, div, div.app, div#root, body, html, document, Window]
// VS
// Unnormal [button.btn_btn__2zejw, div.sidebar_bottom__1tlv1, aside, div.shop_sidebar__21I2u, div.shop_wrapper__3ZbI6, div.container, div, div, div.app, div#root, body, html, document, Window]
