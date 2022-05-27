import React from 'react'
import { NewReview } from './NewReview'
import { Rating } from '../Rating/Rating'
import { Text } from '../UI/Text/Text'
import { convertISODate } from '../../../utils'
import defaultAvatar from '../../../assets/images/default-avatar.png'
import s from './reviews.module.scss'

export const Reviews = ({ reviews }) => {
	return (
		<>
			{/* TODO: update UI when new review is created */}
			{reviews.map(({ name, avatar, text, createdAt, rating }) =>
				(
					<div className={s.review} key={name}>
						{avatar
							? (<img className={s.avatar} src={avatar} alt="User avatar" />)
							: (<img className={s.avatar} src={defaultAvatar} alt="User default avatar" />)
						}
						<div className={s.content}>
							<div className={s.info}>
								<div className={s.meta}>
									<Text className={s.author}>{name ? name : 'Anonymous'}{' - '}</Text>
									<Text className={s.date} span>{convertISODate(createdAt)}</Text>
								</div>
								<Rating rating={rating} />
							</div>
							<Text className={s.text}>{text}</Text>
						</div>
					</div>
				)
			)}
			<NewReview />
		</>
	)
}
