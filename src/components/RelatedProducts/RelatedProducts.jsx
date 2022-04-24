import { useEffect, useState } from "react"
import s from "./relatedproducts.module.css"
import {productsAPI} from "../../api/products";
import { SliderSection } from "../SliderSection/SliderSection"
import { makeUniqueArray } from "../../utils"

export const RelatedProducts = ({name, category, id}) => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const paramsName = {
      limit: 10,
      search: name,
      name_ne: name
    }
    const paramsCat = {
      limit: 10,
      category: category,
      name_ne: name
    }

    const fetchData = async () => {
      try {
        const data = await productsAPI.getAll(paramsName)
          if(data.total<10) {
            const additionData = await productsAPI.getAll(paramsCat)
            data.data = [...additionData.data, ...data.data]
          }

          setProducts(data.data)
        } catch (e) {
          console.log(e)
      }
    }
    fetchData()
  },[id, category, name])
  makeUniqueArray(products)
  products.splice(10)
  return (
    <section className={s.section}>
        {/*<OneRowProductSlider id={id} heading={'Related Products'} products={products}/>*/}
    </section>
  )
}
