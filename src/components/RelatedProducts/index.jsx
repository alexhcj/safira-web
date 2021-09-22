import { useEffect, useState } from "react"
import s from "./relatedProducts.module.css"
import { productsAPI } from "../../api"
import { OneRowProductSlider } from "../UI/SliderSection"
import { useLocation } from "react-router"

export const RelatedProducts = ({name, category, id}) => {
  const [products, setProducts] = useState([])
  const location = useLocation()
  console.log(location.state.name)
  useEffect(() => {
    const paramsName = {
      limit: 10,
      search: name
    }
    const paramsCat = {
      limit: 10,
      category: category
    }
    
    const fetchData = async () => {
      try {
        const data = await productsAPI.getProducts(paramsName)
          if(data.total<10) {
            const additionData = await productsAPI.getProducts(paramsCat)
            data.data.push(...additionData.data) // refactor
          }  

          setProducts(data.data)
        } catch (e) {
          console.log(e)
      }
    }
    fetchData()
  },[])
    const arr = []
    products.map((product) => {
      return arr.push(product.id)
    })
    const arrHelper = []
    for(let i=0;i<arr.length;i++){
        for(let l=i+1;l<arr.length;l++){
            if(arr[i]===arr[l]||arr[l]){
                arrHelper.push(l)
            }
        }
    }
    for(let k=0, reducer=0;k<arrHelper.length;k++,reducer--){
        products.splice(arrHelper[k]-reducer, 1)
    }
    products.splice(10)
    //  в util
  return (
    <section className={s.section}>
        <OneRowProductSlider id={id} heading={'Related Products'} products={products}/>
    </section>
  )
}
