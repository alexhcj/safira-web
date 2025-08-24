import { useNavigate } from 'react-router-dom'

import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import s from './stepper-finish.module.scss'

export const StepperFinish = ({
	title = 'Step finished',
	text = 'Check out our fresh products at reasonable prices',
	showLogin = false,
}) => {
	const navigate = useNavigate()

	const handleNavigate = () => {
		navigate(`/shop?${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`)
	}

	const navigateLogin = () => {
		navigate('/login')
	}

	return (
		<div className={s.box}>
			<h3 className={s.title}>{title}</h3>
			<p className={s.text}>{text}</p>
			<div className={s.actions}>
				<Button className={s.btn} onClick={handleNavigate}>
					<Text className={s.btn_text} color='white' span>
						Search products
					</Text>
				</Button>
				{showLogin && (
					<Button className={s.btn} onClick={navigateLogin}>
						<Text className={s.btn_text} color='white' span>
							Login
						</Text>
					</Button>
				)}
			</div>
		</div>
	)
}
