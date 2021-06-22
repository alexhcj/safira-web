import s from './slide.module.css'

export const Slide = ({slide}) => {
	const { title, subTitle, text, img } = slide

	return (
		<div className={s.item}>
			<h1>{title}</h1>
            <h5>{subTitle}</h5>
            <p>{text}</p>
		</div>
	)
}
