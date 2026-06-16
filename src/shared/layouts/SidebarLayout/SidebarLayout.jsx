import { Preloader } from '@shared/components/common/Preloader/Preloader'

import s from './sidebar-layout.module.scss'

export const SidebarLayout = (props) => {
	return (
		<div className={s.layout}>
			<main className={s.main}>
				{props.main}
				{props.loadButton && !props.isLoading && props.loadButton}
				{props.isLoading && <Preloader />}
			</main>
			<aside className={s.aside}>{props.aside}</aside>
		</div>
	)
}
