import { Profile } from '../modules/Profile/Profile'
import { DefaultLayout } from '../shared/layout/DefaultLayout/DefaultLayout'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Border } from '../shared/components/UI/Spacing/Border'
import { Space } from '../shared/components/UI/Spacing/Space'

export const ProfilePage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<Profile />
				<Space space={46} />
				<Border />
			</DefaultLayout>
		</>
	)
}
