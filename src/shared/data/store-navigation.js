export const ACCOUNT_NAVIGATION_ITEMS = {
	authed: [
		{
			title: 'Profile details',
			route: '/account/profile-details',
		},
		{
			title: 'Order history',
			route: '/account/order-history',
		},
		{
			title: 'Subscriptions',
			route: '/account/subscriptions',
		},
	],
	notAuthed: [
		{
			title: 'Login',
			route: '/login',
		},
		{
			title: 'Register',
			route: '/register',
		},
	],
}

export const STORE_NAVIGATION_ITEMS = {
	home: '/',
	shop: {
		browse: [
			{
				title: 'Products',
				route: `/shop?${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`,
			},
			{
				title: 'Categories',
				route: '/categories',
			},
			{
				title: 'Brands',
				route: '/brands',
			},
		],
		quickAccess: [
			{
				title: 'Cart',
				route: '/cart',
			},
			{
				title: 'Wishlist',
				route: '/wishlist',
			},
			{
				title: 'Compare',
				route: '/compare',
			},
		],
	},
	blog: `/blog?${import.meta.env.VITE_BLOG_DEFAULT_QUERY}`,
	pages: [
		{
			title: 'About us',
			route: '/about-us',
		},
		{
			title: 'Privacy policy',
			route: '/privacy-policy',
		},
		{
			title: 'Terms & Conditions',
			route: '/terms-conditions',
		},
		{
			title: 'Frequently Questions',
			route: '/faq',
		},
		{
			title: 'Site map',
			route: '/site-map',
		},
		{
			title: 'Roadmap',
			route: '/road-map',
		},
	],
	account: null, // position marker — resolved via accountNavMap at render time
	contactUs: '/contact-us',
}
