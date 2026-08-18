import { Children, isValidElement, useCallback, useState } from 'react'

import cn from 'classnames'

import s from './tabs.module.scss'

export const Tabs = ({ children, className }) => {
	const tabs = Children.toArray(children).filter((child) => isValidElement(child) && child.type === Tab)

	const [activeTab, setActiveTab] = useState(tabs[0]?.props.id)

	const handleActiveTab = useCallback((id) => {
		setActiveTab(id)
	}, [])

	const tabButtons = tabs.map(({ props }) => (
		<button
			key={props.id}
			className={cn(s.tab, props.id === activeTab && s.active)}
			onClick={() => handleActiveTab(props.id)}
		>
			{props.text}
		</button>
	))

	const activeContent = tabs.find(({ props }) => props.id === activeTab)

	return (
		<>
			<div className={cn(s.tabs, className)}>{tabButtons}</div>

			<div>{activeContent}</div>
		</>
	)
}

export const Tab = ({ children }) => children
