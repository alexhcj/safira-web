import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useRecentSearchContext } from '@context/RecentSearchContext'

import { PostCard } from '@components/PostCard/PostCard'
import { ProductCard } from '@components/ProductCard/ProductCard'

import CloseSVG from '@assets/svg/close.svg?react'
import RecentSVG from '@assets/svg/recent.svg?react'

import s from './search-popover.module.scss'

export const SearchPopover = ({
	isOpen,
	handleSearchClick,
	setIsPopoverToggled,
	randomProduct,
	search,
	isSearched,
}) => {
	const navigate = useNavigate()
	const { recentSearch, addCurrentSearch, removeFromSearch, state } = useRecentSearchContext()

	const handleRecentSearch = (e) => {
		const recentItem = e.target.closest('svg') ?? e.target.closest('h3')

		// TODO: add input focus => could use 'enter' to search
		if (recentItem && recentItem.id === 'recent-name') {
			e.stopPropagation()
			addCurrentSearch({ search: recentItem.dataset.search, lastSearch: recentItem.dataset.search })
		}

		if (recentItem && recentItem.id === 'recent-remove') {
			e.stopPropagation()
			removeFromSearch(recentItem.dataset.search)
		}
	}

	const handleRelatedMoreClick = () => {
		const query = `${import.meta.env.VITE_SHOP_DEFAULT_QUERY}&slug=${state.lastSearch}`
		navigate(`/shop?${new URLSearchParams(query)}`)
		setIsPopoverToggled(false)
	}

	// TODO: fill empty gap when searched yet. Show some text "Type for searching products and posts"
	return (
		<div className={cn(s.popover, { [s.active]: isOpen })}>
			<ul className={s.list} onClick={handleSearchClick} data-link='link'>
				{Object.keys(search).length === 0 && Object.keys(randomProduct).length > 0 && !isSearched && (
					<ProductCard product={randomProduct} imgSize='xs' size='row-xs' data-link='link' />
				)}
				{Object.keys(search).length > 0 && search.search.length === 0 && isSearched && (
					<div>Nothing was found. Try searching other keywords</div>
				)}
				{Object.keys(search).length > 0 &&
					search.search.length > 0 &&
					search.search.map((item) =>
						item.type === 'product' ? (
							<li key={item.slug} onClick={handleSearchClick} data-link='link'>
								<ProductCard product={item} imgSize='xs' size='row-xs' />
							</li>
						) : (
							<li key={item.slug} onClick={handleSearchClick} data-link='link'>
								<PostCard post={item} imgSize='xxs' size='row-xs' />
							</li>
						),
					)}
			</ul>
			{search.relatedCount >= 1 && (
				<button className={s.btn_related} onClick={handleRelatedMoreClick} type='button'>
					And {search.relatedCount} products more
				</button>
			)}
			{recentSearch.length !== 0 && (
				<>
					<div className={s.divider}></div>
					<div className={s.recent}>
						<h5 className={s.title}>Recent</h5>
						<ul className={s.recent_list} onClick={handleRecentSearch}>
							{recentSearch.map((search, index) => (
								<li className={s.recent_item} key={`${index}${search}`}>
									<RecentSVG className={s.icon} />
									<h3 className={s.recent_name} id='recent-name' data-search={search}>
										{search}
									</h3>
									<CloseSVG className={cn(s.icon, s.close)} id='recent-remove' data-search={search} />
								</li>
							))}
						</ul>
					</div>
				</>
			)}
		</div>
	)
}
