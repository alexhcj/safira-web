import { useRef } from 'react'

import { useRecentSearchContext } from '@context/RecentSearchContext'

import { Button } from '../../UI/Buttons/Button/Button'

import s from './global-search-form.module.scss'

const globalSearchFormValidationSchema = {
	search: [
		{ type: 'required', pattern: /^(?!\s*$).+/, text: 'Search should be filled.' },
		{
			type: 'text',
			pattern: /[a-z][A-Z][0-9][-!$%^&*()_+|~=`{}[\]:";'<>?,./]/,
			text: 'Search should be valid',
		},
	],
}

export const GlobalSearchForm = ({ handleInputClick, handleSubmit }) => {
	const { state, addCurrentSearch } = useRecentSearchContext()
	const inputRef = useRef(null)

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

	const handleChange = (e) => {
		addCurrentSearch({ search: e.target.value, lastSearch: e.target.value })
	}

	const handleSearchSubmit = () => {
		handleSubmit(state)
		addCurrentSearch({ search: '', lastSearch: state.search })
	}

	// TODO: fix UI usage: when click near top border of input => cursor points to start of input "|apple". Better would be to the end.
	return (
		<form>
			<div className={s.input}>
				<input
					ref={inputRef}
					type='text'
					name='search'
					placeholder='Search here...'
					onKeyDown={onKeyDownHandler}
					onChange={handleChange}
					onClick={handleInputClick}
					autoComplete='off'
					value={state.search}
				/>
				<Button type='search' onClick={handleSearchSubmit} />
			</div>
		</form>
	)
}
