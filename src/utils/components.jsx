import React, { useState } from 'react'
import { getSizedImgUrl } from '.'

// replace src with default img
export function ImageWithFallback({ src, fallback, className, alt, imgSize }) {
    const [imgSrc, setImgSrc] = useState(getSizedImgUrl(src, imgSize))
    const defaultImgSrc = 'http://localhost:5000/assets/images/default'

    const onError = () => setImgSrc(getSizedImgUrl(defaultImgSrc, imgSize))

    return <img className={className} src={imgSrc ? imgSrc : fallback} onError={onError} alt={alt} />
}
