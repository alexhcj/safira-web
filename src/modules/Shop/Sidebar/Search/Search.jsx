import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import cn from 'classnames'
import { useSearchParams } from 'react-router-dom'

import { maxLength, pattern } from '@/utils'

import { useProductsNew } from '@hooks/services/useProductsNew'
import { useDebounce } from '@hooks/useDebounce'
import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import { slugToStr, strToSlug } from '@utils/string'

import Close from '@assets/svg/close.svg?react'

import s from './search.module.scss'

const searchFormValidationSchema = {
	search: [
		pattern(/^[a-zA-Z ]*$/, 'Use only upper and lower case characters.'),
		maxLength(30, 'Maximum characters are 30.'),
	],
}

export const Search = () => {
	const [params, setParams] = useSearchParams()
	const [search, setSearch] = useState('')
	const [currentSearch, setCurrentSearch] = useState((params.get('slug') && slugToStr(params.get('slug'))) || '')
	const [popoverToggle, setPopoverToggle] = useState(false)

	const searchContainerRef = useRef(null)
	const inputRef = useRef(null)

	const debouncedSearch = useDebounce(search, 350)
	const { findProducts, isLoading } = useProductsNew()
	const [products, setProducts] = useState([])

	const formValues = useMemo(() => ({ search }), [search])

	const { isValid, getFieldError, resetFieldError } = useFormValidation(formValues, searchFormValidationSchema, {
		validateOnChange: true,
	})

	const POPOVER_LIMIT = 5

	// Fetch products when search changes
	useEffect(() => {
		const fetchData = async () => {
			const res = await findProducts({ slug: debouncedSearch })

			if (res && res.success) {
				setProducts(res.products)
			}
		}

		if (isValid(false)) fetchData()
	}, [debouncedSearch])

	const isInputFocused = () => {
		return document.activeElement === inputRef.current
	}

	// Handle clicks outside the search container
	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
				setPopoverToggle(false)
			}
		}

		const handleFocusChange = () => {
			setPopoverToggle(isInputFocused())
		}

		document.addEventListener('click', handleOutsideClick)
		document.addEventListener('focusin', handleFocusChange)
		document.addEventListener('focusout', handleFocusChange)

		return () => {
			document.removeEventListener('click', handleOutsideClick)
			document.removeEventListener('focusin', handleFocusChange)
			document.removeEventListener('focusout', handleFocusChange)
		}
	}, [])

	const onKeyDownHandler = (e) => {
		switch (e.key) {
			case 'Escape':
				setPopoverToggle(false)
				inputRef.current.blur()
				break
			case 'Enter':
				submitSearch()
				break
			default:
				return
		}
	}

	const handleSelectItem = (name) => {
		setSearch(name)
		setPopoverToggle(false)
	}

	const handleChange = useCallback(
		(e) => {
			if (!popoverToggle) setPopoverToggle(true)
			!isValid(false) && resetFieldError('search')
			setSearch(e.target.value)
		},
		[popoverToggle, resetFieldError],
	)

	const handleClearSearch = () => {
		setSearch('')
		inputRef.current?.focus()
	}

	const submitSearch = useCallback(() => {
		if (!isValid()) {
			setPopoverToggle(false)
			inputRef.current?.blur()
			return
		}

		let query = Object.fromEntries([...params])
		if (query.offset !== 0) query.offset = '0'
		setParams({ ...query, slug: strToSlug(search) })
		setCurrentSearch(search)
		setPopoverToggle(false)
		setSearch('')
		inputRef.current?.blur()
	}, [isValid, params, search, setParams])

	return (
		<aside>
			<div className={s.search} ref={searchContainerRef} onKeyDown={onKeyDownHandler}>
				<Input
					className={s.input}
					ref={inputRef}
					type='text'
					placeholder='Search...'
					value={search}
					handleChange={handleChange}
					error={getFieldError('search')}
					warning={search !== '' && products.length === 0}
				/>
				{search && (
					<span
						role='presentation'
						className={cn(s.btn_close, search.length !== 0 && s.active)}
						onClick={handleClearSearch}
					>
						<Close className={s.icon_close} />
					</span>
				)}
			</div>

			<ul className={cn(s.popover, { [s.active]: popoverToggle })}>
				{products
					.filter((_, i) => i < POPOVER_LIMIT)
					.map((product) => (
						<li
							role='presentation'
							className={s.popover_item}
							key={`ps_${product.slug}`}
							onClick={() => handleSelectItem(product.name)}
						>
							{product.name}
						</li>
					))}
				{products.length === 0 && <div className={s.popover_empty}>No results</div>}
			</ul>

			<div className={s.bottom}>
				<Button type='filter' disabled={isLoading} onClick={submitSearch}>
					{isLoading ? (
						<Preloader width={20} height={20} />
					) : (
						<Text span color='white'>
							Search
						</Text>
					)}
				</Button>
				<span className={s.current_search}>{currentSearch}</span>
			</div>
		</aside>
	)
}
