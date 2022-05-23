import {ReactComponent as ArrowSVG} from '../../../../assets/svg/arrow.svg'
import s from './meta-popup.module.scss'

export const MetaPopup = ({ text = 'Meta text', data = [] }) => {
	return (
		<div className={s.list}>
			{text} <ArrowSVG className={s.svg} />
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
