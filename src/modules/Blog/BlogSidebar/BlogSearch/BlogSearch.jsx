import { useState } from 'react'

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { maxLength, minLength, pattern, required } from '@/utils'

import { useFormValidation } from '@hooks/useFormValidation'

import { Input } from '@shared/components/Form/Input/Input'
import { ButtonClose } from '@shared/components/UI/Buttons/ButtonClose/ButtonClose'
import { ButtonSearch } from '@shared/components/UI/Buttons/ButtonSearch/ButtonSearch'
import { FilterTitle } from '@shared/components/UI/Sidebar/FilterTitle/FilterTitle'

import s from './blog-search.module.scss'

const blogSearchFormValidationSchema = {
	search: [
		required('Enter post title or related text.'),
		minLength(3, 'Minimum characters are 3.'),
		pattern(/^[a-zA-Z ]*$/, 'Use only upper and lower case characters.'),
		maxLength(30, 'Maximum characters are 30.'),
	],
}

const DEFAULT_QUERY = import.meta.env.VITE_BLOG_DEFAULT_QUERY

export const BlogSearch = ({ isLoading }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [params, setParams] = useSearchParams()
	const [search, setSearch] = useState('')
	const { isValid, getFieldError, resetFieldError } = useFormValidation({ search }, blogSearchFormValidationSchema, {
		validateOnChange: false,
	})

	const onChangeHandler = (e) => {
		!isValid(false) && resetFieldError('search')

		setSearch(e.target.value)
	}

	const resetSearch = () => {
		setSearch('')

		if (params.get('search')) {
			params.delete('search')
			setParams(params, {
				replace: true,
			})
		}
	}

	const handleSubmit = () => {
		if (isValid()) {
			setParams({}, { replace: true })

			const defaultParams = new URLSearchParams(DEFAULT_QUERY)
			const newParams = {}

			for (const [key, value] of defaultParams) {
				newParams[key] = value
			}

			if (search !== '') newParams.search = search

			if (location.pathname === '/blog') {
				setParams(newParams, { replace: true })
			} else {
				navigate(`/blog?${new URLSearchParams(newParams)}`, { replace: true })
			}
		}
	}

	return (
		<div>
			<FilterTitle text='search' />
			<div className={s.search}>
				<Input
					className={s.input}
					type='text'
					handleChange={onChangeHandler}
					value={search}
					placeholder='Search...'
					error={search.length > 0 && getFieldError('search')}
				/>
				{(params.get('search') || search) && <ButtonClose onClick={resetSearch} classNames={s.btn_close} />}
			</div>
			<ButtonSearch type='filter' isLoading={isLoading} disabled={isLoading} onClick={handleSubmit}></ButtonSearch>
		</div>
	)
}
