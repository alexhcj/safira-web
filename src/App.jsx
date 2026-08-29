import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { setupErrorHandling } from '@api/api'

import { AppProvider } from '@context/AppContext'
import { AuthProvider } from '@context/AuthContext'
import { BurgerPopupProvider } from '@context/BurgerPopupContext'
import { CartProvider } from '@context/CartContext'
import { CartPopupProvider } from '@context/CartPopupContext'
import { CompareProvider } from '@context/CompareContext'
import { ErrorProvider, useErrorContext } from '@context/ErrorContext'
import { UserProfileProvider } from '@context/UserProfileContext'
import { WishlistProvider } from '@context/WishlistContext'

import { BurgerPopup } from '@components/BurgerPopup/BurgerPopup'
import { CartPopup } from '@components/CartPopup/CartPopup'
import { Copyright } from '@components/Copyright/Copyright'
import { DbWarmUpPopup } from '@components/DBWarmUpModal/DbWarmUpPopup'
import { EnvStatus } from '@components/EnvStatus/EnvStatus'
import { ResponseError } from '@components/ResponseError/ResponseError'

import { Footer } from '@shared/components/common/Footer/Footer'
import { Header } from '@shared/components/common/Header/Header'
import { ButtonScroll } from '@shared/components/UI/Buttons/ButtonScroll/ButtonScroll'
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
						<AppProvider>
							<AuthProvider>
								{children}
								<ResponseError />
								<EnvStatus />
							</AuthProvider>
						</AppProvider>
					</AxiosErrorHandler>
				</ErrorProvider>
			</div>
		)
	}

	return (
		<div className='app'>
			<ErrorProvider>
				<AxiosErrorHandler>
					<AppProvider>
						<AuthProvider>
							<UserProfileProvider>
								<WishlistProvider>
									<CartProvider>
										<CartPopupProvider>
											<BurgerPopupProvider>
												<CompareProvider>
													<Header />
													{children}
													<Footer />
													<Copyright />
													<ButtonScroll />
													<ResponseError />
													<DbWarmUpPopup />
													<CartPopup />
													<BurgerPopup />
													<EnvStatus />
												</CompareProvider>
											</BurgerPopupProvider>
										</CartPopupProvider>
									</CartProvider>
								</WishlistProvider>
							</UserProfileProvider>
						</AuthProvider>
					</AppProvider>
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
