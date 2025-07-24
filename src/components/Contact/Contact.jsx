import { ContactInfo } from '@components/Contact/ContactInfo/ContactInfo'

import { ContactForm } from '@shared/components/Form/ContactForm/ContactForm'

import s from './contact.module.scss'

export const Contact = () => {
	return (
		<div className='container'>
			<div className={s.box}>
				<ContactInfo />
				<ContactForm />
			</div>
		</div>
	)
}
