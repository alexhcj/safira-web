import { useState, useRef, useEffect } from 'react'

import cn from 'classnames'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import CheckSVG from '@assets/svg/check.svg?react'
import CopySVG from '@assets/svg/copy.svg?react'
import EnvSVG from '@assets/svg/env.svg?react'
import ExternalLinkSVG from '@assets/svg/external-link.svg?react'

import s from './env-status.module.scss'

export const EnvStatus = () => {
	const location = useLocation()
	const [isOpen, setIsOpen] = useState(false)
	const [copiedUrl, setCopiedUrl] = useState(null)
	const popoverRef = useRef(null)
	const buttonRef = useRef(null)

	const environments = {
		development: {
			name: 'Development',
			url: 'https://safira-shop-web-dev.onrender.com',
			current: import.meta.env.DEV,
		},
		production: {
			name: 'Production',
			url: 'https://safira-store.shop',
			current: import.meta.env.PROD,
		},
	}

	// close popover when clicking outside
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(e.target) &&
				buttonRef.current &&
				!buttonRef.current.contains(e.target)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	// handle keyboard navigation
	useEffect(() => {
		const handleKeydown = (e) => {
			if (e.key === 'Escape') {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleKeydown)
			return () => document.removeEventListener('keydown', handleKeydown)
		}
	}, [isOpen])

	const handleCopyUrl = async (url) => {
		try {
			const fullUrl = url + location.pathname + location.search
			await navigator.clipboard.writeText(fullUrl)
			setCopiedUrl(url)
			setTimeout(() => setCopiedUrl(null), 2000)
		} catch (err) {
			console.error('Failed to copy URL:', err)
		}
	}

	const handleNavigate = (url) => {
		const fullUrl = url + location.pathname + location.search
		window.open(fullUrl, '_blank')
	}

	// don't render in production unless it's blank page
	const isContactPage = location.pathname.includes('/blank')

	if (import.meta.env.PROD && !isContactPage) {
		return null
	}

	return (
		<div className={s.env}>
			<button
				ref={buttonRef}
				onMouseEnter={() => setIsOpen(true)}
				onClick={() => setIsOpen(!isOpen)}
				aria-label='Environment switcher'
			>
				<EnvSVG className={s.env_icon} />
			</button>

			<CSSTransition
				in={isOpen}
				timeout={300}
				classNames={{
					enter: s.animateEnter,
					enterActive: s.animateEnterActive,
					enterDone: s.animateEnterDone,
					exit: s.animateExit,
					exitActive: s.animateExitActive,
					exitDone: s.animateExitDone,
				}}
				unmountOnExit
			>
				<div ref={popoverRef} className={cn(s.popover, isOpen && s.active)} onMouseLeave={() => setIsOpen(false)}>
					<div className={s.header}>
						<h3 className={s.title}>View demo builds for each environment or copy shareable links</h3>
					</div>

					<div className={s.env_list}>
						{Object.entries(environments).map(([key, env]) => (
							<div key={key} className={s.env_row}>
								<div className={cn(s.env_item, import.meta.env.MODE === env.name.toLowerCase() && s.active)}>
									{env.current && (
										<div className={cn(s.env_indicator, s[`env_${import.meta.env.MODE}`])}>
											<span className={s.env_pulse}></span>
											<span className={s.env_dot}></span>
										</div>
									)}
									<span className={s.env_name}>{env.name}</span>
								</div>

								<div className={s.actions}>
									{!env.current && (
										<button onClick={() => handleNavigate(env.url)} className={s.action_button} title='Open in new tab'>
											<ExternalLinkSVG />
										</button>
									)}

									<button onClick={() => handleCopyUrl(env.url)} className={s.action_button} title='Copy link'>
										{copiedUrl === env.url ? (
											<span>
												<CheckSVG className={s.copied_icon} />
											</span>
										) : (
											<CopySVG />
										)}
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</CSSTransition>
		</div>
	)
}
