import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../../pages/Home'
import { PostPage } from '../../pages/PostPage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { WishlistPage } from '../../pages/WishlistPage'
import { Product } from '../../pages/Product'
import { Docs } from '../../pages/Docs'

const BlogPage = lazy(() => import('../../pages/BlogPage').then(module => ({ default: module.BlogPage })))
const ShopPage = lazy(() => import('../../pages/ShopPage').then(module => ({ default: module.ShopPage })))

export const AppRoutes = () => (
	<Routes>
		<Route path='/' element={<Home />} />
		<Route path='/shop' element={<ShopPage />} />
		<Route path='/blog'  element={<BlogPage />} />
		<Route path='/blog/:slug' element={<PostPage />} />
		<Route path='/cart' element={<CartPage />} />
		<Route path='/checkout' element={<CheckoutPage />} />
		<Route path='/wishlist' element={<WishlistPage />} />
		<Route path='/products/:slug' element={<Product />} />
		<Route path='/docs' element={<Docs />} />
	</Routes>
)
