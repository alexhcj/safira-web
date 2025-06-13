import cn from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { useErrorContext } from '@context/ErrorContext'

import { Text } from '@shared/components/UI/Text/Text'

import s from './response-error.module.scss'

export const ResponseError = () => {
	const { responseErrors, dismissError } = useErrorContext()

	return (
		<div className={s.toast}>
			<TransitionGroup component={null}>
				{responseErrors.map((error) => (
					<CSSTransition
						key={error.id}
						nodeRef={error.nodeRef}
						timeout={300}
						classNames={{
							enter: s.animateEnter,
							enterActive: s.animateEnterActive,
							enterDone: s.animateEnterDone,
							exit: s.animateExit,
							exitActive: s.animateExitActive,
							exitDone: s.animateExitDone,
						}}
					>
						<div ref={error.nodeRef} className={cn(s.error, s[`severity_${error.severity}`], s[`type_${error.type}`])}>
							<div className={s.error_content}>
								<div className={s.error_header}>
									<Text as='h4' className={s.error_title}>
										{error.status ? `Error (${error.status})` : getErrorTypeLabel(error.type)}
									</Text>
									<button
										className={s.dismiss_button}
										onClick={() => dismissError(error.id)}
										aria-label='Dismiss error'
									>
										×
									</button>
								</div>

								<Text className={s.error_message}>{error.message}</Text>

								{error.path && <Text className={s.error_path}>Path: {error.path}</Text>}
							</div>
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	)
}

// Convert error types to human-readable labels
function getErrorTypeLabel(type) {
	const labels = {
		network: 'Network Error',
		auth: 'Authentication Error',
		validation: 'Validation Error',
		server: 'Server Error',
		client: 'Request Error',
		unknown: 'Unknown Error',
	}

	return labels[type] || 'Error'
}
