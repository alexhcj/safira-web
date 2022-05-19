import React from 'react'
import {Breadcrumbs} from "../shared/components/UI/Breadcrumbs/Breadcrumbs";
import {Checkout} from "../modules/Checkout/Checkout";

export const CheckoutPage = () => {
	return (
		<>
			<Breadcrumbs />
			<Checkout />
		</>
	)
}
