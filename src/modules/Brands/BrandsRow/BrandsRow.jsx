import { useNavigate } from 'react-router-dom'

import { brandToSlug } from '@utils/string'

import s from './brands-row.module.scss'

export const BrandsRow = ({ name, brands, rowRef }) => {
	const navigate = useNavigate()

	if (brands.length > 1) {
		brands.sort((a, b) => (b < a ? 1 : -1))
	}

	const handleBrandClick = (brand) => {
		navigate(`/shop?${import.meta.env.VITE_SHOP_DEFAULT_QUERY}&brand=${brand}`)
	}

	return (
		<section className={s.section} ref={rowRef}>
			<h6 className={s.header}>{name}</h6>
			<ul className={s.list}>
				{brands.map((brand) => (
					<li className={s.item} key={brand}>
						<div className={s.link} onClick={() => handleBrandClick(brandToSlug(brand))}>
							{brand}
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}
