import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { verificationsAPI } from '../../../api/verifications'
import { useLocalStorage } from '../../../hooks/useLocalStorage.hook'
import { Timer } from '../../../shared/components/UI/Timer/Timer'
import { Preloader } from '../../../shared/components/common/Preloader/Preloader'
import { VERIFY_EMAIL } from '../../../shared/types/api-types'
import s from './resend-code.module.scss'

export const ResendCode = ({ handleResedCode }) => {
	const [codeTimestamp, setCodeTimeout] = useLocalStorage('code-timeout')
	const [isLoading, setIsLoading] = useState(false)
	const expirationTime = 1000 * 60

	useEffect(() => {
		if (codeTimestamp && new Date().getTime() > +new Date(codeTimestamp.createdAt) + 1000 * 60) {
			setCodeTimeout(null)
		}
	}, [])

	useEffect(() => {
		const codeAutoClean = setTimeout(() => {
			setCodeTimeout(null)
		}, expirationTime)

		return () => clearTimeout(codeAutoClean)
	}, [codeTimestamp])

	const resendCode = async () => {
		setIsLoading(true)
		const code = await verificationsAPI.resendVerifyEmail({ type: VERIFY_EMAIL.SIGN_UP })

		if (code.statusCode === 201) {
			setCodeTimeout(code)
		}

		setIsLoading(false)
	}

	return (
		<div className={cn(s.box, { [s.active]: codeTimestamp })}>
			{codeTimestamp && new Date().getTime() < +new Date(codeTimestamp.createdAt) + 1000 * 60 ? (
				<>
					<span>Next resend available</span>
					<Timer className={s.timer} type='minutes' date={new Date(+new Date(codeTimestamp.createdAt) + 1000 * 60)} />
				</>
			) : (
				<>
					<span className={s.text}>Didn’t get a code?</span>
					<button
						className={s.btn}
						type='button'
						onClick={() => handleResedCode(resendCode())}
						disabled={isLoading || codeTimestamp}
					>
						{isLoading ? <Preloader width={20} height={20} className={s.preloader} /> : 'Click to resend'}
					</button>
				</>
			)}
		</div>
	)
}
