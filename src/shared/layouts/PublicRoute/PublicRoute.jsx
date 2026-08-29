import { Navigate, Outlet } from 'react-router-dom'

import { FullscreenPreloader } from '@shared/components/common/Preloader/Preloader'

export const PublicRoute = ({ status, isAuthenticated, redirectPath = '/', children }) => {
	if (status === 'idle' || status === 'loading') return <FullscreenPreloader />

	if (!isAuthenticated) return <Navigate to={redirectPath} replace />

	return children ? children : <Outlet />
}
