import s from './banner.module.css'
import BannerImg from '../../../../assets/images/shopsidebar/1.jpg'
import {NavLink} from "react-router-dom";

const banner = {
	id: 1,
	text: 'Natural food',
	img: BannerImg
}

export const Banner = () => {
	return (
		<NavLink to='/'>
			<img className={s.banner} key={banner.id} src={banner.img} alt={banner.text} />
		</NavLink>
	)
}
