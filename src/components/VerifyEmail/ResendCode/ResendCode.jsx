import { useEffect } from 'react'

import cn from 'classnames'

import { useVerifications } from '@hooks/services/useVerifications'
import { useLocalStorage } from '@hooks/useLocalStorage.hook'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Timer } from '@shared/components/UI/Timer/Timer'
import { VERIFY_EMAIL } from '@shared/types/api-types'

import s from './resend-code.module.scss'

/**
 * @param {Function} handleResendCode - Optional callback for resending code
 * @param {string} type - Type of email verification (VERIFY_EMAIL enum)
 * @param {string} classNames - Optional CSS class names
 */
export const ResendCode = ({ handleResendCode, type, classNames }) => {
	const { resendVerifyEmail, isLoading } = useVerifications()
	const [codeTimestamp, setCodeTimeout] = useLocalStorage('code-timeout')
	const EXPIRATION_TIME = 1000 * 60

	useEffect(() => {
		if (codeTimestamp && new Date().getTime() > +new Date(codeTimestamp.createdAt) + 1000 * 60) {
			setCodeTimeout(null)
		}
	}, [])

	useEffect(() => {
		const codeAutoClean = setTimeout(() => {
			setCodeTimeout(null)
		}, EXPIRATION_TIME)

		return () => clearTimeout(codeAutoClean)
	}, [codeTimestamp, setCodeTimeout])

	const resendCode = async () => {
		let res

		switch (type) {
			case VERIFY_EMAIL.SIGN_UP:
				res = await resendVerifyEmail({ type: VERIFY_EMAIL.SIGN_UP })
				break
			case VERIFY_EMAIL.CHANGE_PASSWORD:
				res = await resendVerifyEmail({ type: VERIFY_EMAIL.CHANGE_PASSWORD })
				break
			case VERIFY_EMAIL.CHANGE_EMAIL:
				res = await resendVerifyEmail({ type: VERIFY_EMAIL.CHANGE_EMAIL })
				break
			default:
				return null
		}

		if (res && res.success && res.statusCode === 201) {
			setCodeTimeout({ createdAt: res.createdAt, statusCode: res.statusCode })
		}
	}

	return (
		<div className={cn(s.box, { [s.active]: codeTimestamp }, classNames)}>
			{codeTimestamp && new Date().getTime() < +new Date(codeTimestamp.createdAt) + 1000 * 60 ? (
				<>
					<span>Next resend available</span>
					<Timer className={s.timer} type='minutes' date={new Date(+new Date(codeTimestamp.createdAt) + 1000 * 60)} />
				</>
			) : (
				<>
					<span>Didn’t get a code?</span>
					<button
						className={s.btn}
						type='button'
						onClick={() => (handleResendCode ? handleResendCode(resendCode()) : resendCode())}
						disabled={isLoading || codeTimestamp}
					>
						{isLoading ? <Preloader width={20} height={20} /> : 'Click to resend'}
					</button>
				</>
			)}
		</div>
	)
}
