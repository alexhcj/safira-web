import cn from 'classnames'

import { capitalize, enumToStr } from '@/utils'

import { FEATURE_STATUS } from '@shared/types/feature-status-types'

import CheckSVG from '@assets/svg/check.svg?react'
import TimeSVG from '@assets/svg/time.svg?react'

import s from './feature-status.module.scss'

const types = {
	[FEATURE_STATUS.IN_PROGRESS]: <TimeSVG />,
	[FEATURE_STATUS.SHIPPED]: <CheckSVG />,
}

export const FeatureStatus = ({ status }) => {
	return (
		<div className={cn(s.status, s[status.toLowerCase()])}>
			{types[status]}
			<span>{capitalize(enumToStr(status).toLowerCase())}</span>
		</div>
	)
}
