import React, {useState} from 'react';
import {Rating} from "../Rating/Rating";
import {Text} from "../UI/Text/Text";
import {convertISODate} from "../../../utils";
import {Button} from "../UI/Buttons/Button/Button";
import {NewRating} from "../Rating/NewRating";
import {Space} from "../UI/Spacing/Space";
import defaultAvatar from "../../../assets/images/default-avatar.png";
import s from './reviews.module.scss'

export const Reviews = ({reviews}) => {
	const [textarea, setTextarea] = useState('');
	const [rating, setRating] = useState(0);

	const handleControl = (e, fn) => {
		fn(e.target.value)
	}

	const handleRating = (rating) => {
		setRating(rating)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const form = {
			text: textarea,
			rating: rating
		}
	}

	return (
		<>
			{reviews.map(({name, avatar, text, createdAt, rating}) =>
				(
					<div className={s.review} key={name}>
						{avatar
							? (<img className={s.avatar} src={avatar} alt="User avatar"/>)
							: (<img className={s.avatar} src={defaultAvatar} alt="User default avatar"/>)
						}
						<div className={s.content}>
							<div className={s.info}>
								<div className={s.meta}>
									<Text className={s.author}>{name}{' - '}</Text>
									<Text className={s.date} span>{convertISODate(createdAt)}</Text>
								</div>
								<Rating rating={rating} />
							</div>
							<Text className={s.text}>{text}</Text>
						</div>
					</div>
				)
			)}
			{/* TODO: add if user isLoggedIn */}
			<div className={s.review_new}>
				<h4 className={s.title}>Add a review</h4>
				<Space space={8} />
				<Text className={s.text}>Your email address will not be published. Required fields are marked</Text>
				<Space space={20} />
				<Text span className={s.rating}>Your rating</Text>
				<Space space={8} />
				{/*<Rating rating={rating} />*/}
				<NewRating onClick={handleRating} />
				<Space space={20} />
				<form onSubmit={handleSubmit}>
					<div className={s.textarea}>
						<label className={s.label} htmlFor="textarea">Your review</label>
						<textarea
							className={s.input}
							name="textarea"
							id="textarea"
							value={textarea}
							onChange={(e) => handleControl(e, setTextarea)}
						></textarea>
					</div>
					<Space space={14} />
					<Space space={20} />
					<Button type="form" htmlType="submit">
						<Text className={s.btn_text} span>Submit</Text>
					</Button>
				</form>
			</div>
		</>
	)
}
