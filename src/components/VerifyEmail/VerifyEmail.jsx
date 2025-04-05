import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { verificationsAPI } from '../../api/verifications'
import { useAuthContext } from '../../context/AuthContext'
import { useFormErrors } from '../../hooks/useFormErrors'
import { Input } from '../../shared/components/Form/Input/Input'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../shared/components/UI/Text/Text'
import { ResendCode } from './ResendCode/ResendCode'
import { Preloader } from '../../shared/components/common/Preloader/Preloader'
import { hideEmailPartial } from '../../utils'
import { VERIFY_EMAIL } from '../../shared/types/api-types'
import { ReactComponent as ArrowSVG } from '../../assets/svg/arrow.svg'
import s from './verify-email.module.scss'

const verifyEmailFormValidationSchema = {
	code: [
		{ type: 'required', pattern: /^(?!\s*$).+/, message: 'Code should be filled.' },
		{
			type: 'text',
			pattern: /^[0-9]{6}$/,
			message: 'Code could be 6 digits in 0-9 range.',
		},
	],
}

export const VerifyEmail = () => {
	const location = useLocation()
	const { user, updateEmailVerifiedStatus } = useAuthContext()
	const initialFormState = {
		code: '',
	}
	const [form, setForm] = useState(initialFormState)
	const [isLoading, setIsLoading] = useState(false)
	const [formError, setFormError] = useState(null)
	const { errors, handleErrors, resetErrors } = useFormErrors(form, verifyEmailFormValidationSchema)

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (Object.keys(errors).length === 0) {
			const formData = {
				code: form.code,
			}

			setIsLoading(true)

			const verifyEmail = await verificationsAPI.verifyEmail(formData)

			if (verifyEmail.statusCode !== 200) {
				setIsLoading(false)
				setFormError(true)
				handleErrors('code', verifyEmail)

				return
			}
			updateEmailVerifiedStatus(true)
		}
	}

	const handleChange = (e) => {
		if (formError) setFormError(false)

		setForm({ code: e.target.value })
	}

	const handleResendCode = () => {
		resetErrors()
		setFormError(null)
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
								<NavLink className={s.search_link} to={`/shop?${process.env.REACT_APP_SHOP_DEFAULT_QUERY}`}>
									Search products
								</NavLink>
							</Button>
							<Button className={s.btn_search}>
								<NavLink className={s.search_link} to={`/blog?${process.env.REACT_APP_BLOG_DEFAULT_QUERY}`}>
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
									error={errors['code'] ?? formError}
									placeholder='726482'
									required
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
