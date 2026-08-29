import { useEffect, useState } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { FullscreenPreloader } from '@shared/components/common/Preloader/Preloader'

/**
 * Route guard for pages that only make sense while logged out
 * (login, register, forgot-password).
 *
 * Two things this has to get right, both explained by the same cause -
 * `status` passing through 'loading' looks identical whether it's the
 * initial session bootstrap or a fresh login just submitted on this page:
 *
 * 1. While bootstrap is still resolving (status is 'idle'/'loading' on
 *    first load), we don't yet know if there's a live session - render a
 *    loader rather than flashing the login form at someone who's about
 *    to be redirected once their session is confirmed.
 *
 * 2. Once bootstrap settles, the decision is taken ONCE and frozen. If it
 *    settles to "not authenticated", this guard must never reconsider that
 *    - even after the user's own login form on this page succeeds and
 *    isAuthenticated flips true. That transition is owned by the page's
 *    own form (it knows whether to go to /verify-email or a specific
 *    `from` location); if this guard reacted to it too, both would race
 *    to navigate and this one - unconditional to `redirectPath` - would
 *    sometimes win, which looks like "login always redirects to /".
 */
export const GuestRoute = ({ status, isAuthenticated, redirectPath = '/', children }) => {
	const [decision, setDecision] = useState(null) // null | true | false, frozen once set

	useEffect(() => {
		if (decision !== null) return
		if (status === 'idle' || status === 'loading') return

		setDecision(isAuthenticated)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, isAuthenticated])

	if (decision === null) return <FullscreenPreloader />
	if (decision === true) return <Navigate to={redirectPath} replace />

	return children ? children : <Outlet />
}
