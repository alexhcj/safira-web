import React from 'react'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Shop } from '../modules/Shop/Shop'
import { Border } from '../shared/components/UI/Spacing/Border'
import { Space } from '../shared/components/UI/Spacing/Space'

export const ShopPage = () => {
	return (
		<div>
			<Breadcrumbs />
			<Shop />
			<Space size='l' />
			<Border />
		</div>
	)
}

// TODO: shop layout
