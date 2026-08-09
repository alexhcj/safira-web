import { useNavigate } from 'react-router-dom'

import { Button } from '@shared/components/UI/Buttons/Button/Button'

import s from './not-found.module.scss'

export const NotFound = () => {
	const navigate = useNavigate()

	const handleBack = () => {
		navigate(-1)
	}

	const handleHomeClick = () => {
		navigate('/')
	}

	return (
		<div className={s.not_found}>
			<h1 className={s.title}>404</h1>
			<h2 className={s.sub_title}>Oops! Page not be found</h2>
			<p className={s.text}>
				Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily
				unavailable.
			</p>
			<div className={s.actions}>
				<Button className={s.btn} type='submit' onClick={handleBack}>
					Go back
				</Button>
				<Button className={s.btn} type='submit' onClick={handleHomeClick}>
					Back to home page
				</Button>
			</div>
		</div>
	)
}
