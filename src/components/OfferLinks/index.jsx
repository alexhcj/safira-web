import { useEffect, useState } from 'react'
import s from "./offerlinks.module.css";
import { offersAPI } from '../../api'
import { NavLink } from 'react-router-dom'
export const OfferLinks = () => {
  const [offers, setOffers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await offersAPI.getOffers()
        setOffers(data)
      } catch (e) {
        console.log(e)
      }
    }
  
    fetchData()
  }, [])
 return (
  <div className={s.container}>
    {offers.map((offer) => {
				const { id, img } = offer

				return (
          <div className={s.img__link}>
            <NavLink className={s.nav__link} to='/shop'><img key={id} src={img} alt=""/></NavLink>
            
            </div>
				)
			})}
      </div>
)
};
