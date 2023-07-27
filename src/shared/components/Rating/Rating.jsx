import React from 'react'
import cn from 'classnames'
import { generateID } from '../../../utils/IdGenerator'
import { ReactComponent as Star } from '../../../assets/svg/star.svg'
import { ReactComponent as StarFilled } from '../../../assets/svg/star-filled.svg'
import s from './rating.module.scss'

export const Rating = ({ rating }) => {
	const totalStars = 5

	return (
		<div className={s.rating}>
			{[...new Array(totalStars)].map((arr, index) => {
				const showEmptyIcon = rating < index + 1

				const isActiveRating = rating !== 1
				const isRatingWithPrecision = rating % 1 !== 0
				const isRatingEqualToIndex = Math.ceil(rating) === index + 1
				const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex

				return (
					<div className={cn(s.box, s.cursor)} key={generateID()}>
						<div
							className={s.item}
							style={{ width: showRatingWithPrecision && `${Number((rating % 1) * 100).toFixed(2)}%` }}
						>
							<StarFilled />
						</div>
						<div className={s.item}>
							{showEmptyIcon  ?  <Star /> : <StarFilled />}
						</div>
					</div>
				)
			})}
		</div>
	)
}
