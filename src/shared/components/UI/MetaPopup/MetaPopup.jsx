import { ArrowSVG } from '../../../../components/svg'
import s from './metapopup.module.css'

export const MetaPopup = ({ text = 'Meta text', data = [] }) => {
	return (
		<div className={s.list}>
			{text} <ArrowSVG width={14} height={14} />
			<div className={s.popup}>
				{data.map((item, index) => (
					<a href='/src/pages' key={index} className={s.item}>
						{item.text}
					</a>
				))}
			</div>
		</div>
	)
}
