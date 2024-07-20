import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import s from './pagination.module.scss'
import cn from 'classnames'

export const Pagination = ({ meta = {} }) => {
	const perPage = 3
	const [params, setParams] = useSearchParams()
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(perPage)
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0)
	const { page, total, isLastPage } = meta

	const totalPages = () => {
		const pages = []

		if (total && params.size !== 0) {
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
		const query = Object.fromEntries([...params])

		setParams({ ...query, offset: '0' })
		setmaxPageNumberLimit(3)
		setminPageNumberLimit(0)
	}

	const selectFinish = () => {
		let query = Object.fromEntries([...params])

		setParams({ ...query, offset: `${totalPages()[totalPages().length - 2] * +query.limit}` })
		setmaxPageNumberLimit(totalPages().length)
		setminPageNumberLimit(totalPages()[totalPages().length - 4])
	}

	const selectPrev = () => {
		let query = Object.fromEntries([...params])

		setParams({ ...query, offset: `${+query.offset - +query.limit}` })

		if (page === minPageNumberLimit + 1) {
			setmaxPageNumberLimit((prev) => prev - 3)
			setminPageNumberLimit((prev) => prev - 3)
		}
	}

	const selectNext = () => {
		let query = Object.fromEntries([...params])

		setParams({ ...query, offset: `${+query.offset + +query.limit}` })

		if (page === maxPageNumberLimit) {
			setmaxPageNumberLimit((prev) => prev + 3)
			setminPageNumberLimit((prev) => prev + 3)
		}
	}

	const selectPage = (e) => {
		e.preventDefault()
		if (e.target.nodeName !== 'BUTTON') return

		const page = e.target.id
		const query = Object.fromEntries([...params])

		setParams({ ...query, offset: `${page * +query.limit - +query.limit}` })
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
			<div role='presentation' className={s.list} onClick={(e) => selectPage(e)}>
				{calcCurrentPages().map((num) => (
					<button className={cn(s.btn, { [s.active]: page === num })} id={num} key={num}>
						{num}
					</button>
				))}
			</div>
			<button className={s.btn} onClick={selectNext} disabled={isLastPage || total === 0}>
				next
			</button>
			{!isLastPage && (
				<button className={s.btn} onClick={selectFinish} disabled={total === 0}>
					&gt;&gt;
				</button>
			)}
		</div>
	)
}
