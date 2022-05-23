import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {postsAPI} from "../../../../api/posts";
import s from './related-posts.module.scss'

export const RelatedPosts = ({category}) => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const params = {
            limit: 3,
            category: category
        }
        const fetchData = async () => {
            try {
                const data = await postsAPI.getAll(params)
                setPosts(data.data)
            } catch(e) {
                console.log(e)
            }
        }
        fetchData()
    },[category])
    return (
        <section className={s.section}>
            <p className={s.heading}>Related Posts</p>
            <ul className={s.container}>
                {posts.map(post => {
                    let {id, title, img, date} = post
                    const url = {
                        pathname: `/blog/${id}`,
                    }
                    return (
                        <NavLink className={s.item}
                            to={url}
                            key={id}
                        >
                            <img className={s.img}
                                src={img}
                                alt={title}
                            />
                            <p className={s.title}>{title}</p>
                            <p className={s.date}>{date}</p>
                        </NavLink>
                    )
                })}
            </ul>
        </section>
    )
}
