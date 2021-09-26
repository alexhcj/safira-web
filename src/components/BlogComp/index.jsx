import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import s from './BlogComp.module.css'
import { BlogSideBar } from './BlogSideBar'
import { PostsList } from './PostsList'
import { postsAPI } from '../../api'
import { Post } from './Post'

export const BlogComp = ()=> {
    const { id } = useParams()
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState([])
    const history = useHistory()
    const [isLoadMore, setLoadMore] = useState(true)
    const [load, setLoad] = useState(0)
    const [isLoading, setLoading] = useState(false)
    
    useEffect(()=>{
        if(history.location.pathname!=="/blog"){
            const fetchData = async () => {
                try {
                    const data = await postsAPI.getPost(id)
                    if(data.length===0){
                        return history.push('/blog')
                    }
                    setPost(data)
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData()
        }
    },[id, history])

    

    return (
        <section className={s.section}>
                {history.location.pathname!=="/blog" && 
                    <Post
                        post={post}
                    />}
                {history.location.pathname==="/blog" && 
                <PostsList
                    setLoad={setLoad} 
                    isLoadMore={isLoadMore} 
                    posts={posts} 
                    load={load} 
                    isLoading={isLoading}
                />}
                <BlogSideBar
                    setLoading={setLoading} 
                    setLoad={setLoad} 
                    setLoadMore={setLoadMore} 
                    setPosts={setPosts} 
                    load={load} 
                    posts={posts}
                /> 
        </section>
    )
}