import s from './FullsizeDivider.module.css'

export const FullsizeDivider = ({marginTop, marginBottom}) => {
    return (
        <div className={s.divider} style={{marginTop: marginTop, marginBottom: marginBottom}}></div>
    )
}