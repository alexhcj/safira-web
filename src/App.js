import { Copyright } from '@components/Copyright/Copyright'
import { AuthProvider } from '@context/AuthContext'
import { CartProvider } from '@context/CartContext'
import { CompareProvider } from '@context/CompareContext'
import { WishlistProvider } from '@context/WishlistContext'
import { Footer } from '@shared/components/common/Footer/Footer'
import { Header } from '@shared/components/common/Header/Header'
import { ButtonScroll } from '@shared/components/UI/Buttons/ButtonScroll/ButtonScroll'
// import { ButtonDocs } from './shared/components/UI/Buttons/ButtonDocs/ButtonDocs'
import { AppRoutes } from '@shared/routes/routes'

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
