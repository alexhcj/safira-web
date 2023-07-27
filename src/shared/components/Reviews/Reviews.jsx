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
			{/* TODO: immediately render comment for UX, then check with back res ok or not */}
			{/* TODO: replace userId: fullName to fullName. prop shuld be in comment object */}
			{reviews.map(({ user: { fullName }, avatar, text, createdAt, rating }) =>
				(
					<div className={s.review} key={fullName}>
						{avatar
							? (<img className={s.avatar} src={avatar} alt="User avatar" />)
							: (<img className={s.avatar} src={defaultAvatar} alt="User default avatar" />)
						}
						<div className={s.content}>
							<div className={s.info}>
								<div className={s.meta}>
									<Text className={s.author}>{fullName ? fullName : 'Anonymous'}{' - '}</Text>
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
