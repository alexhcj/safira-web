import s from './ShopSideBar.module.css'
import { convertArray } from '../../../utils'


export const ShopSideBar = ({searchHandler}) => {

	

    
	return (
		<section>
			<input placeholder='Search here...' className={s.name} type='text' onChange={(e)=>searchHandler(e.target.value)} />
			{/* {console.log(shopProducts[0][1].name)} */}
			<input type='range'/>
			
		</section>
	)
}
