import { Preloader } from '../../../common/Preloader/Preloader'
import { Text } from '../../Text/Text'
import s from './button-search.module.scss'

export const ButtonSearch = ({
	children,
	isLoading,
	disabled,
	onClick
}) => {
	return (
		<button
			className={s.btn}
			type='button'
			onClick={onClick}
			disabled={disabled || isLoading}
		>
			{isLoading
				? <Preloader width={25} height={25} />
				: children || <Text span className={s.btn_text} color="white">Search</Text>
			}
		</button>
	)
}
