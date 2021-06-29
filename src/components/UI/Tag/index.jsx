import s from './tag.module.css'

export const Tag = ({text = 'sale'}) => {
    return (
        <span className={s.tag}>{text}</span>
    )
}