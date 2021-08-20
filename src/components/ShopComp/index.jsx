import { ShopList } from './ShopList'
import { ShopSort } from './ShopSort'
import { ShopSideBar } from './ShopSideBar'
import { useState } from 'react'
import s from './shop.module.css'

export const ShopComp = () => {
    const [sort, setSort] = useState('')

    const sortHandler = (sort) => {
        console.log(sort)
        console.log('Hello')
        // setSort(value)
    }
    
	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.main}>
						<ShopSort sortHandler={sortHandler} />
						<ShopList sort={sort} />
					</div>
					<div className={s.sidebar}>
						<ShopSideBar />
					</div>
				</div>
			</div>
		</div>
	)
}
