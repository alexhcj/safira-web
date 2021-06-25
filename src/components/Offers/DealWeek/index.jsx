import { useEffect, useState } from "react";
import { dealweekAPI } from "../../../api/dealweek-api";
import s from "./dealweek.module.css";
import { Button } from "../../Button"
import { Timer } from "../Timer";

export const DealWeek = () => {
  const [deal, setDeal] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dealweekAPI.getDeal()
        setDeal(data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])



  return (
    <div className={s.block}>
      <h3 className={s.heading}>Deals Of The Week</h3>
      {deal.map((theDeal) => {
        let { id, name, price, newprice, img, sale, category} = theDeal
        let saleTxt = ''
        if(sale==true){
          saleTxt = 'SALE'
        }

        return (
          <div>
            <p className={s.sale}>{saleTxt}</p>
            <div key={id} className={s.wrapper}>
                <img className={s.img} src={img} alt=""/>
              <h2 className={s.name}>{name}</h2>
              <h3 className={s.category}>{category}</h3>
              <p className={s.price}>{price}<span className={s.newprice}>{newprice}</span></p>
              <Timer />
              <Button text='add to cart' />
            </div>
          </div>
        )
        
      })}
      
    </div>
  )
};
