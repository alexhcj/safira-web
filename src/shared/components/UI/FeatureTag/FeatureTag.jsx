import s from './feature-tag.module.scss'

export const FeatureTag = ({ tag }) => {
	return <span className={s.tag}>{tag}</span>
}
