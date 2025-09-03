import { useState, createContext, useContext } from 'react'

const CommentThreadContext = createContext()

export const useCommentThread = () => {
	const context = useContext(CommentThreadContext)
	if (!context) {
		throw new Error('useCommentThread must be used within CommentThreadProvider')
	}
	return context
}

export const CommentThreadProvider = ({ children, comments }) => {
	// initialize with threads collapsed by default at depth 3+
	const getInitialCollapsedThreads = (comments, parentNestedLvl = '', depth = 0) => {
		const collapsed = new Set()

		comments.forEach((comment, index) => {
			const currentNestedLvl = parentNestedLvl === '' ? index.toString() : `${parentNestedLvl}.${index}`
			const childrenThreadId = `thread-${currentNestedLvl}`

			// auto-collapse threads at depth 3+ that have replies
			if (depth >= 3 && comment.comments && comment.comments.length > 0) {
				collapsed.add(childrenThreadId)
			}

			// recursively check nested comments
			if (comment.comments && comment.comments.length > 0) {
				const nestedCollapsed = getInitialCollapsedThreads(comment.comments, currentNestedLvl, depth + 1)
				nestedCollapsed.forEach((id) => collapsed.add(id))
			}
		})

		return collapsed
	}

	const [collapsedThreads, setCollapsedThreads] = useState(() =>
		comments ? getInitialCollapsedThreads(comments) : new Set(),
	)

	const toggleThread = (threadId) => {
		setCollapsedThreads((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(threadId)) {
				newSet.delete(threadId)
			} else {
				newSet.add(threadId)
			}
			return newSet
		})
	}

	const isThreadCollapsed = (threadId) => collapsedThreads.has(threadId)

	return (
		<CommentThreadContext.Provider value={{ toggleThread, isThreadCollapsed }}>
			{children}
		</CommentThreadContext.Provider>
	)
}
