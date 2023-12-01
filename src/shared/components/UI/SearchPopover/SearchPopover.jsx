import React from 'react'
import cn from 'classnames'
import { useRecentSearchContext } from '../../../../context/RecentSearchContext'
import { ProductCard } from '../../../../components/ProductCard/ProductCard'
import { PostCard } from '../../../../components/PostCard/PostCard'
import { ReactComponent as RecentSVG } from '../../../../assets/svg/recent.svg'
import { ReactComponent as CloseSVG } from '../../../../assets/svg/close.svg'
import s from './search-popover.module.scss'

export const SearchPopover = ({ isOpen, handleSearchClick, randomProduct, items, recentSearch, isSearched }) => {
	const { addCurrentSearch, removeFromSearch } = useRecentSearchContext()

	// types: 'recent | 'remove'
	const handleRecentSearch = (e, item) => {
		e.stopPropagation()
		e.target.id === 'recent' ? addCurrentSearch(item.name) : removeFromSearch(item.slug)
	}

	return (
		<div className={cn(s.popover, { [s.active]: isOpen })}>
			<ul className={s.list} onClick={handleSearchClick} data-link='link'>
				{items.length === 0 && Object.keys(randomProduct).length !== 0 && !isSearched && (
					<ProductCard product={randomProduct} imgSize='xs' size='row-xs' data-link='link' />
				)}
				{items.length === 0 && isSearched && <div>Nothing was found. Try searching other keywords</div>}
				{items.length !== 0 &&
					items.map((item) =>
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
			{recentSearch.length !== 0 && (
				<>
					<div className={s.divider}></div>
					<div className={s.recent}>
						<h5 className={s.title}>Recent</h5>
						<ul className={s.recent_list}>
							{recentSearch.map((item) => (
								<li className={s.recent_item} key={item.slug} onClick={(e) => handleRecentSearch(e, item)}>
									<RecentSVG className={s.icon} />
									<button className={s.recent_link} id='recent'>
										{item.name}
									</button>
									<CloseSVG className={s.icon} id='remove' />
								</li>
							))}
						</ul>
					</div>
				</>
			)}
		</div>
	)
}
