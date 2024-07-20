import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import cn from 'classnames'
import { useProductsBySlug } from '../../../../hooks/services/useProductsBySlug'
import { useSearchError } from '../../../../hooks/useSearchError'
import { useDebounce } from '../../../../hooks/useDebounce'
import { ErrorPopover } from '../../../../shared/components/UI/ErrorPopup/ErrorPopover'
import { Button } from '../../../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../../../shared/components/UI/Text/Text'
import { slugToString, stringToSlug } from '../../../../utils'
import { ReactComponent as Close } from '../../../../assets/svg/close.svg'
import s from './search.module.scss'

export const Search = () => {
	const [params, setParams] = useSearchParams()
	const [search, setSearch] = useState('')
	const [currentSearch, setCurrentSearch] = useState((params.get('slug') && slugToString(params.get('slug'))) || '')
	const [isProductSelected, setIsProductSelected] = useState(false)
	const [popoverToggle, setPopoverToggle] = useState(false)
	const [inputFocused, setInputFocused] = useState(false)
	const [inputTouched, setInputTouched] = useState(false)
	const inputRef = useRef(null)
	const debouncedSearch = useDebounce(search, 350)
	const { data, loading } = useProductsBySlug(debouncedSearch, isProductSelected)
	const { searchError } = useSearchError(search, data.length, inputFocused, inputTouched)
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
				setInputFocused(false)
				inputRef.current.blur()
				break
			case 'Enter':
				if (!searchError) {
					setPopoverToggle(false)
					let query = Object.fromEntries([...params])
					if (query.offset !== 0) query.offset = '0'
					setParams({ ...query, slug: stringToSlug(search) })
					setIsProductSelected(true)
					setCurrentSearch(search)
				}
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
		setInputFocused(true)
	}

	const onBlurHandler = () => {
		setInputFocused(false)
		setInputTouched(true)
	}

	const onClickHandler = () => {
		setInputFocused(true)
		setPopoverToggle(true)

		if (params.get('slug')) setSearch(currentSearch)
	}

	const autoCompleteClickHandler = (name) => {
		setIsProductSelected(true)
		setSearch(name)
		setPopoverToggle(false)
	}

	const closeSearchBtnHandler = () => {
		setSearch('')
		setCurrentSearch('')
		params.delete('slug')
		const query = Object.fromEntries([...params])
		setParams({ ...query })
		setIsProductSelected(false)
		setInputTouched(false)
		inputRef.current.focus()
	}

	const searchBtnClickHandler = () => {
		// if (searchError) {
		// 	setInputFocus(true)
		// }

		let query = Object.fromEntries([...params])
		if (query.offset !== 0) query.offset = '0'
		setParams({ ...query, slug: stringToSlug(search) })
		setCurrentSearch(search)
		setIsProductSelected(true)
		setSearch('')
	}

	const onChangeHandler = (e) => {
		const input = e.target.value

		if (!popoverToggle) setPopoverToggle(true)

		setIsProductSelected(false)
		setSearch(input)
	}

	return (
		<aside>
			<div className={s.search}>
				<input
					className={cn(s.input, {
						[s.active]: inputFocused,
						[s.error]: searchError && inputFocused && inputTouched,
						[s.no_result]: searchError && searchError.id === 4,
					})}
					ref={inputRef}
					type='text'
					value={search}
					maxLength='30'
					placeholder='Search...'
					onKeyDown={onKeyDownHandler}
					onChange={onChangeHandler}
					onClick={onClickHandler}
					onFocus={onFocusHandler}
					onBlur={onBlurHandler}
				/>
				{search && (
					<span
						role='presentation'
						className={cn(s.btn_close, search.length !== 0 && s.active)}
						onClick={closeSearchBtnHandler}
					>
						<Close />
					</span>
				)}
				{searchError && <ErrorPopover error={searchError.text} inputFocus={inputFocused} inputTouched={inputTouched} />}
			</div>
			<ul className={cn(s.popup, { [s.active]: popoverToggle })}>
				{data
					.filter((_, i) => i < popoverLimit)
					.map((product) => {
						return (
							<li
								role='presentation'
								className={s.item}
								key={product.id}
								onClick={() => autoCompleteClickHandler(product.name)}
							>
								{product.name}
							</li>
						)
					})}
				{!!data && searchError && searchError.type === 'noresult' && <div className={s.no_slug_result}>No results</div>}
			</ul>
			<div className={s.bottom}>
				<Button
					type='filter'
					isLoading={loading}
					disabled={loading || inputFocused || searchError}
					onClick={searchBtnClickHandler}
				>
					<Text span color='white'>
						Search
					</Text>
				</Button>
				<span className={s.current}>{currentSearch}</span>
			</div>
		</aside>
	)
}
