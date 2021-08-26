import s from './pagination.module.css'

export const Pagination = ({
	pages,
	currentPagNums,
	currentPage,
	maxPageNumberLimit,
	minPageNumberLimit,
	currentPageHandler,
	nextPageClickHandler,
	prevPageClickHandler,
	firstPageClickHandler,
	lastPageClickHandler,
}) => {
    let pageIncrementBtn = null
	if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = (
            <button className={s.page} onClick={lastPageClickHandler}>
				&gt;&gt;
			</button>
		)
	}
    
    let pageDecrementBtn = null
    if (currentPage !== 1) {
        pageDecrementBtn = (
            <button className={s.page} onClick={firstPageClickHandler}>
                &lt;&lt;
            </button>
        )
    }

	return (
		<div className={s.pagination}>
			{pageDecrementBtn}
			<button
				className={`${s.page} ${currentPage === pages[0] ? `${s.disabled}` : ''}`}
				onClick={prevPageClickHandler}
			>
				prev
			</button>
			<div className={s.list} onClick={(e) => currentPageHandler(e)}>
				{currentPagNums.map((page) => (
					<button className={`${s.page} ${currentPage === page ? `${s.active}` : ''}`} id={page} key={page}>
						{page}
					</button>
				))}
			</div>
			<button
				className={`${s.page} ${currentPage === pages[pages.length - 1] ? `${s.disabled}` : ''}`}
				onClick={nextPageClickHandler}
			>
				next
			</button>
			{pageIncrementBtn}
		</div>
	)
}
