import React from 'react'
import { Header } from './shared/components/common/Header/Header'
import { Footer } from './shared/components/common/Footer/Footer'
import { Copyright } from './components/Copyright/Copyright'
import { ButtonScroll } from './shared/components/UI/Buttons/ButtonScroll/ButtonScroll'
// import { ButtonDocs } from './shared/components/UI/Buttons/ButtonDocs/ButtonDocs'
import { AppRoutes } from './shared/routes/routes'
import { WishlistProvider } from './context/WishlistContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { CompareProvider } from './context/CompareContext'

function App() {
	return (
		<div className='app'>
			<AuthProvider>
				<WishlistProvider>
					<CartProvider>
						<CompareProvider>
							<Header />
							<AppRoutes />
							<Footer />
							<Copyright />
							<ButtonScroll />
							{/*<ButtonDocs />*/}
						</CompareProvider>
					</CartProvider>
				</WishlistProvider>
			</AuthProvider>
		</div>
	)
}

export default App
