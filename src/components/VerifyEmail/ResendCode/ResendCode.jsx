import { useEffect, useState } from 'react';
import cn from 'classnames'
import { verificationsAPI } from '../../../api/verifications'
import { useLocalStorage } from '../../../hooks/useLocalStorage.hook'
import { Timer } from '../../../shared/components/UI/Timer/Timer'
import { Preloader } from '../../../shared/components/common/Preloader/Preloader'
import { VERIFY_EMAIL } from '../../../shared/types/api-types'
import s from './resend-code.module.scss'

// types: VERIFY_EMAIL
export const ResendCode = ({ handleResendCode, type, classNames }) => {
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
		let code

		switch (type) {
			case VERIFY_EMAIL.SIGN_UP:
				code = await verificationsAPI.resendVerifyEmail({ type: VERIFY_EMAIL.SIGN_UP })
				break
			case VERIFY_EMAIL.CHANGE_PASSWORD:
				code = await verificationsAPI.resendVerifyEmail({ type: VERIFY_EMAIL.CHANGE_PASSWORD })
				break
			case VERIFY_EMAIL.CHANGE_EMAIL:
				code = await verificationsAPI.resendVerifyEmail({ type: VERIFY_EMAIL.CHANGE_EMAIL })
				break
			default:
				console.error('No type found')
		}

		if (code.statusCode === 201) {
			setCodeTimeout(code)
		}

		setIsLoading(false)
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
