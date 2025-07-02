import { lazy } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { CartPage } from '@pages/CartPage'
import { CheckoutPage } from '@pages/CheckoutPage'
import { HomePage } from '@pages/HomePage'
import { PostPage } from '@pages/PostPage'
import { WishlistPage } from '@pages/WishlistPage'

import { useAuthContext } from '@context/AuthContext'

// import { Docs } from '../../pages/Docs'
import { PublicRoute } from '@shared/layouts/PublicRoute/PublicRoute'

import { ProtectedRoute } from '../layouts/ProtectedRoute/ProtectedRoute'

const BlogPage = lazy(() => import('../../pages/BlogPage').then((module) => ({ default: module.BlogPage })))
const ShopPage = lazy(() => import('../../pages/ShopPage').then((module) => ({ default: module.ShopPage })))
const RegisterPage = lazy(() => import('../../pages/RegisterPage').then((module) => ({ default: module.RegisterPage })))
const LoginPage = lazy(() => import('../../pages/LoginPage').then((module) => ({ default: module.LoginPage })))
const BlankPage = lazy(() => import('../../pages/BlankPage').then((module) => ({ default: module.BlankPage })))
const ProfilePage = lazy(() => import('../../pages/ProfilePage').then((module) => ({ default: module.ProfilePage })))
const ComparePage = lazy(() => import('../../pages/ComparePage').then((module) => ({ default: module.ComparePage })))
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))
const ProfileDetails = lazy(() =>
	import('../../modules/Profile/ProfileDetails/ProfileDetails').then((module) => ({ default: module.ProfileDetails })),
)
const ProductPage = lazy(() => import('../../pages/ProductPage').then((module) => ({ default: module.ProductPage })))
const Orders = lazy(() => import('../../modules/Profile/Orders/Orders').then((module) => ({ default: module.Orders })))
const CategoriesPage = lazy(() =>
	import('../../pages/CategoriesPage').then((module) => ({ default: module.CategoriesPage })),
)
const BrandsPage = lazy(() => import('../../pages/BrandsPage').then((module) => ({ default: module.BrandsPage })))
const ChangeEmailPage = lazy(() =>
	import('../../pages/ChangeEmailPage').then((module) => ({ default: module.ChangeEmailPage })),
)
const ChangePasswordPage = lazy(() =>
	import('../../pages/ChangePasswordPage').then((module) => ({ default: module.ChangePasswordPage })),
)
const VerifyEmailPage = lazy(() =>
	import('../../pages/VerifyEmailPage').then((module) => ({ default: module.VerifyEmailPage })),
)
const AboutUsPage = lazy(() => import('../../pages/AboutUsPage').then((module) => ({ default: module.AboutUsPage })))
const ContactUsPage = lazy(() =>
	import('../../pages/ContactUsPage').then((module) => ({ default: module.ContactUsPage })),
)
const FaqPage = lazy(() => import('@pages/FaqPage').then((module) => ({ default: module.FaqPage })))

export const AppRoutes = () => {
	const { user } = useAuthContext()

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/about-us' element={<AboutUsPage />} />
			<Route path='/contact-us' element={<ContactUsPage />} />
			<Route path='/blank-page' element={<BlankPage />} />
			<Route path='/faq' element={<FaqPage />} />
			{/*<PublicRoute user={user}>*/}
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/shop' element={<ShopPage />} />
			<Route path='/blog' element={<BlogPage />} />
			<Route path='/blog/:slug' element={<PostPage />} />
			<Route path='/cart' element={<CartPage />} />
			<Route path='/checkout' element={<CheckoutPage />} />
			<Route path='/wishlist' element={<WishlistPage />} />
			<Route path='/products/:slug' element={<ProductPage />} />
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
			<Route
				path='/change-email'
				element={
					<ProtectedRoute user={user}>
						<ChangeEmailPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/change-password'
				element={
					<ProtectedRoute user={user}>
						<ChangePasswordPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/verify-email'
				element={
					<ProtectedRoute user={user}>
						<VerifyEmailPage />
					</ProtectedRoute>
				}
			/>
			{/*<Route path='/docs' element={<Docs />} />*/}
			<Route path='/compare' element={<ComparePage />} />
			<Route path='/categories' element={<CategoriesPage />} />
			<Route path='/brands' element={<BrandsPage />} />
			<Route path='/not-found' element={<NotFoundPage />} />
			<Route path='*' element={<Navigate to='/not-found' />} />
		</Routes>
	)
}
