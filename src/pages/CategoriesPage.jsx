import React from 'react'
import { Categories } from '../modules/Categories/Categories'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'

export const CategoriesPage = () => {
	return (
		<>
			<Breadcrumbs />
			<Categories />
		</>
	)
}
