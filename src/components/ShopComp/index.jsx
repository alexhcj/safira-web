import { ShopList } from './ShopList'
import { ShopSort } from './ShopSort'
import { ShopSideBar } from './ShopSideBar'
import { useState } from 'react'
import s from './shop.module.css'

export const ShopComp = () => {
    const [sort, setSort] = useState('')
	const [search, setSearch] = useState('')
	const [searchList, setSearchList] = useState('')

    const sortHandler = (sort) => {
        console.log(sort)
        console.log('Hello')
        // setSort(value)
    }
	const searchHandler = (search) => {
		setSearch(search)
		console.log(search)
	}
	const searchListHandler = (search) => {
		setSearchList(search)
	}
    
	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.main}>
						<ShopSort sortHandler={sortHandler} />
						<ShopList searchList={searchList} sort={sort} />
					</div>
					<div className={s.sidebar}>
						<ShopSideBar search={search} searchListHandler={searchListHandler} searchHandler={searchHandler} />
					</div>
				</div>
			</div>
		</div>
	)
}
