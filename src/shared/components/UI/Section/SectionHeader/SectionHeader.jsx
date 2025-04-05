import { Space } from '../../Spacing/Space'
import { Text } from '../../Text/Text'
import s from './section-header.module.scss'

export const SectionHeader = ({ title, subtitle }) => {
	return (
		<div className={s.header}>
			<Text className={s.subtitle}>{subtitle}</Text>
			<Space space={2} />
			<h2 className={s.title}>{title}</h2>
		</div>
	)
}
