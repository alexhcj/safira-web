import { useCallback, useEffect } from 'react'

import cn from 'classnames'

import { Portal } from './Portal'

import { ReactComponent as Close } from '@assets/svg/close.svg'

import s from './styles/modal.module.scss'

export const Modal = ({ isOpen, setIsOpen, children, className }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	const onKeyHandler = useCallback((e) => (e.key === 'Escape' && setIsOpen ? setIsOpen(false) : null), [setIsOpen])

	useEffect(() => {
		document.body.addEventListener('keydown', onKeyHandler)

		return () => {
			document.body.removeEventListener('keydown', onKeyHandler)
		}
	}, [onKeyHandler])

	return (
		<>
			{isOpen && (
				<Portal>
					<div className={s.modal}>
						<div role='presentation' className={s.overlay} onClick={() => setIsOpen(false)} />
						<div className={cn(s.box, className)}>
							<div className={s.wrapper}>
								<div className='container'>
									<button className={s.btn_close} onClick={() => setIsOpen(false)} type='button'>
										<Close className={s.close_svg} />
									</button>
									{children}
								</div>
							</div>
						</div>
					</div>
				</Portal>
			)}
		</>
	)
}
