import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Shop, Blog, CartPage, CheckoutPage, Product, Docs } from './pages'
import { Header } from './shared/components/common/Header/Header'
import { Footer } from './shared/components/common/Footer/Footer'
import { Copyright } from './components/Copyright/Copyright'
import { ButtonScroll } from './shared/components/UI/Buttons/ButtonScroll/ButtonScroll'
import { ButtonDocs } from './shared/components/UI/Buttons/ButtonDocs/ButtonDocs'
import { WishlistPage } from './pages/WishlistPage'

function App() {
	return (
		<div className='app'>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/blog'  element={<Blog />} />
				<Route path='/blog/:id' element={<Blog />} />
				<Route path='/cart' element={<CartPage />} />
				<Route path='/checkout' element={<CheckoutPage />} />
				<Route path='/wishlist' element={<WishlistPage />} />
				<Route path='/products/:slug' element={<Product />} />
				<Route path='/docs' element={<Docs />} />
			</Routes>
			<Footer />
			<Copyright />
			<ButtonScroll />
			<ButtonDocs />
		</div>
	)
}

export default App
