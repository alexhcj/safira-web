import cn from 'classnames'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { PostsSkeleton } from '@shared/components/UI/Skeletons/PostsSkeleton/PostsSkeleton'

import s from './sidebar-layout.module.scss'

export const SidebarLayout = (props) => {
	return (
		<div className={cn(s.layout, props.type && s[props.type])}>
			<main className={s.main}>
				{props.isInitialLoading ? (
					<PostsSkeleton quantity={2} />
				) : (
					<>
						{props.main}
						{props.showDesktopTrailingPreloader && props.isLoadingMore && <Preloader />}
					</>
				)}
				{!props.isInitialLoading && props.loadButton}
			</main>
			<aside className={s.aside}>{props.aside}</aside>
		</div>
	)
}
