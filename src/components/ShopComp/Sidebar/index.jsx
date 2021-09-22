import { Search } from './Search'
import s from './sidebar.module.css'

export const Sidebar = ({ searchHandler }) => {
	return (
		<aside>
			<h3 className={s.title}>Filter by name</h3>
			<Search searchHandler={searchHandler} />
		</aside>
	)
}
