import { imgSizeTypes } from '../../../utils'
import s from './img-sizes.module.scss'

export const ImgSizes = () => {
	return (
		<div className={s.sizes}>
			{imgSizeTypes.map((item) => {
				const { type, size } = item

				return (
					<div className={s.item} key={type}>
						<span className={s.type}>{type}</span>
						<span className={s.size}>{size}</span>
					</div>
				)
			})}
		</div>
	)
}
