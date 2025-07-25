import { useEffect, useState } from 'react'

import { Navigate, NavLink, useLocation } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { useVerifications } from '@hooks/services/useVerifications'
import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'
import { VERIFY_EMAIL } from '@shared/types/api-types'

import { hideEmailPartial } from '@utils/string'
import { exactLength, pattern, required } from '@utils/validation/form'

import { ResendCode } from './ResendCode/ResendCode'

import ArrowSVG from '@assets/svg/arrow.svg?react'

import s from './verify-email.module.scss'

const verifyEmailFormValidationSchema = {
	code: [
		required('Code should be filled.'),
		exactLength(6, 'Verification code must be exactly 6 digits.'),
		pattern(/^\d+$/, 'Verification code should contain only digits.'),
	],
}

export const VerifyEmail = () => {
	const { verifyEmail, isLoading } = useVerifications()
	const location = useLocation()
	const { user, updateEmailVerifiedStatus } = useAuthContext()
	const initialFormState = {
		code: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { isValid, getFieldError, resetForm } = useFormValidation(form, verifyEmailFormValidationSchema)

	if (!location.state?.email) {
		return <Navigate to='/' replace />
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (isValid()) {
			const formData = {
				code: form.code,
			}

			const res = await verifyEmail(formData)

			if (res && res.success && res.code) {
				updateEmailVerifiedStatus(true)
			}
		}
	}

	const handleChange = (e) => {
		!isValid() && resetForm()
		setForm({ code: e.target.value })
	}

	const handleResendCode = () => {
		resetForm()
	}

	return (
		<div className={s.wrapper}>
			<div className={s.box}>
				<h2 className={s.title}>Verify email address</h2>
				{user.isEmailVerified ? (
					<div className={s.content}>
						<h2 className={s.title_success}>Email verified successfully!</h2>
						<p className={s.text_success}>
							Check out our fresh products at reasonable prices. Also look for best promos, products benefits and latest
							news in our Blog.
						</p>
						<div className={s.btns}>
							<Button className={s.btn_search}>
								<NavLink className={s.search_link} to={`/shop?${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`}>
									Search products
								</NavLink>
							</Button>
							<Button className={s.btn_search}>
								<NavLink className={s.search_link} to={`/blog?${import.meta.env.VITE_BLOG_DEFAULT_QUERY}`}>
									Read blog
								</NavLink>
							</Button>
						</div>
					</div>
				) : (
					<div className={s.content}>
						<form className={s.form} onSubmit={handleSubmit}>
							<p className={s.text}>
								We’ve sent 6-digits verification code to{' '}
								<span className={s.email}>{hideEmailPartial(location.state.email)}</span>. Enter this code into input to
								verify that address is yours.
							</p>
							<div className={s.input_box}>
								<Input
									className={s.input}
									handleChange={handleChange}
									key='code'
									id='code'
									type='text'
									value={form.code}
									error={getFieldError('code')}
									placeholder='726482'
								/>
							</div>
							<ResendCode handleResendCode={handleResendCode} type={VERIFY_EMAIL.SIGN_UP} />
							<Button className={s.btn_verify} htmlType='submit' type='auth'>
								{isLoading && <Preloader width={20} height={20} className={s.preloader} />}
								<Text className={s.btn_verify_text} span color='white' weight='bold'>
									Verify email
								</Text>
							</Button>
							{location.state.from === '/register' && (
								<NavLink className={s.btn_later} to='/'>
									<Text className={s.btn_later_text}>Verify later</Text>
									<ArrowSVG className={s.svg} />
								</NavLink>
							)}
						</form>
					</div>
				)}
			</div>
		</div>
	)
}
