import { useState } from 'react'

import cn from 'classnames'
import { animateScroll as scroll } from 'react-scroll'

import { useAuthContext } from '@context/AuthContext'
import { useCommentThread } from '@context/CommentThreadContext'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Button } from '@shared/components/UI/Buttons/Button/Button'

import { capitalize, convertISODate } from '@utils/index'

import { Reply } from '../../Reply/Reply'

import HorizontalMoreSVG from '@assets/svg/more-horizontal.svg?react'

import s from './comment.module.scss'

/**
 * Comment component that handles nested comments recursively
 *
 * @param {Object} comment - Comment data with user, text, createdAt, and nested comments
 * @param {string} type - Visual type ('short' for compact version)
 * @param {string} nestedLvl - Path representing comment position in hierarchy (e.g., "0", "0.1", "0.1.2")
 * @param {number} currentIndex - Current comment index at this level
 * @param {number} depth - Current nesting depth (0 = root level)
 */
export const Comment = ({
	comment: {
		createdAt,
		text,
		comments,
		user: { userId, firstName, avatarId },
	},
	type,
	nestedLvl = null,
	currentIndex = 0,
	depth = 0,
}) => {
	const { user } = useAuthContext()
	const { toggleThread, isThreadCollapsed } = useCommentThread()
	const [isReplyHidden, setIsReplyHidden] = useState(true)

	const currentNestedLvl = nestedLvl === null ? currentIndex.toString() : `${nestedLvl}.${currentIndex}`

	const childrenThreadId = `thread-${currentNestedLvl}`
	const areChildrenHidden = isThreadCollapsed(childrenThreadId)

	const avatarUrl = `${import.meta.env.VITE_API_URL}/files/avatar/${avatarId}`

	const shouldShowToggleButton = comments && comments.length > 0 && depth >= 3
	const shouldRenderChildren = comments && comments.length > 0 && !areChildrenHidden

	const calculatePaddingLeft = () => {
		const baseIndent = 50
		const levelIndent = 20
		const maxVisualDepth = 3

		const visualDepth = Math.min(depth, maxVisualDepth)
		return { paddingLeft: depth > 3 ? 0 : baseIndent + visualDepth * levelIndent }
	}

	const handleToggleThread = () => {
		toggleThread(childrenThreadId)
	}

	const handleScroll = () => {
		const element = document.getElementById('reply-user-actions')

		if (element) {
			const elementPosition = element.offsetTop

			scroll.scrollTo(elementPosition, {
				duration: 500,
				delay: 0,
			})
		}
	}

	const handleToggleReply = () => {
		setIsReplyHidden(!isReplyHidden)
	}

	return (
		<div className={s.wrapper} style={calculatePaddingLeft()}>
			<div className={cn(s.comment, type && s[`comment_${type}`])}>
				<ImageWithFallback
					onlySrc
					src={avatarUrl}
					imgSize='avatar'
					alt={avatarId ? `${firstName}'s avatar` : 'User default avatar'}
					className={s.img}
				/>
				<div className={s.box}>
					<div>
						{depth >= 4 && <span className={s.lvl}>L{depth}</span>}
						<h5 className={s.author}>{firstName || 'User'}</h5>
						<span className={s.date}>{capitalize(convertISODate(createdAt, 'full-time').toLowerCase())}</span>
						<p className={cn(s.text, { [s.short]: shouldShowToggleButton })}>{capitalize(text)}</p>

						{/* toggle button for children - only show if has children and at depth 3+ */}
						{shouldShowToggleButton && (
							<button className={s.button_thread} onClick={handleToggleThread}>
								{areChildrenHidden ? 'Show thread' : 'Hide thread'} ({comments.length}){' '}
								<HorizontalMoreSVG className={s.svg} width={16} height={16} />
							</button>
						)}
					</div>
					{user && userId !== user.id && (
						<Button className={s.btn} onClick={handleToggleReply}>
							Reply
						</Button>
					)}
					{!user && (
						<Button className={s.btn} onClick={handleScroll}>
							Reply
						</Button>
					)}
				</div>
			</div>

			{/* reply form - only show when user is authenticated and reply is toggled */}
			{!isReplyHidden && user && (
				<Reply
					nestedLvl={currentNestedLvl}
					action='update'
					type='short'
					onReplySuccess={() => setIsReplyHidden(true)} // hide form after successful reply
				/>
			)}

			{/* nested comments */}
			{shouldRenderChildren && (
				<div className={s.replies}>
					{comments.map((nestedComment, index) => (
						<Comment
							comment={nestedComment}
							key={nestedComment.id || index}
							nestedLvl={currentNestedLvl}
							currentIndex={index}
							depth={depth + 1}
							type='short'
						/>
					))}
				</div>
			)}
		</div>
	)
}
