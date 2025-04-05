import cn from 'classnames'
import s from './radio.module.scss'

export const Radio = ({ name, label, id, isChecked, handleChange, className }) => {
	const onChange = (e) => {
		const { id } = e.currentTarget
		handleChange(id)
	}

	return (
		<div className={cn(s.radio, className)}>
			<label className={cn(s.label, isChecked && s.active)} htmlFor={id}>
				{label}
			</label>
			<input type='radio' id={id} name={name} onChange={onChange} />
		</div>
	)
}
