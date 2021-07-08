import s from './tags.module.css'

export const Tags = ({tags}) => {
	return (
		<div className={s.tags}>
			{tags.map((text, index) => (
                <span className={s.tag} key={index}>{text}</span>
			))}
		</div>
	)
}
