import { Profile } from '@modules/Profile/Profile'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Space } from '@shared/components/UI/Spacing/Space'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const ProfilePage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<Profile />
				<Space space={46} />
			</DefaultLayout>
		</>
	)
}
