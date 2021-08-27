import { useEffect, useState } from 'react'
import { ShopList } from './ShopList'
import { ShopSort } from './ShopSort'
import { ShopSideBar } from './ShopSideBar'
import { Pagination } from '../UI/Pagination/Pagination'
import { productsAPI } from '../../api'
import s from './shop.module.css'

export const ShopComp = () => {
	// queries
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('')
	const [order, setOrder] = useState('')
	const [page, setPage] = useState(1)
	const limit = 3

	// headers x-total-count
	const [total, setTotal] = useState(0)

	// pagination
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(limit)
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0)

    const [searchList, setSearchList] = useState('') // popup state?
	const [products, setProducts] = useState([])
	const tags = 'new'

	useEffect(() => {
		const fetchData = async () => {
			try {
				// different query param 'tags_like=new'
				if (sort === 'added') {
					const data = await productsAPI.getProductsByTags(sort, tags, order)
					setProducts(data)
				} else {
					const data = await productsAPI.getProducts(search, sort, order, page, limit)
					setProducts(data.data)
					setTotal(data.total)
				}
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [search, sort, order, page, limit])

	const searchHandler = (search) => {
		setSearch(search)
		console.log(search)
	}
	const searchListHandler = (search) => {
		setSearchList(search)
	}

	const sortHandler = (sort) => {
		setSort(sort.sort)
		setOrder(sort.order)
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
		setminPageNumberLimit(pages[pages.length - 1])
	}

	const pages = []

	for (let i = 1; i <= Math.ceil(total / limit); i++) {
		pages.push(i)
	}

	const currentPagNums = pages.filter((number) => {
		if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
			return number
		}

		return null
	})

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
						<ShopSideBar search={search} searchListHandler={searchListHandler} searchHandler={searchHandler} />
					</div>
				</div>
			</div>
		</div>
	)
}
