import { useState } from 'react'

import cn from 'classnames'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

import { Input } from '@shared/components/Form/Input/Input'
import { Radio } from '@shared/components/Form/Radio/Radio'
import { Textarea } from '@shared/components/Form/Textarea/Textarea'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Border } from '@shared/components/UI/Spacing/Border'
import { Space } from '@shared/components/UI/Spacing/Space'
import { Text } from '@shared/components/UI/Text/Text'

import { calculateTotalPrice } from '@utils/number'

import AmericanExpress from '@assets/images/american-express.png'
import Maestro from '@assets/images/maestro.png'
import Mir from '@assets/images/mir.png'
import Paypal from '@assets/images/paypal.png'
import Visa from '@assets/images/visa.png'
import Check from '@assets/svg/check.svg?react'

import s from './checkout.module.scss'

const radioData = [
	{ id: 'delivery', name: 'delivery', label: 'Delivery' },
	{ id: 'pickup', name: 'delivery', label: 'Pick-up service' },
]

export const Checkout = () => {
	const [cart, setCart] = useLocalStorage('cart', [])
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [radioSelected, setRadioSelected] = useState(radioData[0].id)
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [notes, setNotes] = useState('')
	const [newAccount, setNewAccount] = useState(false)

	const handleFirstNameChange = (value) => {
		setFirstName(value)
	}

	const handleLastNameChange = (value) => {
		setLastName(value)
	}

	const handleRadioChange = (id) => {
		setRadioSelected(id)
	}

	const handleAddressChange = (value) => {
		setAddress(value)
	}

	const handleCityChange = (value) => {
		setCity(value)
	}

	const handlePhoneChange = (value) => {
		setPhone(value)
	}

	const handleEmailChange = (value) => {
		setEmail(value)
	}

	const handleNotesChange = (value) => {
		setNotes(value)
	}

	const onSubmit = () => {
		const form = {
			firstName: firstName,
			lastName: lastName,
			delivery: radioSelected,
			address: address,
			city: city,
			phone: phone,
			email: email,
			notes: newAccount,
		}

		console.log(form)
	}

	return (
		<div className='container'>
			<div className={s.checkout}>
				<div className={s.col_6}>
					<h3 className={s.title}>Billing details</h3>
					<Space space={8} />
					<form>
						<div className={s.box}>
							<Input
								className={s.label}
								value={firstName}
								label='First name'
								placeholder='Christopher'
								handleChange={handleFirstNameChange}
								required
							/>
							<Input
								className={s.label}
								value={lastName}
								label='Last name'
								placeholder='Nolan'
								handleChange={handleLastNameChange}
								required
							/>
						</div>
						<Space space={20} />
						<fieldset className={s.radio}>
							{radioData.map((item) => (
								<Radio
									key={item.id}
									id={item.id}
									name={item.name}
									label={item.label}
									isChecked={radioSelected === item.id}
									handleChange={handleRadioChange}
								/>
							))}
						</fieldset>
						<Space space={20} />
						<Input
							className={s.label}
							value={address}
							label='Street address'
							placeholder='House number and street name'
							handleChange={handleAddressChange}
							required
						/>
						<Space space={20} />
						<Input
							className={s.label}
							value={city}
							label='Town / city'
							placeholder='London'
							handleChange={handleCityChange}
							required
						/>
						<Space space={20} />
						<div className={s.box}>
							<Input
								className={s.label}
								value={phone}
								id='phone'
								name='phone'
								label='Phone number'
								placeholder='89111610339'
								handleChange={handlePhoneChange}
								required
							/>
							<Input
								type='email'
								className={s.label}
								value={email}
								id='email'
								name='email'
								label='Email address'
								placeholder='murphy@gmail.com'
								handleChange={handleEmailChange}
								required
							/>
						</div>
						<Space space={20} />
						<Textarea
							className={s.label}
							value={notes}
							label='Order notes'
							id='notes'
							name='notes'
							placeholder='Notes about your order, e.g. special notes for delivery.'
							handleChange={handleNotesChange}
						/>
					</form>
				</div>
				<div className={s.col_6}>
					<h3 className={s.title}>Billing details</h3>
					<Space space={8} />
					<table className={s.order}>
						<thead>
							<tr>
								<th>Product</th>
								<th>Total</th>
							</tr>
						</thead>
						{/*  */}
						<tbody>
							{cart.map((item) => {
								return (
									<tr key={item.name}>
										<td>
											{item.name} <strong>x {item.quantity}</strong>
										</td>
										<td>${item.price * item.quantity}</td>
									</tr>
								)
							})}
							<tr className={s.total}>
								<td>Order total</td>
								<td>${calculateTotalPrice(cart)}</td>
							</tr>
						</tbody>
					</table>
					<Space space={25} />
					<button
						className={s.account}
						onClick={() => {
							return setNewAccount(!newAccount)
						}}
					>
						<div className={cn(s.checkbox, newAccount && s.active)}>
							<Check className={s.check} />
						</div>
						<span>Create an account?</span>
					</button>
					<Space space={20} />
					<div className={s.payment}>
						<div className={s.methods}>
							<img src={Paypal} alt='Paypal' />
							<img src={Visa} alt='Visa' />
							<img src={Maestro} alt='Maestro' />
							<img src={AmericanExpress} alt='AmericanExpress' />
							<img src={Mir} alt='Mir' />
						</div>
						<Button className={s.button} type='submit' onClick={onSubmit}>
							<Text className={s.button_text} color='white'>
								Proceed to payment
							</Text>
						</Button>
					</div>
				</div>
			</div>
			<Space size='l' />
			<Border />
		</div>
	)
}
