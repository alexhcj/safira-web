import React from 'react'
import { sizeTypes } from '../../../utils'
import { ImageWithFallback } from '../../../utils/ImageWithFallback'
import s from './img-sizes.module.scss'

export const ImgSizes = () => {
	return (
		<div className={s.sizes}>
			{sizeTypes.map((item) => {
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
