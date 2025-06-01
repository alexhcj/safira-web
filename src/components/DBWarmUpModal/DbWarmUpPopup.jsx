import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

import { Modal } from '@shared/components/Modal/Modal'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import GithubSVG from '@assets/svg/socials/github.svg?react'
import FigmaSVG from '@assets/svg/technologies/figma.svg?react'
import NestJsSVG from '@assets/svg/technologies/nestjs.svg?react'
import ReactSVG from '@assets/svg/technologies/react.svg?react'

import s from './db-warmup-modal.module.scss'

const STORAGE_KEY = 'safira-db-warmup-modal'
const COOLDOWN_DURATION = 15 * 60 * 1000 // 15 mins

export const DbWarmUpPopup = () => {
	const [timeout, setTimeout] = useLocalStorage(STORAGE_KEY, null)
	const [isOpen, setIsOpen] = useState(false)
	const [progress, setProgress] = useState(0)

	// check if modal should be shown based on localStorage
	useEffect(() => {
		const now = Date.now()

		if (!timeout || now - parseInt(timeout) >= COOLDOWN_DURATION) {
			setIsOpen(true)
			setTimeout(now.toString())
		}
	}, [])

	// progress bar logic - only runs when modal is open
	useEffect(() => {
		if (!isOpen) return

		const totalTime = 50000 // 50 sec
		const interval = 500
		const steps = totalTime / interval
		const increment = 100 / steps

		const timer = setInterval(() => {
			setProgress((prev) => {
				const newProgress = prev + increment

				if (newProgress >= 100) {
					clearInterval(timer)
					return 100
				}
				return newProgress
			})
		}, interval)

		return () => clearInterval(timer)
	}, [isOpen])

	// auto-close modal when progress reaches 100%
	useEffect(() => {
		if (progress >= 100) {
			const closeTimer = setTimeout(() => {
				setIsOpen(false)
			}, 1000)

			return () => clearTimeout(closeTimer)
		}
	}, [progress])

	// manual close handler
	const handleClose = () => {
		setIsOpen(false)
	}

	// reset progress when modal closes
	useEffect(() => {
		if (!isOpen) {
			setProgress(0)
		}
	}, [isOpen])

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} className={s.modal}>
			<div className={s.content}>
				<h1>Database Warming Up</h1>
				<p>We&apos;re preparing our database for optimal performance. This may take up to 50 seconds.</p>

				<div className={s.progress}>
					<div className={s.bar} style={{ width: `${progress}%` }} />
				</div>

				{progress !== 100 && (
					<p className={s.time}>Estimated time remaining: {Math.ceil((100 - progress) / 2)} seconds</p>
				)}
				{progress === 100 && <p className={s.time}>We are done!</p>}

				<div className={s.info}>
					<h3 className={s.info_title}>While you wait check:</h3>
					<div className={s.links}>
						<Link className={s.link} target='_blank' to='https://github.com/alexhcj'>
							<GithubSVG width={26} height={26} /> My github profile
						</Link>
						<Link className={s.link} target='_blank' to='https://github.com/alexhcj/safira-web'>
							<ReactSVG width={25} height={25} /> Project frontend code
						</Link>
						<Link className={s.link} target='_blank' to='https://github.com/alexhcj/safira-back'>
							<NestJsSVG width={25} height={25} /> Project backend code
						</Link>
						<Link
							className={s.link}
							target='_blank'
							to='https://www.figma.com/design/i0PEldds46MbUNR5avusy3/safira?node-id=1494-199&t=U6ofgb37pEb4sqSM-1'
						>
							<FigmaSVG width={23} height={23} /> Project design
						</Link>
					</div>
				</div>

				<Button className={s.button} onClick={handleClose}>
					<Text className={s.button_text} weight='medium' color='white'>
						Enjoy App!
					</Text>
				</Button>
			</div>
		</Modal>
	)
}
