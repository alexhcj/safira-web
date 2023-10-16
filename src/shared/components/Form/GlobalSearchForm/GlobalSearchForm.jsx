import React, { useEffect, useState } from 'react'
import { useRecentSearchContext } from '../../../../context/RecentSearchContext'
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

export const GlobalSearchForm = ({ handleInputClick, onKeyDownHandler, handleSubmit }) => {
	const { state } = useRecentSearchContext()
	const initialFormState = {
		search: '',
	}
	const [form, setForm] = useState(initialFormState)

	const handleChange = (e) => {
		setForm({ search: e.target.value })
	}

	const handleSelectRecentSearch = (value) => {
		setForm({ search: value })
	}

	useEffect(() => {
		handleSelectRecentSearch(state)
	}, [state])

	return (
		<form>
			<div className={s.input}>
				<input
					type='text'
					name='search'
					placeholder='Search here...'
					onChange={handleChange}
					onClick={handleInputClick}
					onKeyDown={onKeyDownHandler}
					autoComplete='off'
					value={form.search}
				/>
				<Button type='search' onClick={() => handleSubmit(form)} />
			</div>
		</form>
	)
}
