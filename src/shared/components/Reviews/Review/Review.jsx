import { ImageWithFallback } from '@utils/ImageWithFallback'
import { convertISODate } from '@utils/index'

import { Rating } from '../../Rating/Rating'
import { Text } from '../../UI/Text/Text'

import s from './review.module.scss'

export const Review = ({
	review: {
		user: { firstName, avatarId },
		text,
		createdAt,
		rating,
	},
}) => {
	const avatarUrl = `${import.meta.env.VITE_API_URL}/files/avatar/${avatarId}`

	return (
		<div className={s.review}>
			<ImageWithFallback className={s.avatar} onlySrc src={avatarUrl} imgSize='avatar' />
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
}
