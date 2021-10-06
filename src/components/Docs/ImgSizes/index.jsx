import { sizeTypes } from '../../../utils'
import { ImageWithFallback } from '../../../utils/components'
import s from './imgsizes.module.css'

export const ImgSizes = () => {
    return (
        <div className={s.sizes}>
            {sizeTypes.map((item, index) => {
                const { type, size } = item

                return (
                    <div className={s.item}>
                        <span className={s.type}>{type}</span>
                        <span className={s.size}>{size}</span>
                    </div>
                )
            })}
        </div>
    )
}