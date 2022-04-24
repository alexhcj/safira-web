import { Button } from '../../UI/Buttons/Button/Button'
import s from './PostsList.module.css'

export const PostsList = ({posts, setLoad, load, isLoading, isLoadMore}) => {
    let display = 'none'
    if(posts.length===0 && isLoading!==true){
        display = 'block'
    }
    return (
        <section className={s.section}>
            {posts.map((post)=>{
                    let {id, title, img, date, text} = post
                    const url = {
                        pathname: `/blog/${id}`,
                    }
                    text = text.slice(0, 300)
                    return (
                        <div className={s.wrapper} key={id}>
                            <img className={s.img} src={img} alt={title} />
                            <p className={s.title}>{title}</p>
                            <p className={s.date}>{date}</p>
                            <p className={s.text}>{text}</p>
                            <Button to={url}/>
                        </div>
                    )
            })}
            {isLoadMore && isLoading!==true && <div className={s.btn_wrapper}><button className={s.btn}
                onClick={()=>setLoad(load+1)}
            >Load More</button></div>}
            <p className={s.nothing} style={{display: display}}>Nothing has been found...</p>
        </section>
    )
}
