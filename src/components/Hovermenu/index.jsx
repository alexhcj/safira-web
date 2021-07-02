import s from "./hoverproducts.module.css"
import { NavLink } from 'react-router-dom'


export const Hovermenu = () => {
    return(
        <div  className={s.hovermenu}>
            <img className={s.img} src="http://localhost:5000/assets/images/buymenu/cart.jpg" alt="cart"/>
            <NavLink to='/shop'>
                <img className={s.img} src="http://localhost:5000/assets/images/buymenu/search.jpg" alt="search"/>
            </NavLink>
            <img className={s.img} src="http://localhost:5000/assets/images/buymenu/wish.jpg" alt="withlist"/>
            <img className={s.img} src="http://localhost:5000/assets/images/buymenu/restore.jpg" alt="restore"/>
            
        </div>
    )
}

