import { Account } from '@modules/Account/Account'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const AccountPage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<Account />
			</DefaultLayout>
		</>
	)
}
