export const NAVIGATION_ITEMS = [
	{
		order: 1,
		id: 'agreement-to-terms',
		title: 'Agreement to Terms',
	},
	{
		order: 2,
		id: 'use-license',
		title: 'Use License',
		subNavs: [
			{ order: 1, id: 'permitted-use', title: 'Permitted Use' },
			{ order: 2, id: 'license-termination', title: 'License Termination' },
		],
	},
	{
		order: 3,
		id: 'user-account',
		title: 'User Account',
		subNavs: [
			{ order: 1, id: 'account-creation', title: 'Account Creation' },
			{ order: 2, id: 'account-suspension', title: 'Account Suspension' },
		],
	},
	{
		order: 4,
		id: 'prohibited-uses',
		title: 'Prohibited Uses',
		subNavs: [{ order: 1, id: 'prohibited-activities', title: 'Specifically Prohibited Activities' }],
	},
	{
		order: 5,
		id: 'service-availability',
		title: 'Service Availability',
		subNavs: [
			{ order: 1, id: 'maintenance', title: 'Uptime and Maintenance' },
			{ order: 2, id: 'service-modifications', title: 'Service Modifications' },
		],
	},
	{
		order: 6,
		id: 'payment-terms',
		title: 'Payment Terms',
		subNavs: [
			{ order: 1, id: 'billing-payments', title: 'Billing and Payments' },
			{ order: 2, id: 'refund-policy', title: 'Refund Policy' },
			{ order: 3, id: 'late-payments', title: 'Late Payments' },
		],
	},
	{
		order: 7,
		id: 'intellectual-property',
		title: 'Intellectual Property',
		subNavs: [
			{ order: 1, id: 'our-content', title: 'Our Content' },
			{ order: 2, id: 'user-content', title: 'User Content' },
		],
	},
	{ order: 8, id: 'limitation-liability', title: 'Limitation of Liability' },
	{
		order: 9,
		id: 'indemnification',
		title: 'Indemnification',
	},
	{ order: 10, id: 'governing-law', title: 'Governing Law' },
	{
		order: 11,
		id: 'change-terms',
		title: 'Changes to Terms',
		subNavs: [{ order: 1, id: 'notification-changes', title: 'Notification of Changes' }],
	},
	{ order: 12, id: 'contact', title: 'Contact Information' },
]
