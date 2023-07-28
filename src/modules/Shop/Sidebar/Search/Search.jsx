import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import cn from 'classnames'
import { useProductsBySlug } from '../../../../hooks/useProductsBySlug'
import { useSearchError } from '../../../../hooks/useSearchError'
import { ErrorPopup } from '../../../../shared/components/UI/ErrorPopup/ErrorPopup'
import { Button } from '../../../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../../../shared/components/UI/Text/Text'
import { stringToSlug } from '../../../../utils'
import { ReactComponent as Close } from '../../../../assets/images/close.svg'
import s from './search.module.scss'

export const Search = () => {
	const [ params, setParams] = useSearchParams()
	const [search, setSearch] = useState('')
	const [currentSearch, setCurrentSearch] = useState('')
	const [isProductSelected, setIsProductSelected] = useState(false)
	const [popoverToggle, setPopoverToggle] = useState(false)
	const [inputFocus, setInputFocus] = useState(false)
	const [inputTouced, setInputTouched] = useState(false)
	const inputRef = useRef(null)
	const { data, loading, error } = useProductsBySlug(search, isProductSelected)
	const { searchError } = useSearchError(search, data.length)
	const limit = 5

	// input validation
	// const [validationToggle, setValidationToggle] = useState(false)
	// const [validationError, setValidationError] = useState('')

	// btn
	// const [disabled, setDisabled] = useState(false)

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		setIsLoading(true)
	//
	// 		try {
	// 			if (!validationError) {
	// 				const data = await productsAPI.getAll({ search, limit })
	//
	// 				// no result
	// 				if (search !== '' && data.total === 0) {
	// 					inputValidationHandler('noresult')
	// 					setPopoverToggle(false)
	// 					setIsLoading(false)
	// 					return null
	// 				}
	//
	// 				setProducts(data.products)
	// 			}
	// 		} catch (e) {
	// 			console.log(e)
	// 		}
	//
	// 		setIsLoading(false)
	// 	}
	//
	// 	const debounce = setTimeout(() => fetchData(), 300)
	// 	return () => clearTimeout(debounce)
	//
	// }, [search, validationError])

	useEffect(() => {
		document.addEventListener('click', outsideClickHandler)

		return () => {
			document.removeEventListener('click', outsideClickHandler)
		}
	}, [])

	const onKeyDownHandler = (e) => {
		switch (e.key) {
		case 'Escape':
			setPopoverToggle(false)
			setInputFocus(false)
			inputRef.current.blur()
			break
		case 'Enter':
			setPopoverToggle(false)
			setParams({ ...Object.fromEntries([...params]), slug: stringToSlug(search) })
			setIsProductSelected(true)
			break
		default:
			return
		}
	}

	const outsideClickHandler = (e) => {
		if (inputRef.current && !inputRef.current.contains(e.target)) {
			setPopoverToggle(false)
		}
	}

	const onFocusHandler = () => {
		setInputFocus(true)
	}

	const onBlurHandler = () => {
		setInputFocus(false)
		setInputTouched(true)
	}

	const onClickHandler = () => {
		setInputFocus(true)
		setPopoverToggle(true)

		// if (validationError && search !== '') {
		// 	setValidationToggle(true)
		// }
	}

	const autoCompleteClickHandler = (name) => {
		setIsProductSelected(true)
		setSearch(name)
		setPopoverToggle(false)
		// setDisabled(false)
		// setValidationToggle(false)
	}

	const closeSearchBtnHandler = () => {
		setSearch('')
		setIsProductSelected(false)
		// TODO: remove additional req
		// setDisabled(false)
		// setValidationError('')
		// setValidationToggle(false)
	}

	const searchBtnClickHandler = (e) => {
		e.preventDefault()

		// console.log(searchError)
		// empty input req onClick
		// if (search === '' || search === undefined) {
		// 	inputValidationHandler('empty')
		// 	return null
		// }

		const query = Object.fromEntries([...params])
		setParams({ ...query, slug: stringToSlug(search) })

		// if (validationError) {
		// 	setValidationToggle(true)
		// }

		// if (!validationError) {
		// 	// searchHandler(search)
		// 	setCurrentSearch(search)
		// 	setPopoverProducts([])
		// 	setSearch('')
		// }
	}

	const onChangeHandler = (e) => {
		const input = e.target.value

		if (!popoverToggle) setPopoverToggle(true)

		// console.log(searchError)
		// inputValidationHandler(input)

		setIsProductSelected(false)
		// TODO: add debounce
		setSearch(input)
	}

	const inputValidationHandler = (input) => {
		// no result
		if (input === 'noresult') {
			// setValidationError('noresult')
			// setValidationToggle(true)
			// setDisabled(true)
			return null
		}

		// empty
		if (input === 'empty') {
			// setValidationError('empty')
			// setValidationToggle(true)
			setPopoverToggle(true)
			return null
		}

		// alphanumeric and spaces regexp
		if (!input.match('^[a-zA-Z ]*$')) {
			// setValidationError('text')
			// setValidationToggle(true)
			// setDisabled(true)
			return null
		}

		// max length
		if (input.length >= 35) {
			// setValidationError('length')
			// setValidationToggle(true)
			// setDisabled(true)
			return null
		}

		// else close validation popup & disable error
		if (input !== '' || input !== undefined) {
			// setValidationError('')
			// setValidationToggle(false)
			// setDisabled(false)
			// setTimeout
		}
	}
	console.log(searchError)
	return (
		<aside>
			<div className={s.search}>
				<input
					className={cn(s.input, { [s.active]: inputFocus, [s.error]: searchError && inputFocus && inputTouced })}
					ref={inputRef}
					type='text'
					value={search}
					maxLength='25'
					placeholder='Search...'
					onKeyDown={onKeyDownHandler}
					onChange={onChangeHandler}
					onClick={onClickHandler}
					onFocus={onFocusHandler}
					onBlur={onBlurHandler}
				/>
				{search && <span role="presentation" className={cn(s.btn_close, search.length !== 0 && s.active)} onClick={closeSearchBtnHandler}>
					<Close />
				</span>}
				{/*{<ErrorPopup error={validationError} toggle={validationToggle} />}*/}
			</div>
			<ul className={cn(s.popup, { [s.active]: popoverToggle && data })}>
				{data.filter((_, i) => i < limit).map((product) => {
					return (
						<li
							role="presentation"
							className={s.item}
							key={product.id}
							onClick={() => autoCompleteClickHandler(product.name)}
						>
							{product.name}
						</li>
					)
				})}
				{!data && searchError && searchError.type === 'noresult' && <div className={s.no_result}>No results</div>}
			</ul>
			<div className={s.bottom}>
				<Button
					type="filter"
					isLoading={loading}
					disabled={loading || inputFocus}
					onClick={searchBtnClickHandler}
				>
					<Text span color="white">Search</Text>
				</Button>
				<span className={s.current}>{currentSearch}</span>
			</div>
		</aside>
	)
}
