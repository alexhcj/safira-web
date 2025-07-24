import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { setupErrorHandling } from '@api/api'

import { AuthProvider } from '@context/AuthContext'
import { CartProvider } from '@context/CartContext'
import { CartPopupProvider } from '@context/CartPopupContext'
import { CompareProvider } from '@context/CompareContext'
import { ErrorProvider, useErrorContext } from '@context/ErrorContext'
import { WishlistProvider } from '@context/WishlistContext'

import { CartPopup } from '@components/CartPopup/CartPopup'
import { Copyright } from '@components/Copyright/Copyright'
import { DbWarmUpPopup } from '@components/DBWarmUpModal/DbWarmUpPopup'
import { EnvStatus } from '@components/EnvStatus/EnvStatus'
import { ResponseError } from '@components/ResponseError/ResponseError'

import { Footer } from '@shared/components/common/Footer/Footer'
import { Header } from '@shared/components/common/Header/Header'
import { ButtonScroll } from '@shared/components/UI/Buttons/ButtonScroll/ButtonScroll'
// import { ButtonDocs } from './shared/components/UI/Buttons/ButtonDocs/ButtonDocs'
import { AppRoutes } from '@shared/routes/routes'

const AxiosErrorHandler = ({ children }) => {
	const { addError } = useErrorContext()

	useEffect(() => {
		setupErrorHandling(addError)
	}, [addError])

	return <>{children}</>
}

const AppLayout = ({ children }) => {
	const location = useLocation()
	const isUnsubscribePage = location.pathname === '/unsubscribe'

	if (isUnsubscribePage) {
		return (
			<div className='app'>
				<ErrorProvider>
					<AxiosErrorHandler>
						<AuthProvider>
							{children}
							<ResponseError />
							<EnvStatus />
						</AuthProvider>
					</AxiosErrorHandler>
				</ErrorProvider>
			</div>
		)
	}

	return (
		<div className='app'>
			<ErrorProvider>
				<AxiosErrorHandler>
					<AuthProvider>
						<WishlistProvider>
							<CartProvider>
								<CartPopupProvider>
									<CompareProvider>
										<Header />
										{children}
										<Footer />
										<Copyright />
										<ButtonScroll />
										<ResponseError />
										<DbWarmUpPopup />
										<CartPopup />
										<EnvStatus />
									</CompareProvider>
								</CartPopupProvider>
							</CartProvider>
						</WishlistProvider>
					</AuthProvider>
				</AxiosErrorHandler>
			</ErrorProvider>
		</div>
	)
}

function App() {
	return (
		<AppLayout>
			<AppRoutes />
		</AppLayout>
	)
}

export default App
