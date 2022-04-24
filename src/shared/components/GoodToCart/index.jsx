import { useState } from 'react'
import s from './goodtocart.module.scss'
import {Text} from "../UI/Text/Text";
import {Button} from "../UI/Buttons/Button/Button";
import {Space} from "../UI/Spacing/Space";

export const GoodToCart = ({quantity}) => {
    const [value, setValue] = useState(1)

    const handleInput = (e) => {
			const {value} = e.target
			setValue(value)
		}

    return (
			<>
				<div className={s.box}>
						<div className={s.input_box}>
							<label className={s.input_label} htmlFor="quantity">Quantity</label>
							<input className={s.input}
									onInput={handleInput}
									value={value}
									type="number"
									name="quantity"
									min={1}
									max={quantity}
							/>
						</div>
						<Button className={s.btn_add} type='submit'>
							<Text size="medium" color="white" weight="medium">Add to cart</Text>
						</Button>
				</div>
				<Space size="s" />
				<Button type="text">
					{/* TODO: if product exist in wishlist => icon HEART. Hover on icon => popup (remove from wishlist) */}
					<Text span>+ Add to WishList</Text>
				</Button>
			</>
    )
}
