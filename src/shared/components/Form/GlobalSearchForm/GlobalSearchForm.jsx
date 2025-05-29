import { useCallback, useEffect, useRef } from 'react'

import { useRecentSearchContext } from '@context/RecentSearchContext'

import { useFormValidation } from '@hooks/useFormValidation'

import { ErrorPopover } from '@shared/components/UI/ErrorPopover/ErrorPopover'

import { maxLength, minLength, pattern, required } from '@utils/validation'

import { Button } from '../../UI/Buttons/Button/Button'

import s from './global-search-form.module.scss'

const globalSearchFormValidationSchema = {
	search: [
		required('Search field should not be empty.'),
		minLength(2, 'Search should be at least 2 characters.'),
		maxLength(100, 'Search cannot exceed 100 characters.'),
		pattern(/^[a-zA-Z0-9\s.,!?'"()]+$/, 'Search can only contain letters, numbers, spaces and basic punctuation.'),
		pattern(/^(?!\s*$).+/, 'Search cannot contain only whitespace.'),
	],
}

export const GlobalSearchForm = ({ handleInputClick, handleSubmit }) => {
	const { state, addCurrentSearch } = useRecentSearchContext()
	const inputRef = useRef(null)
	const searchRef = useRef(null)
	const { isValid, getFieldError, resetForm } = useFormValidation(
		{ search: state.search },
		globalSearchFormValidationSchema,
		{
			validateOnChange: false,
		},
	)

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
			!isValid() && resetForm()
		}
	}

	const clickOutsideHandler = (e) => {
		if (searchRef.current && !searchRef.current.contains(e.target)) {
			!isValid() && resetForm()
		}
	}

	const onKeyDownHandler = (e) => {
		switch (e.key) {
			case 'Escape':
				inputRef.current.blur()
				break

			case 'Enter':
				e.preventDefault()
				handleSearchSubmit()
				break
			default:
				return
		}
	}

	const handleFocus = useCallback(() => {
		!isValid() && resetForm()
	}, [isValid, resetForm])

	const handleChange = (e) => {
		!isValid() && resetForm()
		addCurrentSearch({ search: e.target.value, lastSearch: e.target.value })
	}

	const handleSearchSubmit = () => {
		if (!isValid()) return
		handleSubmit(state)
		addCurrentSearch({ search: '', lastSearch: state.search.trim() })
	}

	return (
		<div className={s.search} ref={searchRef}>
			<form>
				<input
					ref={inputRef}
					type='text'
					name='search'
					placeholder='Search here...'
					onKeyDown={onKeyDownHandler}
					onChange={handleChange}
					onFocus={handleFocus}
					onClick={handleInputClick}
					autoComplete='off'
					value={state.search}
				/>
				<Button type='search' onClick={handleSearchSubmit} />
			</form>
			<ErrorPopover className={s.error_popover} error={!isValid(false) && getFieldError('search')} />
		</div>
	)
}
