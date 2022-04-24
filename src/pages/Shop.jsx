import React from 'react'
import {Breadcrumbs} from "../shared/components/UI/Breadcrumbs/Breadcrumbs";
import {ShopComp} from "../components/ShopComp/ShopComp";
import {Border} from "../shared/components/UI/Spacing/Border";

export const Shop = () => {
	return (
		<div>
			<Breadcrumbs />
			<ShopComp />
			<Border/>
		</div>
	)
}

// TODO: shop layout
