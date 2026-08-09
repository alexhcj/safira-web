import { useCallback, useEffect, useState } from 'react'

import cn from 'classnames'

import { Portal } from './Portal'

import Close from '@assets/svg/close.svg?react'

import ds from './styles/modal-default.module.scss'
import s from './styles/sidebar-modal.module.scss'

export const SidebarModal = ({ isOpen, setIsOpen, children, className }) => {
	const [isMounted, setIsMounted] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)

	// handle body scrollbar & compensation gap
	useEffect(() => {
		if (isOpen) {
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

			document.body.style.overflow = 'hidden'
			document.body.style.paddingRight = `${scrollbarWidth}px`
		} else {
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
		}

		return () => {
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
		}
	}, [isOpen])

	// handle mounting and animation states
	useEffect(() => {
		if (isOpen) {
			setIsMounted(true)

			requestAnimationFrame(() => {
				setIsAnimating(true)
			})
		} else {
			setIsAnimating(false)

			const timer = setTimeout(() => {
				setIsMounted(false)
			}, 300) // match this with your CSS transition duration

			return () => clearTimeout(timer)
		}
	}, [isOpen])

	const handleClose = useCallback(() => {
		setIsOpen(false)
	}, [setIsOpen])

	const onKeyHandler = useCallback(
		(e) => {
			if (e.key === 'Escape') {
				handleClose()
			}
		},
		[handleClose],
	)

	useEffect(() => {
		if (isMounted) {
			document.body.addEventListener('keydown', onKeyHandler)

			return () => {
				document.body.removeEventListener('keydown', onKeyHandler)
			}
		}
	}, [onKeyHandler, isMounted])

	// don't render anything if not mounted
	if (!isMounted) return null

	return (
		<Portal>
			<div className={cn(ds.modal, { [s.active]: isAnimating })}>
				<div role='presentation' className={cn(ds.overlay, !isAnimating && ds.hide)} onClick={handleClose} />
				<div className={cn(s.sidebar, { [s.active]: isAnimating }, className)}>
					<button className={s.btn_close} onClick={handleClose} type='button'>
						<Close className={s.close_svg} />
					</button>
					{children}
				</div>
			</div>
		</Portal>
	)
}
