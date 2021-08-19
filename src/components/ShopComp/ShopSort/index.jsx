import s from './shopsort.module.css'

export const ShopSort = ({sortHandler}) => {
    
	return (
		<div className={s.block}>
            <form className={s.form}>
                <select onChange={sortHandler}>
                    <option value='low' name='price'>Sort by price: low to high</option>
                    <option value='high' name='price'>Sort by price: high to low</option>
                    <option value='name'>name</option>
                </select>
            </form>
		</div>
	)
}
