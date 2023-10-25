import { Profile } from '../modules/Profile/Profile'
import { DefaultLayout } from '../shared/layouts/DefaultLayout/DefaultLayout'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Space } from '../shared/components/UI/Spacing/Space'

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
