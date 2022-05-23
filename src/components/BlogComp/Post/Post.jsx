import { RelatedPosts } from './RelatedPosts/RelatedPosts'
import { FullsizeDivider } from '../../UI'
import style from './post.module.scss'
import s from '../PostsList/post-list.module.scss'

export const Post = ({post}) => {
    window.scrollTo({top:0})


    return (
        <section className={s.section}>
        {post.map((post)=>{
                let {id, title, img, date, text, category} = post
                return (
                    <div className={s.wrapper} key={id}>
                        <p className={style.title}>{title}</p>
                        <p className={s.date}>Date: <span>{date}</span> / Category: <span>{category}</span></p>
                        <img className={s.img}
                            style={{marginTop: 28}}
                            src={img}
                            alt={title}
                        />
                        <p className={s.text}>{text}</p>
                        <FullsizeDivider marginTop={62} />
                        <RelatedPosts category={category} />
                        <FullsizeDivider marginTop={70} marginBottom={70} />
                    </div>
                )
        })}
    </section>
 )
}
