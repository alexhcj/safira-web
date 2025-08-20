import { FeatureStatus } from '@shared/components/UI/FeatureStatus/FeatureStatus'
import { FeatureTag } from '@shared/components/UI/FeatureTag/FeatureTag'
import { FEATURE_STATUS } from '@shared/types/feature-status-types'
import { FEATURE_TAGS } from '@shared/types/feature-tag-types'

export const firstStage = [
	{
		title: 'Improve UX',
		text: 'Support pages, responsive design, loaders & skeletons, subscriptions, extended products info',
		status: FEATURE_STATUS.IN_PROGRESS,
		tag: FEATURE_TAGS.UX,
	},
	{
		title: 'Core logic',
		text: 'Replace state of truth & products management logic from client to backend, improve user auth & profile data management on client',
		tag: FEATURE_TAGS.DEAL_BREAKER,
	},
	{
		title: 'Scalability',
		text: 'Prepare project structure & architecture, composition & code quality for app growing',
		tag: FEATURE_TAGS.UI,
	},
	{
		title: 'Design',
		text: 'System structuring, component dividing',
		tag: FEATURE_TAGS.UI,
	},
]

export const beyondFirstStage = [
	{
		title: 'Optimistic updates',
		text: 'Instant responsive user interface',
		tag: FEATURE_TAGS.UX_UI,
	},
	{
		title: 'Animations',
		text: 'Smooth interface behavior',
		tag: FEATURE_TAGS.UX_UI,
	},
	{
		title: 'Loyalty program',
		text: 'Discounts, sales, affiliate, gift cards, specials',
		tag: FEATURE_TAGS.FEATURE,
	},
	{
		title: 'Testing',
		text: 'Improve app stability',
		tag: FEATURE_TAGS.CORE,
	},
	{
		title: 'Performance',
		text: 'Increase user interaction experience with app',
		tag: FEATURE_TAGS.UX,
	},
	{
		title: 'Multi currency',
		text: 'Availability to select currency',
		tag: FEATURE_TAGS.FEATURE,
	},
	{
		title: 'Multi Languages',
		text: 'Availability to select language',
		tag: FEATURE_TAGS.FEATURE,
	},
	{
		title: 'Feature voting',
		text: 'Vote for feature, make delivery faster!',
		tag: FEATURE_TAGS.FEATURE,
	},
	{
		title: 'UI kit / Storybook',
		text: 'Reusable components kit',
		tag: FEATURE_TAGS.DX,
	},
	{
		title: 'Recipes',
		text: 'Read, write, edit and share your favorite meals!',
		tag: FEATURE_TAGS.FEATURE,
	},
	{
		title: 'Theme',
		text: 'The dark is coming!',
		tag: FEATURE_TAGS.UX,
	},
	{
		title: 'Admin',
		text: 'Protected panel for managers',
		tag: FEATURE_TAGS.CORE,
	},
	{
		title: 'AI integration',
		text: 'AI features for users',
		tag: FEATURE_TAGS.CORE,
	},
]
