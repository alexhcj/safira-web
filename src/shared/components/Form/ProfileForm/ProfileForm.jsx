import { useEffect, useMemo, useRef, useState } from 'react'

import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { filesAPI } from '@api/files'
import { profilesAPI } from '@api/profiles'

import { useFormValidation } from '@hooks/useFormValidation'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'

import { convertISODate, maxLength, pattern, dateToISO } from '@utils/index'

import { Button } from '../../UI/Buttons/Button/Button'
import { Text } from '../../UI/Text/Text'
import { Input } from '../Input/Input'

import s from './profile-form.module.scss'

const profileFormValidationSchema = {
	firstName: [
		pattern(/^$|^[a-zA-Z\s'-]+$/, 'First name should contain only letters, spaces, apostrophes and hyphens.'),
		maxLength(50, 'First name maximum length should be 50 characters.'),
	],
	lastName: [
		pattern(/^$|^[a-zA-Z\s'-]+$/, 'Last name should contain only letters, spaces, apostrophes and hyphens.'),
		maxLength(50, 'Last name maximum length should be 50 characters.'),
	],
	dateOfBirth: [
		pattern(
			/^$|^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$/,
			'Date should be in DD/MM/YYYY format and be valid.',
		),
		maxLength(20, 'Date maximum length should be 20 characters.'),
	],
	location: [
		pattern(
			/^$|^[A-Za-z\s\-,.']+$/,
			'Location should contain only letters, spaces, hyphens, apostrophes, periods and commas.',
		),
		maxLength(50, 'Location maximum length should be 50 characters.'),
	],
}

export const ProfileForm = ({ user, profile, loading }) => {
	const navigate = useNavigate()
	const { avatarId, firstName, lastName, dateOfBirth, location, email } = profile
	const avatarUrl = `${import.meta.env.VITE_API_URL}/files/avatar/${avatarId}`
	const initialFormState = {
		avatar: null,
		firstName: firstName || '',
		lastName: lastName || '',
		dateOfBirth: (dateOfBirth && convertISODate(dateOfBirth, 'digit')) || '',
		location: location || '',
	}
	const [form, setForm] = useState(initialFormState)
	const [isEditListShown, setIsEditListShown] = useState(false)
	const avatarRef = useRef(null)
	const avatarInputRef = useRef(null)
	const { isValid, getFieldError } = useFormValidation(form, profileFormValidationSchema)

	useEffect(() => {
		document.addEventListener('click', clickOutsideHandler)

		return () => {
			document.removeEventListener('click', clickOutsideHandler)
		}
	}, [])

	const clickOutsideHandler = (e) => {
		if (avatarRef.current && !avatarRef.current.contains(e.target)) {
			setIsEditListShown(false)
		}
	}

	const handleEditListShown = () => {
		setIsEditListShown(!isEditListShown)
	}

	const handleUpdate = async (e) => {
		const action = e.target.dataset.avatar

		if (action === 'upload') {
			if (avatarInputRef.current !== undefined && avatarInputRef.current.click !== undefined)
				avatarInputRef.current.click()
		} else {
			if (!avatarId) return
			await filesAPI.deleteAvatar(avatarId)
		}

		setIsEditListShown(false)
	}

	const handleAvatarInputUpdate = async (e) => {
		const file = e.target.files[0]
		const data = new FormData()
		data.append('avatar', file)
		await filesAPI.uploadAvatar(data)
		setIsEditListShown(false)
	}

	const isFormsSame = () => {
		const profileOrigin = {
			firstName: firstName || '',
			lastName: lastName || '',
			dateOfBirth: dateOfBirth || null,
			location: location || '',
		}

		const formData = {
			firstName: form.firstName || '',
			lastName: form.lastName || '',
			dateOfBirth: form.dateOfBirth ? dateToISO(form.dateOfBirth) : null,
			location: form.location || '',
		}

		// Special handling for date comparison
		const datesEqual = () => {
			if (!profileOrigin.dateOfBirth && !formData.dateOfBirth) return true
			if (!profileOrigin.dateOfBirth || !formData.dateOfBirth) return false

			// Compare just the date part (ignoring time)
			return (
				new Date(profileOrigin.dateOfBirth).toISOString().split('T')[0] ===
				new Date(formData.dateOfBirth).toISOString().split('T')[0]
			)
		}

		return (
			profileOrigin.firstName === formData.firstName &&
			profileOrigin.lastName === formData.lastName &&
			datesEqual() &&
			profileOrigin.location === formData.location
		)
	}

	const createFormDataPayload = () => {
		const payload = {}

		// Only add fields that have values and have changed
		if (form.firstName !== (firstName || '')) {
			payload.firstName = form.firstName
		}

		if (form.lastName !== (lastName || '')) {
			payload.lastName = form.lastName
		}

		const formDateISO = form.dateOfBirth ? dateToISO(form.dateOfBirth) : null
		if (formDateISO !== dateOfBirth) {
			payload.dateOfBirth = formDateISO
		}

		if (form.location.trim() !== (location || '').trim()) {
			payload.location = form.location.trim()
		}

		return payload
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!isValid(false)) {
			if (isFormsSame()) return
		}

		const formData = createFormDataPayload()

		if (Object.keys(formData).length > 0 && user && user.id && user.accessToken) {
			try {
				await profilesAPI.update(formData)
			} catch (error) {
				console.log('Failed to update profile: ', error)
			}
		}
	}

	const handleChange = (field) => (e) => {
		setForm({
			...form,
			[field]: e.target.value,
		})
	}

	const handleChangeEmail = () => {
		navigate('/change-email')
	}

	const handleChangePassword = () => {
		navigate('/change-password')
	}

	return (
		<>
			<div className={s.main}>
				<section>
					<h3 className={s.title}>Credentials</h3>
					<div className={s.credentials_list}>
						<div className={s.credential_email}>
							<Input
								className={s.credential_input}
								key='email'
								id='email'
								type='email'
								defaultValue={email}
								label='Email'
							/>
							<Button type='profile' className={s.btn_credential} onClick={handleChangeEmail}>
								<Text span color='white' weight='semi' className={s.btn_credential_text}>
									Change email
								</Text>
							</Button>
						</div>
						<div className={s.credential_password} onClick={handleChangePassword}>
							<Input
								className={s.credential_input}
								key='password'
								id='password'
								defaultValue='••••••••••••••'
								label='Password'
							/>
							<Button type='profile' className={s.btn_credential}>
								<Text span color='white' weight='semi' className={s.btn_credential_text}>
									Change password
								</Text>
							</Button>
						</div>
					</div>
				</section>
				<section>
					<h3 className={s.title}>Profile</h3>
					<form className={s.form} onSubmit={handleSubmit}>
						<Input
							className={s.input}
							key='firstName'
							id='firstName'
							value={form['firstName']}
							label='First name'
							handleChange={handleChange('firstName')}
							error={getFieldError('firstName')}
						/>
						<Input
							className={s.input}
							key='lastName'
							id='lastName'
							value={form['lastName']}
							label='Last name'
							handleChange={handleChange('lastName')}
							error={getFieldError('lastName')}
						/>
						<Input
							className={s.input}
							key='dateOfBirth'
							id='dateOfBirth'
							value={form['dateOfBirth']}
							label='Birthday'
							handleChange={handleChange('dateOfBirth')}
							error={getFieldError('dateOfBirth')}
						/>
						<Input
							className={s.input}
							key='location'
							id='location'
							value={form['location']}
							label='Location'
							handleChange={handleChange('location')}
							error={getFieldError('location')}
						/>
						<div className={s.form_actions}>
							{/* TODO: add udpate profile errors handle */}
							{/*{updateError && <span className={cn(s.update_error, updateError && s.active)}>{updateError.message}</span>}*/}
							<Button
								htmlType='submit'
								type='submit'
								className={s.btn_update_profile}
								disabled={loading || !isValid(false)}
							>
								<Text span color='white' className={s.btn_update_profile_text}>
									Update profile
								</Text>
							</Button>
						</div>
					</form>
				</section>
			</div>
			<div className={s.aside}>
				<div className={s.avatar} onClick={handleEditListShown} ref={avatarRef}>
					<label htmlFor='avatar' className={s.label}>
						Profile picture
					</label>
					<ImageWithFallback onlySrc src={avatarUrl} imgSize='avatar-s' alt={`${form['firstName']}'s avatar`} />
					<input
						id='avatar'
						name='avatar'
						type='file'
						accept='image/png,image/jpeg,image/jpg'
						hidden
						ref={avatarInputRef}
						onChange={handleAvatarInputUpdate}
					/>
					<div className={s.edit}>
						<span className={s.edit_text}>Edit</span>
						<ul className={cn(s.edit_list, { [s.active]: isEditListShown })} onClick={handleUpdate}>
							<li className={s.edit_item} data-avatar='upload'>
								Upload avatar
							</li>
							<li className={s.edit_item} data-avatar='delete'>
								Remove avatar
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
