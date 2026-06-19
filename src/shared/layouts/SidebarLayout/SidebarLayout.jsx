import cn from 'classnames'

import { Preloader } from '@shared/components/common/Preloader/Preloader'

import s from './sidebar-layout.module.scss'

export const SidebarLayout = (props) => {
	return (
		<div className={cn(s.layout, props.type && s[props.type])}>
			<main className={s.main}>
				{props.main}
				{props.loadButton && !props.isLoading && props.loadButton}
				{props.isLoading && <Preloader />}
			</main>
			<aside className={s.aside}>{props.aside}</aside>
		</div>
	)
}
