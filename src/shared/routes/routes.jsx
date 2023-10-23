import React, { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'
import { PostDetailsPage } from '../../pages/PostDetailsPage'
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
const BlankPage = lazy(() => import('../../pages/BlankPage').then((module) => ({ default: module.BlankPage })))
const ProfilePage = lazy(() => import('../../pages/ProfilePage').then((module) => ({ default: module.ProfilePage })))
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))
const ProfileDetails = lazy(() =>
	import('../../modules/Profile/ProfileDetails/ProfileDetails').then((module) => ({ default: module.ProfileDetails })),
)
const Orders = lazy(() => import('../../modules/Profile/Orders/Orders').then((module) => ({ default: module.Orders })))

export const AppRoutes = () => {
	const { user } = useAuthContext()

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/blank-page' element={<BlankPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/shop' element={<ShopPage />} />
			<Route path='/blog' element={<BlogPage />} />
			<Route path='/blog/:slug' element={<PostDetailsPage />} />
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
			>
				<Route index element={<ProfileDetails />} />
				<Route path='profile-details' element={<ProfileDetails />} />
				<Route path='orders' element={<Orders />} />
			</Route>
			<Route path='/docs' element={<Docs />} />
			<Route path='/not-found' element={<NotFoundPage />} />
			<Route path='*' element={<Navigate to='/not-found' />} />
		</Routes>
	)
}
