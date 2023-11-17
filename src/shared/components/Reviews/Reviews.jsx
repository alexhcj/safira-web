import React from 'react'
import { NewReview } from './NewReview/NewReview'
import { Review } from './Review/Review'
import s from './reviews.module.scss'

export const Reviews = ({ reviews }) => {
	return (
		<>
			<div className={s.reviews}>
				{reviews.map((review, index) => (
					<Review review={review} key={index} />
				))}
			</div>
			<NewReview />
		</>
	)
}
