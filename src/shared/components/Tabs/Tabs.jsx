import { useCallback, useState } from 'react';
import cn from 'classnames'
import s from './tabs.module.scss'

export const Tabs = ({ children, className }) => {
	const [activeTab, setActiveTab] = useState(children[0].props.id)

	const handleActiveTab = useCallback((id) => {
		setActiveTab(id)
	}, [])

	const tabs = children.map((child) => (
		<button
			className={cn(s.tab, child.props.id === activeTab && s.active)}
			onClick={(e) => {
				e.preventDefault()
				handleActiveTab(child.props.id)
			}}
			key={child.props.id}
		>
			{child.props.text}
		</button>
	))

	const tabContent = children.filter((child) => child.props.id === activeTab)

	return (
		<>
			<div className={cn(s.tabs, className)}>{tabs}</div>
			<div>{tabContent}</div>
		</>
	)
}

function Tab(props) {
	return <>{props.children}</>
}

export { Tab }
