import { Navigate, Outlet } from 'react-router-dom'

import { FullscreenPreloader } from '@shared/components/common/Preloader/Preloader'

/**
 * Unlike GuestRoute, this stays purely reactive after bootstrap settles -
 * there's no in-page action here that should race with this redirect. If
 * the session dies mid-visit (refresh fails, logoutAll from another
 * device), we WANT this to redirect immediately, so isAuthenticated is
 * read live on every render rather than frozen.
 */
export const ProtectedRoute = ({ status, isAuthenticated, redirectPath = '/', children }) => {
	// Same reasoning as GuestRoute: on a hard refresh, isAuthenticated starts
	// false before bootstrap has had a chance to restore the session via
	// refresh(). Redirecting immediately here would bounce a legitimately
	// logged-in user away before their session is even confirmed.
	if (status === 'idle' || status === 'loading') return <FullscreenPreloader />

	if (!isAuthenticated) return <Navigate to={redirectPath} replace />

	return children ? children : <Outlet />
}
