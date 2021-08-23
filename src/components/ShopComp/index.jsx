import { ShopList } from './ShopList'
import { ShopSort } from './ShopSort'
import { ShopSideBar } from './ShopSideBar'
import { useState } from 'react'
import s from './shop.module.css'

export const ShopComp = () => {
	const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')

    const searchHandler = (search) => {
        console.log(search)
        setSearch(search)
    }
    
    const sortHandler = (sort) => {
        setSort(sort.sort)
        setOrder(sort.order)
    }
    
	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.main}>
						<ShopSort sortHandler={sortHandler} />
						<ShopList search={search} sort={sort} order={order} />
					</div>
					<div className={s.sidebar}>
						<ShopSideBar searchHandler={searchHandler}/>
					</div>
				</div>
			</div>
		</div>
	)
}
