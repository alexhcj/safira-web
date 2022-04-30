import s from './pagination.module.css'

export const Pagination = ({
	page,
	pages,
	maxPageNumberLimit,
	minPageNumberLimit,
	currentPagNums,
	selectPage,
	selectNextPage,
	selectPrevPage,
	selectFirstPage,
	selectLastPage,
}) => {
	let pageIncrementBtn = null
	if (pages.length > maxPageNumberLimit) {
		pageIncrementBtn = (
			<button className={s.page} onClick={selectLastPage}>
				&gt;&gt;
			</button>
		)
	}

	let pageDecrementBtn = null
	if (page >= 4) {
		pageDecrementBtn = (
			<button className={s.page} onClick={selectFirstPage}>
				&lt;&lt;
			</button>
		)
	}

	return (
		<div className={s.pagination}>
			{pageDecrementBtn}
			<button className={`${s.page} ${page === 1 ? `${s.disabled}` : ''}`} onClick={selectPrevPage}>
				prev
			</button>
			<div role="presentation" className={s.list} onClick={(e) => selectPage(e)}>
				{currentPagNums.map((num) => (
					<button className={`${s.page} ${page === num ? `${s.active}` : ''}`} id={num} key={num}>
						{num}
					</button>
				))}
			</div>
			<button
				className={`${s.page} ${page === pages[pages.length - 1] ? `${s.disabled}` : ''}`}
				onClick={selectNextPage}
			>
				next
			</button>
			{pageIncrementBtn}
		</div>
	)
}

// BUG: when click on lastPageSelector => 2, 3, 4 => click on prev page (current 4) => only first page [1] appears
