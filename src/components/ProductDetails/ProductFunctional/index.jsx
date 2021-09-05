
import { useState } from 'react'
import s from './ProductFunctional.module.css'
export { useState } from 'react'

export const ProductFunctional = (quantity) => {
    const [input, setInput] = useState(1)
    const quant = Math.round(quantity.quantity/2)

    const inputHandler = (value) => {
        if(value>quant) {
            setInput(quant)
        } else if(value<=0&&value!==''){
            setInput(1)
        } else {
            setInput(value)
        }
    }
    console.log()
    return (
        <section>
            <div className={s.section}>
                <p className={s.quant}>Quantity</p>
                <input className={s.input}
                    onInput={(e)=>inputHandler(e.target.value)}
                    value={input}
                    type="number" 
                />
                <button style={{border: "1px solid grey", marginLeft: 20}}>Add to Cart</button>
            </div>
            <button className={s.toWishlist}>+ Add to WishList</button>
        </section>
    )
}