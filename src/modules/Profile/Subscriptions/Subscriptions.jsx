import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { useEmailer } from '@hooks/services/useEmailer'
import { useProfile } from '@hooks/services/useProfile'

import { SubscriptionItem } from '@modules/Profile/Subscriptions/SubscriptionItem/SubscriptionItem'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { UserActions } from '@shared/components/UserActions/UserActions'

import EmailSVG from '@assets/svg/email.svg?react'

import s from './subscriptions.module.scss'

export const Subscriptions = () => {
	const navigate = useNavigate()
	const { user } = useAuthContext()
	const { profile } = useProfile()
	const { findSubscription, updateSubscription, isLoading } = useEmailer()
	const [subscription, setSubscription] = useState({
		devNews: false,
		blogNews: false,
		marketingNews: false,
	})
	const [isInitialLoading, setIsInitialLoading] = useState(true)
	const [loadingStates, setLoadingStates] = useState({
		blogNews: false,
		devNews: false,
		marketingNews: false,
		all: false,
	})

	useEffect(() => {
		const fetchData = async () => {
			setIsInitialLoading(true)
			const res = await findSubscription()

			if (res && res.success) setSubscription(res.subscription)
			setIsInitialLoading(false)
		}

		fetchData()
	}, [])

	const handleVerifyEmail = () => {
		navigate('/verify-email', {
			state: { email: profile.email, isEmailVerified: user.isEmailVerified },
		})
	}

	const checkSubscriptionsStatus = () => {
		const { blogNews, devNews, marketingNews } = subscription

		if (blogNews === false && devNews === false && marketingNews === false) return 'Unsubscribed'
		if (blogNews && devNews && marketingNews) return 'Subscribed'
		return 'Partial'
	}

	// handle subscriptions with separate subscribe and decline actions
	const handleSubscription = async (subscriptionKey, action) => {
		let updateData = {}

		setLoadingStates((prev) => ({ ...prev, [subscriptionKey]: true }))

		if (subscriptionKey === 'all') {
			const newValue = action === 'subscribe'

			updateData = {
				blogNews: newValue,
				devNews: newValue,
				marketingNews: newValue,
			}
		} else {
			updateData = {
				[subscriptionKey]: !subscription[subscriptionKey],
			}
		}

		try {
			const res = await updateSubscription(updateData)

			if (res && res.success) {
				setSubscription((prev) => ({ ...prev, ...updateData }))
			}
		} finally {
			setLoadingStates((prev) => ({ ...prev, [subscriptionKey]: false }))
		}
	}

	if (!user.isEmailVerified) {
		return (
			<UserActions
				message='Verify email address to get access for managing subscriptions.'
				actionMessage='Click here to verify email'
				icon={<EmailSVG className={s.svg} />}
				className={s.verify_email}
				onClick={handleVerifyEmail}
			/>
		)
	}

	if (isInitialLoading) {
		return <Preloader width={20} height={20} />
	}

	return (
		<section>
			<h3 className={s.title}>Subscriptions</h3>
			<table className={s.table}>
				<thead className={s.thead}>
					<tr>
						<th>Type</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<SubscriptionItem
						title='Store news'
						status={subscription.blogNews ? 'Subscribed' : 'Unsubscribed'}
						subscriptionKey='blogNews'
						onClick={handleSubscription}
						isLoading={loadingStates.blogNews}
					/>
					<SubscriptionItem
						title='Tech news'
						status={subscription.devNews ? 'Subscribed' : 'Unsubscribed'}
						subscriptionKey='devNews'
						onClick={handleSubscription}
						isLoading={loadingStates.devNews}
					/>
					<SubscriptionItem
						title='Sales & Proposals'
						status={subscription.marketingNews ? 'Subscribed' : 'Unsubscribed'}
						subscriptionKey='marketingNews'
						onClick={handleSubscription}
						isLoading={loadingStates.marketingNews}
					/>
					<SubscriptionItem
						title='All'
						status={checkSubscriptionsStatus()}
						subscriptionKey='all'
						onClick={handleSubscription}
						isLoading={loadingStates.all}
					/>
				</tbody>
			</table>
		</section>
	)
}
