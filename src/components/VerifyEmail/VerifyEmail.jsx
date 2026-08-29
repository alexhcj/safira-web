import { useState } from 'react'

import cn from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'

import { useUserProfileContext } from '@context/UserProfileContext'

import { useVerifications } from '@hooks/services/useVerifications'
import { useFormValidation } from '@hooks/useFormValidation'

import { StepperFinish } from '@components/StepperFinish/StepperFinish'

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

const errorPopoverTransition = {
	enter: s.animateEnter,
	enterActive: s.animateEnterActive,
	enterDone: s.animateEnterDone,
	exit: s.animateExit,
	exitActive: s.animateExitActive,
	exitDone: s.animateExitDone,
}

const verifyEmailFormValidationSchema = {
	code: [
		required('Code should be filled.'),
		exactLength(6, 'Verification code must be exactly 6 digits.'),
		pattern(/^\d+$/, 'Verification code should contain only digits.'),
	],
}

export const VerifyEmail = () => {
	const { profile, patchProfile } = useUserProfileContext()
	const { verifyEmail, isLoading: isVerificationsLoading } = useVerifications()
	const location = useLocation()
	const initialFormState = {
		code: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { isValid, getFieldError, resetForm } = useFormValidation(form, verifyEmailFormValidationSchema)

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (isValid()) {
			const formData = {
				code: form.code,
			}

			const res = await verifyEmail(formData)

			if (res.success) {
				patchProfile({ isEmailVerified: true })
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
				{profile.isEmailVerified ? (
					<div className={s.content}>
						<StepperFinish
							title='Email verified successfully!'
							text='Check out our fresh products at reasonable prices. Also look for best promos, products benefits and latest
							news in our Blog.'
							actions={
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
							}
							className={s.stepper_finish}
						/>
					</div>
				) : (
					<div className={s.content}>
						<form className={s.form} onSubmit={handleSubmit}>
							<p className={s.text}>
								We’ve sent 6-digits verification code to
								<span className={s.email}> {hideEmailPartial(profile.email)}</span>. Enter this code into input to
								verify that address is yours.
							</p>
							<Input
								className={s.input}
								errorTransitionClasses={errorPopoverTransition}
								handleChange={handleChange}
								key='code'
								id='code'
								type='text'
								value={form.code}
								error={getFieldError('code')}
								placeholder='726482'
							/>
							<ResendCode handleResendCode={handleResendCode} type={VERIFY_EMAIL.SIGN_UP} />
							<Button className={cn(s.btn_verify, isVerificationsLoading && s.loading)} htmlType='submit' type='auth'>
								{isVerificationsLoading ? (
									<Preloader width={20} height={20} />
								) : (
									<Text className={s.btn_verify_text} span color='white' weight='bold'>
										Verify email
									</Text>
								)}
							</Button>
							{location.state?.from === '/register' && (
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
