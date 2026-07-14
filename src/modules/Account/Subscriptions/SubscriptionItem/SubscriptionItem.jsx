import { Preloader } from '@shared/components/common/Preloader/Preloader'

import s from './subscription-item.module.scss'

export const SubscriptionItem = ({ title, status, onClick, subscriptionKey, isLoading }) => {
	return (
		<tr>
			<td className={s.type}>{title}</td>
			<td className={s.status}>{status}</td>
			{subscriptionKey === 'all' ? (
				<td className={s.action}>
					{status !== 'Subscribed' && (
						<button
							className={s.unsubscribed}
							type='button'
							onClick={() => onClick(subscriptionKey, 'subscribe')}
							disabled={isLoading}
						>
							{isLoading ? <Preloader width={16} height={16} /> : 'Subscribe'}
						</button>
					)}
					{status !== 'Unsubscribed' && (
						<button
							className={s.subscribed}
							type='button'
							onClick={() => onClick(subscriptionKey, 'decline')}
							disabled={isLoading}
						>
							{isLoading ? <Preloader width={16} height={16} /> : 'Decline'}
						</button>
					)}
				</td>
			) : (
				<td className={s.action}>
					{isLoading ? (
						<Preloader width={16} height={16} />
					) : (
						<button
							className={status === 'Subscribed' ? s.subscribed : s.unsubscribed}
							type='button'
							onClick={() => onClick(subscriptionKey)}
							disabled={isLoading}
						>
							{status === 'Subscribed' ? 'Decline' : 'Subscribe'}
						</button>
					)}
				</td>
			)}
		</tr>
	)
}
