import s from './tags.module.css'

export const Tags = ({tags}) => {
	return (
		<div className={s.tags}>
			{tags.map((item, index) => (
				<span className={s.tag} key={index}>{item}</span>
			))}
		</div>
	)
}
