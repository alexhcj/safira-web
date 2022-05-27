import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../../pages/Home'
import { Shop } from '../../pages/Shop'
import { Blog } from '../../pages/Blog'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { WishlistPage } from '../../pages/WishlistPage'
import { Product } from '../../pages/Product'
import { Docs } from '../../pages/Docs'

export const AppRoutes = () => (
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
)
