import React, { useState } from 'react'
import { getSizedImgUrl } from '.'

export function ImageWithFallback({ src, fallback, className, alt, imgSize }) {
    const [imgSrc, setImgSrc] = useState(getSizedImgUrl(src, imgSize))
    const defaultImgSrc = `${process.env.REACT_APP_PUBLIC_URL}/images/default`

    const onError = () => setImgSrc(getSizedImgUrl(defaultImgSrc, imgSize))

    return <img className={className} src={imgSrc ? imgSrc : fallback} onError={onError} alt={alt} />
}
