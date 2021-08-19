import { ShopList } from './ShopList'
import { ShopSort } from './ShopSort'
import { ShopSideBar } from './ShopSideBar'
import { useState } from 'react'
import s from './shop.module.css'

export const ShopComp = () => {
    const [sort, setSort] = useState('')
	const [search, setSearch] = useState('')

    const sortHandler = (value, sort) => {
        console.log(value, sort)
        setSort(value)
    }
	const searchHandler = (search) => {
		console.log(search)
		setSearch(search)
	}
    
	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.main}>
						<ShopSort sortHandler={sortHandler} />
						<ShopList search={search} sort={sort} />
					</div>
					<div className={s.sidebar}>
						<ShopSideBar searchHandler={searchHandler}/>
					</div>
				</div>
			</div>
		</div>
	)
}
