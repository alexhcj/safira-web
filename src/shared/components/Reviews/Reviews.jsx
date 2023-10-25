import React from 'react'
import { NewReview } from './NewReview'
import { Rating } from '../Rating/Rating'
import { Text } from '../UI/Text/Text'
import { ImageWithFallback } from '../../../utils/ImageWithFallback'
import { convertISODate } from '../../../utils'
import s from './reviews.module.scss'

export const Reviews = ({ reviews }) => {
	return (
		<>
			{reviews.map(({ user: { firstName, avatarId }, text, createdAt, rating }, index) => {
				const avatarUrl = `${process.env.REACT_APP_API_URL}/files/avatar/${avatarId}`

				return (
					<div className={s.review} key={index}>
						<ImageWithFallback onlySrc src={avatarUrl} imgSize='avatar' className={s.avatar} />
						<div className={s.content}>
							<div className={s.info}>
								<div className={s.meta}>
									<Text className={s.author}>
										{firstName ? firstName : 'Anonymous'}
										{' - '}
									</Text>
									<Text className={s.date} span>
										{convertISODate(createdAt, 'full')}
									</Text>
								</div>
								<Rating rating={rating} />
							</div>
							{text && <Text className={s.text}>{text}</Text>}
						</div>
					</div>
				)
			})}
			<NewReview />
		</>
	)
}
