import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import cn from 'classnames'
import { useProductsBySlug } from '../../../../hooks/services/useProductsBySlug'
import { useSearchError } from '../../../../hooks/useSearchError'
import { ErrorPopover } from '../../../../shared/components/UI/ErrorPopup/ErrorPopover'
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
	const [inputTouched, setInputTouched] = useState(false)
	const inputRef = useRef(null)
	const { data, loading } = useProductsBySlug(search, isProductSelected)
	const { searchError } = useSearchError(search, data.length, inputTouched)
	const popoverLimit = 5

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

		if (currentSearch) setSearch(currentSearch)
	}

	const autoCompleteClickHandler = (name) => {
		setIsProductSelected(true)
		setSearch(name)
		setPopoverToggle(false)
	}

	const closeSearchBtnHandler = () => {
		setSearch('')
		setIsProductSelected(false)
		inputRef.current.focus()
		// TODO: remove additional req
	}

	const searchBtnClickHandler = () => {
		// if (searchError) {
		// 	setInputFocus(true)
		// }

		const query = Object.fromEntries([...params])
		setParams({ ...query, slug: stringToSlug(search) })
		setCurrentSearch(search)
		setIsProductSelected(true)
		setSearch('')
	}

	const onChangeHandler = (e) => {
		const input = e.target.value

		if (!popoverToggle) setPopoverToggle(true)

		setIsProductSelected(false)
		// TODO: add debounce
		setSearch(input)
	}

	return (
		<aside>
			<div className={s.search}>
				<input
					className={cn(s.input, { [s.active]: inputFocus, [s.error]: searchError && inputFocus && inputTouched })}
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
				{<ErrorPopover error={searchError} inputFocus={inputFocus} inputTouched={inputTouched} />}
			</div>
			<ul className={cn(s.popup, { [s.active]: popoverToggle && data })}>
				{data.filter((_, i) => i < popoverLimit).map((product) => {
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
					disabled={loading || inputFocus || searchError}
					onClick={searchBtnClickHandler}
				>
					<Text span color="white">Search</Text>
				</Button>
				<span className={s.current}>{currentSearch}</span>
			</div>
		</aside>
	)
}
