import { useEffect, useState } from 'react'
import { ShopList } from './ShopList'
import { ShopSort } from './ShopSort'
import { Sidebar } from './Sidebar'
import { Pagination } from '../UI/Pagination/Pagination'
import {productsAPI} from "../../api/products";
import s from './shop.module.css'

export const ShopComp = () => {
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState()

	// queries
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('popularity')
	const [tag, setTag] = useState('')
	const [order, setOrder] = useState('desc')
	const [page, setPage] = useState(1)
	const limit = 3

	// headers x-total-count
	const [total, setTotal] = useState(0)

	// pagination
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(limit)
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			try {
				const data = await productsAPI.getAll({ search, sort, tag, order, page, limit })

				setProducts(data)
				setTotal(data.total)
				console.log(data)
			} catch (e) {
				console.log(e)
			}

			setIsLoading(false)
		}

		fetchData()
	}, [search, sort, tag, order, page, limit])

	const pages = []

	for (let i = 1; i <= Math.ceil(total / limit); i++) {
		pages.push(i)
	}

	const currentPagNums = pages.filter((number) => {
		if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
			console.log('PagNums trigger')
			return number
		}

		return null
	})

	const searchHandler = (search) => {
		setSearch(search)
	}

	const sortHandler = (sort) => {
		setSort(sort.sort)
		setOrder(sort.order)
		setTag(sort.tag)
	}

	const selectPage = (e) => {
		if (e.target.nodeName === 'BUTTON') {
			// prevent click !button
			setPage(Number(e.target.id))
		}
	}

	const selectNextPage = () => {
		setPage(page + 1)

		if (page + 1 > maxPageNumberLimit) {
			setmaxPageNumberLimit(maxPageNumberLimit + limit)
			setminPageNumberLimit(minPageNumberLimit + limit)
		}
	}

	const selectPrevPage = () => {
		setPage(page - 1)

		if ((page - 1) % minPageNumberLimit === 0) {
			setmaxPageNumberLimit(maxPageNumberLimit - limit)
			setminPageNumberLimit(minPageNumberLimit - limit)
		}
	}

	const selectFirstPage = () => {
		setPage(1)
		setmaxPageNumberLimit(limit)
		setminPageNumberLimit(0)
	}

	const selectLastPage = () => {
		setPage(pages[pages.length - 1])
		setmaxPageNumberLimit(pages[pages.length - 1])
		setminPageNumberLimit(pages[pages.length - limit - 1])
	}

	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.main}>
						<ShopSort sortHandler={sortHandler} />
						<ShopList products={products} />
						<Pagination
							page={page}
							pages={pages}
							maxPageNumberLimit={maxPageNumberLimit}
							minPageNumberLimit={minPageNumberLimit}
							currentPagNums={currentPagNums}
							selectPage={selectPage}
							selectNextPage={selectNextPage}
							selectPrevPage={selectPrevPage}
							selectFirstPage={selectFirstPage}
							selectLastPage={selectLastPage}
						/>
					</div>
					<div className={s.sidebar}>
						<Sidebar isLoading={isLoading} searchHandler={searchHandler} />
					</div>
				</div>
			</div>
		</div>
	)
}
