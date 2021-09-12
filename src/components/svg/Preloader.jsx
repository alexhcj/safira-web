export const Preloader = ({ width, height, fill }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			width={width}
			height={height}
			style={{ background: 'transparent', shapeRendering: 'auto' }}
			viewBox='0 0 100 100'
			preserveAspectRatio='xMidYMid'
		>
			<circle
				cx='50'
				cy='50'
				fill='none'
				stroke={fill}
				strokeWidth='10'
				r='35'
				strokeDasharray='164.93361431346415 56.97787143782138'
			>
				<animateTransform
					attributeName='transform'
					type='rotate'
					repeatCount='indefinite'
					dur='1.3513513513513513s'
					values='0 50 50;360 50 50'
					keyTimes='0;1'
				/>
			</circle>
		</svg>
	)
}
