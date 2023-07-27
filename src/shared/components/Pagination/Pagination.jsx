import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getSearchParams } from '../../../utils'
import s from './pagination.module.scss'
import cn from 'classnames'

export const Pagination = ({ meta: { page, total, isLastPage } }) => {
	const perPage = 3
	const [params, setParams] = useSearchParams()
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(perPage)
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0)

	const totalPages = () => {
		const pages = []

		if (total) {
			for (let i = 1; i <= Math.ceil(total / params.get('limit')); i++) {
				pages.push(i)
			}
		}

		return pages
	}

	const calcCurrentPages = () => {
		return totalPages().filter((number) => {
			if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) return number
			return null
		})
	}

	const selectStart = () => {
		const query = getSearchParams(params)

		setParams({ ...query, offset: '0' })
		setmaxPageNumberLimit(3)
		setminPageNumberLimit(0)
	}

	const selectFinish = () => {
		let query = getSearchParams(params)

		setParams({ ...query, offset: String(totalPages()[totalPages().length - 2] * +params.get('limit') ) })
		setmaxPageNumberLimit(totalPages().length)
		setminPageNumberLimit(totalPages()[totalPages().length - 4])
	}

	const selectPrev = () => {
		let query = getSearchParams(params)

		setParams({ ...query, offset: String(+params.get('offset') - +params.get('limit') ) })

		if (page === minPageNumberLimit + 1) {
			setmaxPageNumberLimit(prev => prev - 3)
			setminPageNumberLimit(prev => prev - 3)
		}
	}

	const selectNext = () => {
		let query = getSearchParams(params)

		setParams({ ...query, offset: String(+params.get('offset') + +params.get('limit') ) })

		if (page === maxPageNumberLimit) {
			setmaxPageNumberLimit(prev => prev + 3)
			setminPageNumberLimit(prev => prev + 3)
		}
	}

	const selectPage = (e) => {
		e.preventDefault()
		if (e.target.nodeName !== 'BUTTON') return

		const page = e.target.id
		const limit = params.get('limit')

		let query = getSearchParams(params)

		setParams({ ...query, offset: String((page * +limit) - +limit ) })
	}

	return (
		<div className={s.pagination}>
			{page > perPage && (
				<button className={s.btn} onClick={selectStart}>
					&lt;&lt;
				</button>
			)}
			{page >= 2 && (
				<button className={s.btn} onClick={selectPrev} disabled={page === 1}>
					prev
				</button>
			)}
			<div role="presentation" className={s.list} onClick={(e) => selectPage(e)}>
				{calcCurrentPages().map((num) => (
					<button className={cn(s.btn, { [s.active]: page === num })} id={num} key={num}>
						{num}
					</button>
				))}
			</div>
			<button
				className={s.btn}
				onClick={selectNext}
				disabled={isLastPage}
			>next</button>
			{!isLastPage  && (
				<button className={s.btn} onClick={selectFinish}>
					&gt;&gt;
				</button>
			)}
		</div>
	)
}
