import { Profile } from '@modules/Profile/Profile'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const ProfilePage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<Profile />
			</DefaultLayout>
		</>
	)
}
