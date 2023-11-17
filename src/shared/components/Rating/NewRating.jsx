import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import cn from 'classnames'
import { generateID } from '../../../utils/IdGenerator'
import { ReactComponent as Star } from '../../../assets/svg/star.svg'
import { ReactComponent as StarFilled } from '../../../assets/svg/star-filled.svg'
import s from './rating.module.scss'

export const NewRating = forwardRef(({ precision = 0.5, totalStars = 5, onClick }, ref) => {
	const [activeStar, setActiveStar] = useState(-1)
	const [hoverActiveStar, setHoverActiveStar] = useState(-1)
	const [isHovered, setIsHovered] = useState(false)
	const ratingContainerRef = useRef(null)

	useImperativeHandle(ref, () => ({
		resetRating() {
			setActiveStar(-1)
		},
	}))

	const calculateRating = (e) => {
		const { width, left } = ratingContainerRef.current.getBoundingClientRect()
		let percent = (e.clientX - left) / width
		const numberInStars = percent * totalStars
		const nearestNumber = Math.round((numberInStars + precision / 2) / precision) * precision

		return Number(nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0))
	}

	const handleClick = (e) => {
		setIsHovered(false)
		setActiveStar(calculateRating(e))
		onClick(hoverActiveStar)
	}

	const handleMouseMove = (e) => {
		setIsHovered(true)
		setHoverActiveStar(calculateRating(e))
	}

	const handleMouseLeave = () => {
		setHoverActiveStar(-1)
		setIsHovered(false)
	}

	return (
		<div
			className={cn(s.rating, s.new)}
			role='presentation'
			onClick={handleClick}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			ref={ratingContainerRef}
			key={generateID()}
		>
			{[...new Array(totalStars)].map((arr, index) => {
				const activeState = isHovered ? hoverActiveStar : activeStar

				const showEmptyIcon = activeState === -1 || activeState < index + 1

				const isActiveRating = activeState !== 1
				const isRatingWithPrecision = activeState % 1 !== 0
				const isRatingEqualToIndex = Math.ceil(activeState) === index + 1
				const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex

				return (
					<div className={s.box} key={index}>
						<div className={s.item} style={{ width: showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%' }}>
							<StarFilled />
						</div>
						<div className={s.item} style={{ color: showEmptyIcon ? 'gray' : 'inherit' }}>
							{showEmptyIcon ? <Star /> : <StarFilled />}
						</div>
					</div>
				)
			})}
		</div>
	)
})

NewRating.displayName = 'NewRating'
