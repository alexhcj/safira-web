import React, { useEffect, useState, useRef } from 'react'
import { productsAPI } from '../../../../api/products'
import classNames from 'classnames/bind'
import { ReactComponent as Close } from '../../../../assets/images/close.svg'
import { ErrorPopup } from '../../../../shared/components/UI/ErrorPopup/ErrorPopup'
import { Button } from '../../../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../../../shared/components/UI/Text/Text'
import s from './search.module.scss'

let cx = classNames.bind(s)

export const Search = ({ searchHandler }) => {
	const [products, setProducts] = useState([])
	const [search, setSearch] = useState('')
	const [currentSearch, setCurrentSearch] = useState('')
	const [popoverToggle, setPopoverToggle] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const inputRef = useRef(null)
	const limit = 5

	// input validation
	const [validationToggle, setValidationToggle] = useState(false)
	const [validationError, setValidationError] = useState('')

	// btn
	const [disabled, setDisabled] = useState(false)

	const popupCN = cx('popup', {
		active: popoverToggle && products,
	})

	const btnCloseCN = cx('btn_close', search.length !== 0 && 'active')

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			try {
				if (!validationError) {
					const data = await productsAPI.getAll({ search, limit })

					// no result
					if (search !== '' && data.total === 0) {
						inputValidationHandler('noresult')
						setPopoverToggle(false)
						setIsLoading(false)
						return null
					}

					setProducts(data)
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


	useEffect(() => {
		document.addEventListener('click', outsideClickHandler)

		return () => {
			document.removeEventListener('click', outsideClickHandler)
		}
	}, [])

	const outsideClickHandler = (e) => {
		if (inputRef.current && !inputRef.current.contains(e.target)) {
			setPopoverToggle(false)
		}
	}

	const escKeyHandler = (e) => {
		if (e.key === 'Escape') {
			setPopoverToggle(false)
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
		setPopoverToggle(false)
		setDisabled(false)
		setValidationToggle(false)
	}

	const closeSearchBtnHandler = () => {
		setSearch('')
		setDisabled(false)
		setValidationError('')
		setValidationToggle(false)
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
					ref={inputRef}
					type='text'
					value={search}
					maxLength='35'
					placeholder='Search...'
					onKeyDown={escKeyHandler}
					onChange={(e) => inputHandler(e)}
					onClick={(e) => onClickHandler(e)}
				/>
				{search && <span role="presentation" className={btnCloseCN} onClick={closeSearchBtnHandler}>
					<Close />
				</span>}
				{<ErrorPopup error={validationError} toggle={validationToggle} />}
			</div>
			<ul className={popupCN}>
				{products.map((product, index) => {
					return (
						<li
							role="presentation"
							className={s.item}
							key={index}
							onClick={() => autoCompleteClickHandler(product.name)}
						>
							{product.name}
						</li>
					)
				})}
			</ul>
			<div className={s.bottom}>
				<Button
					type="filter"
					isLoading={isLoading}
					disabled={disabled}
					searchBtnHandler={searchBtnClickHandler}
				>
					<Text span color="white">Search</Text>
				</Button>
				<span className={s.current}>{currentSearch}</span>
			</div>
		</aside>
	)
}
