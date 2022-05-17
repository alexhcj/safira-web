import { useEffect, useState } from 'react'
import {postsAPI} from "../../../../api/posts";
import { NavLink } from 'react-router-dom'
import  defaultProfile  from '../../../../assets/images/default-avatar.png'
import s from './recentcomments.module.css'

export const RecentComments = () => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        const params = {
            limit: 3
        }
        const fetchData = async () => {
            try {
                const data = await postsAPI.getComments(params)
                setComments(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])

    return (
        <div className={s.section}>
            <p className={s.heading}>Recent Comments</p>
            <ul className={s.comments}>
               {comments.map(comment => {
                   let {id, post, author, text} = comment
                   text = text.slice(0, 25)
                   return (
                        <NavLink className={s.comment}
                            key={id}
                            to={`/blog/${post}`}
                        >
                            <img className={s.img}
                                src={defaultProfile}
                                alt="profile"
                            />
                            <p className={s.body}>
                                <span><span className={s.primary}>{author}</span> says: </span>
                                {text}
                            </p>
                        </NavLink>
                   )
               })}
            </ul>
        </div>
    )
}
