import s from "./sale.module.css";
import { useEffect, useState } from 'react'
import { saleAPI } from '../../api'
import { Button } from '../Button'

export const Sale = () => {
  const [sale, setSale] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await saleAPI.getSale()
				setSale(data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])
  
    return (
  <div className={s.section}>
    {sale.map((sale) => {
      let { id, title, img, saleInfo, description} = sale
      return (
        <div className={s.block}>
          <img className={s.img} src={img}/>
          <div className="container">
            <h3 className={s.title}>{title}</h3>
            <h2 className={s.sale__info}>{saleInfo}</h2>
            <h4 className={s.decription}>{description}</h4>
            <Button to='/shop' text='DISCROVER NOW'/>
          </div>
        </div>
      )
    })}
  </div>
    )
  
};
