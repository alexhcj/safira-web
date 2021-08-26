import { useEffect, useState } from 'react'
import { ShopList } from './ShopList'
import { ShopSort } from './ShopSort'
import { ShopSideBar } from './ShopSideBar'
import { Pagination } from '../UI/Pagination/Pagination'
import { productsAPI } from '../../api'
import s from './shop.module.css'

export const ShopComp = () => {
	const [data, setData] = useState([])

	// pagination pages
	const [currentPage, setCurrentPage] = useState(1)
	const pageLimit = 3

	// pagination nums
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3)
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0)
	const pageNumberLimit = 3

	// pagination indexes
	const lastItemIndex = currentPage * pageLimit
	const firstItemIndex = lastItemIndex - pageLimit
	const currentProducts = data.slice(firstItemIndex, lastItemIndex)

	// query params
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('')
	const [order, setOrder] = useState('')
	const tags = 'new'

	// total pages
	const pages = []

	for (let i = 1; i <= Math.ceil(data.length / pageLimit); i++) {
		pages.push(i)
	}

	const currentPagNums = pages.filter((number) => {
		if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
			return number
		}

		return null
	})

	useEffect(() => {
		const fetchData = async () => {
			try {
				// different query param 'tags_like=new'
				if (sort === 'added') {
					const data = await productsAPI.getProductsByTags(sort, tags, order)
					setData(data)
				} else {
					const data = await productsAPI.getProducts(search, sort, order)
					setData(data)
				}
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [pageLimit, search, sort, order])

	const searchHandler = (search) => {
		setSearch(search)
	}

	const sortHandler = (sort) => {
		setSort(sort.sort)
		setOrder(sort.order)
	}

	const currentPageHandler = (e) => {
		if (e.target.nodeName === 'BUTTON') {
			// prevent click !button
			setCurrentPage(Number(e.target.id))
		}
	}

	const nextPageClickHandler = () => {
		setCurrentPage(currentPage + 1)

		if (currentPage + 1 > maxPageNumberLimit) {
			setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
			setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
		}
	}

	const prevPageClickHandler = () => {
		setCurrentPage(currentPage - 1)

		if (currentPage - 1 < minPageNumberLimit) {
			setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
			setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
		}
	}

	const firstPageClickHandler = () => {
		setCurrentPage(1)
		setmaxPageNumberLimit(pageLimit)
		setminPageNumberLimit(0)
	}

	const lastPageClickHandler = () => {
		setCurrentPage(pages[pages.length - 1])
		setmaxPageNumberLimit(pages[pages.length - 1])
		setminPageNumberLimit(pages[pages.length - 1] - pageNumberLimit)
	}

	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.main}>
						<ShopSort sortHandler={sortHandler} />
						<ShopList currentProducts={currentProducts} />
						<Pagination
							pages={pages}
							currentPagNums={currentPagNums}
							currentPage={currentPage}
							maxPageNumberLimit={maxPageNumberLimit}
							minPageNumberLimit={minPageNumberLimit}
							currentPageHandler={currentPageHandler}
							nextPageClickHandler={nextPageClickHandler}
							prevPageClickHandler={prevPageClickHandler}
							firstPageClickHandler={firstPageClickHandler}
							lastPageClickHandler={lastPageClickHandler}
						/>
					</div>
					<div className={s.sidebar}>
						<ShopSideBar searchHandler={searchHandler} />
					</div>
				</div>
			</div>
		</div>
	)
}
