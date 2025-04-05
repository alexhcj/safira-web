import { useLocation, useNavigate } from 'react-router-dom'
import { CategoryCard } from './CategoryCard/CategoryCard'
import { categories } from './categories-data'
import { Space } from '../../shared/components/UI/Spacing/Space'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../shared/components/UI/Text/Text'
import s from './categories.module.scss'

export const Categories = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const isCategoriesPage = location.pathname.slice(1) === 'brands'

	const handleCategoriesNavigate = () => {
		navigate('/categories')
	}

	const handleBrandsNavigate = () => {
		navigate('/brands')
	}

	return (
		<div className='container'>
			<div className={s.block}>
				<div>
					<span className={s.title}>Browse by</span>
					<div className={s.actions}>
						<Button type={isCategoriesPage ? 'secondary' : 'submit'} onClick={handleCategoriesNavigate}>
							<Text span color='white'>
								Categories
							</Text>
						</Button>
						<Button type={isCategoriesPage ? 'submit' : 'secondary'} onClick={handleBrandsNavigate}>
							<Text span className={s.secondary_text}>
								Brands
							</Text>
						</Button>
					</div>
				</div>
				<nav className={s.nav}>
					{categories
						.sort((a, b) => (b.name < a.name ? 1 : -1))
						.map((category) => (
							<CategoryCard key={category.primeCategory} category={category} />
						))}
				</nav>
			</div>
			<Space size='l' />
		</div>
	)
}
