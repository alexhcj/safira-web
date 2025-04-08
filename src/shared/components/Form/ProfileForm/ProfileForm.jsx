import { useEffect, useMemo, useRef, useState } from 'react'

import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { filesAPI } from '@api/files'
import { profilesAPI } from '@api/profiles'
import { ImageWithFallback } from '@utils/ImageWithFallback'
import { compareObjectsShallow, convertISODate } from '@utils/index'

import { Button } from '../../UI/Buttons/Button/Button'
import { Text } from '../../UI/Text/Text'
import { Input } from '../Input/Input'

import s from './profile-form.module.scss'

// const profileFormValidationSchema = {
// 	firstName: [
// 		{
// 			type: 'text',
// 			pattern: /[a-z][A-Z]/,
// 			text: 'First name should be valid.',
// 		},
// 	],
// 	lastName: [
// 		{
// 			type: 'text',
// 			pattern: /[a-z][A-Z]/,
// 			text: 'Last name should be valid.',
// 		},
// 	],
// 	dateOfBirth: [
// 		{
// 			type: 'text',
// 			pattern: /[0-9]\//,
// 			text: 'Date of birth should be valid.',
// 		},
// 	],
// 	location: [
// 		{
// 			type: 'text',
// 			pattern: /[a-z][A-Z]/,
// 			text: 'Location should be valid.',
// 		},
// 	],
// }

export const ProfileForm = ({ user, profile, loading }) => {
	const navigate = useNavigate()
	const { avatarId, firstName, lastName, dateOfBirth, location, email } = profile
	const avatarUrl = `${process.env.REACT_APP_API_URL}/files/avatar/${avatarId}`
	const initialFormState = {
		avatar: null,
		firstName: firstName || '',
		lastName: lastName || '',
		dateOfBirth: (dateOfBirth && convertISODate(dateOfBirth, 'digit')) || '',
		location: location || '',
	}
	const [form, setForm] = useState(useMemo(() => initialFormState, [initialFormState]))
	const [isEditListShown, setIsEditListShown] = useState(false)
	const avatarRef = useRef(null)
	const avatarInputRef = useRef(null)
	// const { errors } = useFormErrors(form, profileFormValidationSchema)

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
			firstName,
			lastName,
			dateOfBirth,
			location,
		}

		const formData = {
			firstName: form.firstName,
			lastName: form.lastName,
			dateOfBirth: dateOfBirth && new Date(form.dateOfBirth.split('/').reverse().join('/')).toISOString(),
			location: form.location,
		}

		return compareObjectsShallow(profileOrigin, formData)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		// prevent same data req
		if (isFormsSame()) return

		// if (Object.keys(errors).length === 0) {
		const formData = {
			firstName: form.firstName,
			lastName: form.lastName,
			dateOfBirth: new Date(form.dateOfBirth.split('/').reverse().join('/')).toISOString(),
			location: form.location,
		}

		if (user && user.id && user.accessToken) {
			await profilesAPI.update(formData)
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
								type='text'
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
							type='text'
							defaultValue={form['firstName']}
							label='First name'
							handleChange={handleChange('firstName')}
							// error={errors['firstName']}
						/>
						<Input
							className={s.input}
							key='lastName'
							id='lastName'
							type='text'
							defaultValue={form['lastName']}
							label='Last name'
							handleChange={handleChange('lastName')}
							// error={errors['lastName']}
						/>
						<Input
							className={s.input}
							key='dateOfBirth'
							id='dateOfBirth'
							type='date'
							defaultValue={form['dateOfBirth']}
							label='Birthday'
							handleChange={handleChange('dateOfBirth')}
							// error={errors['dateOfBirth']}
							placeholder='DD/MM/YYYY'
						/>
						<Input
							className={s.input}
							key='location'
							id='location'
							type='input'
							defaultValue={form['location']}
							label='Location'
							handleChange={handleChange('location')}
							// error={errors['location']}
						/>
						<div className={s.form_actions}>
							{/* TODO: add udpate profile errors handle */}
							{/*{updateError && <span className={cn(s.update_error, updateError && s.active)}>{updateError.message}</span>}*/}
							<Button
								htmlType='submit'
								type='submit'
								className={s.btn_update_profile}
								disabled={loading || isFormsSame()}
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
