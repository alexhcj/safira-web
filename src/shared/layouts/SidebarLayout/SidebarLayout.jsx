import s from './sidebar-layout.module.scss'

export const SidebarLayout = (props) => {
	return (
		<div className={s.layout}>
			<main className={s.main}>{props.main}</main>
			<aside className={s.aside}>{props.aside}</aside>
		</div>
	)
}
