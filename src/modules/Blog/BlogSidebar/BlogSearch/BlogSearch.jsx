import { useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { ButtonClose } from '@shared/components/UI/Buttons/ButtonClose/ButtonClose'
import { ButtonSearch } from '@shared/components/UI/Buttons/ButtonSearch/ButtonSearch'
import { FilterTitle } from '@shared/components/UI/Sidebar/FilterTitle/FilterTitle'

import s from './blog-search.module.scss'

export const BlogSearch = ({ isLoading }) => {
	const [params, setParams] = useSearchParams()
	const [search, setSearch] = useState('')

	const onChangeHandler = (e) => {
		const input = e.target.value
		setSearch(input)
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

	const onClickHandler = () => {
		params.set('search', search)
		setParams(params, {
			replace: true,
		})
	}

	return (
		<div>
			<FilterTitle text='search' />
			<div className={s.search}>
				<input
					className={s.input}
					type='text'
					value={search}
					onChange={onChangeHandler}
					maxLength='35'
					placeholder='Search...'
				/>
				{(params.get('search') || search) && <ButtonClose onClick={resetSearch} classNames={s.btn_close} />}
			</div>
			<ButtonSearch type='filter' isLoading={isLoading} disabled={isLoading} onClick={onClickHandler}></ButtonSearch>
		</div>
	)
}
