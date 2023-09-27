import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'
import { PostPage } from '../../pages/PostPage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { WishlistPage } from '../../pages/WishlistPage'
import { Product } from '../../pages/Product'
import { Docs } from '../../pages/Docs'
import { useAuthContext } from '../../context/AuthContext'
import { ProtectedRoute } from '../layouts/ProtectedRoute/ProtectedRoute'

const BlogPage = lazy(() => import('../../pages/BlogPage').then((module) => ({ default: module.BlogPage })))
const ShopPage = lazy(() => import('../../pages/ShopPage').then((module) => ({ default: module.ShopPage })))
const RegisterPage = lazy(() => import('../../pages/RegisterPage').then((module) => ({ default: module.RegisterPage })))
const LoginPage = lazy(() => import('../../pages/LoginPage').then((module) => ({ default: module.LoginPage })))

const ProfilePage = lazy(() => import('../../pages/ProfilePage').then((module) => ({ default: module.ProfilePage })))

export const AppRoutes = () => {
	const { user } = useAuthContext()

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/shop' element={<ShopPage />} />
			<Route path='/blog' element={<BlogPage />} />
			<Route path='/blog/:slug' element={<PostPage />} />
			<Route path='/cart' element={<CartPage />} />
			<Route path='/checkout' element={<CheckoutPage />} />
			<Route path='/wishlist' element={<WishlistPage />} />
			<Route path='/products/:slug' element={<Product />} />
			<Route
				path='/profile'
				element={
					<ProtectedRoute user={user}>
						<ProfilePage />
					</ProtectedRoute>
				}
			/>
			<Route path='/docs' element={<Docs />} />
		</Routes>
	)
}
