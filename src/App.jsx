import { useEffect } from 'react'

import { setupErrorHandling } from '@api/api'

import { AuthProvider } from '@context/AuthContext'
import { CartProvider } from '@context/CartContext'
import { CompareProvider } from '@context/CompareContext'
import { ErrorProvider, useErrorContext } from '@context/ErrorContext'
import { WishlistProvider } from '@context/WishlistContext'

import { Copyright } from '@components/Copyright/Copyright'
import { DbWarmUpPopup } from '@components/DBWarmUpModal/DbWarmUpPopup'
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

function App() {
	return (
		<div className='app'>
			<ErrorProvider>
				<AxiosErrorHandler>
					<AuthProvider>
						<WishlistProvider>
							<CartProvider>
								<CompareProvider>
									<Header />
									<AppRoutes />
									<Footer />
									<Copyright />
									<ButtonScroll />
									<ResponseError />
									<DbWarmUpPopup />
									{/*<ButtonDocs />*/}
								</CompareProvider>
							</CartProvider>
						</WishlistProvider>
					</AuthProvider>
				</AxiosErrorHandler>
			</ErrorProvider>
		</div>
	)
}

export default App
