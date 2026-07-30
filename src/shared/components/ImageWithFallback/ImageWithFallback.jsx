import { useEffect, useState } from 'react'

import { ImageSkeleton } from '@shared/components/UI/Skeletons/ImageSkeleton/ImageSkeleton'

import { getSizedImgUrl } from '@utils/ui'

export function ImageWithFallback({
	src,
	fallback,
	alt,
	imgSize,
	onlySrc,
	skeleton = <ImageSkeleton />,
	forceDefault = false,
	className,
}) {
	const defaultImgSrc = `${import.meta.env.VITE_WEB_PUBLIC_URL}/assets/images/default`

	const resolveSrc = () => (forceDefault ? defaultImgSrc : onlySrc ? src : getSizedImgUrl(src, imgSize))

	const [imgSrc, setImgSrc] = useState(resolveSrc())
	const [isLoaded, setIsLoaded] = useState(forceDefault)

	useEffect(() => {
		setIsLoaded(forceDefault)
		setImgSrc(resolveSrc())
	}, [src, imgSize, onlySrc, forceDefault])

	const onError = () => setImgSrc(getSizedImgUrl(defaultImgSrc, imgSize))

	return (
		<>
			{!isLoaded && skeleton}
			<img
				className={className}
				src={imgSrc || fallback}
				onError={onError}
				onLoad={() => setIsLoaded(true)}
				alt={alt}
				style={{
					display: isLoaded ? 'block' : 'none',
				}}
			/>
		</>
	)
}
