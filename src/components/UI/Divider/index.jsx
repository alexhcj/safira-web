import s from './divider.module.css'

export const Divider = () => {
    return (
        <div className={s.section}>
            <div className='container'>
                <span className={s.divider}></span>
            </div>
        </div>
    )
}