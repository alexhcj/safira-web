import s from './BlogSideBar.module.css'
import { BlogSearch } from './BlogSearch'
import { useEffect, useState } from 'react'
import { postsAPI } from '../../../api'
import { RecentPosts } from './RecentPosts'
import { BlogCategories } from './BlogCategories'
import { useHistory } from 'react-router'
import { RecentComments } from './RecentComments'

export const BlogSideBar = ({setPosts, setLoadMore, setLoad, setLoading, posts, load}) => {
    const limit = 4
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(limit)



    useEffect(() => {
        const params = {
            title: title,
            category: category,
            sort: 'date',
            start: start,
            end: end
        }
        const fetchData = async () => {
            setLoading(true)
            history.push('/blog')
            try {
                const data = await postsAPI.getPosts(params)
                if(load===0){
                    setPosts(data.data)
                    if(data.total-1<=data.data.length){
                        setLoadMore(false)
                    } else {
                        setLoadMore(true)
                    }
                    setEnd(data.data.length+limit)
                    setStart(data.data.length)
                } else {
                    const response = [...posts, ...data.data]
                    if(data.total-1<=response.length){
                        setLoadMore(false)
                    }
                    setEnd(response.length+limit)
                    setPosts(response)
                    setStart(response.length)
                }
            } catch(e) {
                console.log(e)
            }
            setLoading(false)
        }
        fetchData()
    },[title, category, load, history, setLoadMore])
    function setDefault(){
        setLoad(0)
        setStart(0)
        setEnd(limit)
    }
    const searchHanlder = (val) => {
        setDefault()
        setTitle(val)
        setCategory('')
    }
    const categoryHandler = (val) => {
        setDefault()
        setCategory(val)
        setTitle('')
    }

    return (
        <div className={s.section} >
            <div className={s.wrapper}>
                <BlogSearch searchHanlder={searchHanlder} />
                <RecentComments />
                <RecentPosts />
                <BlogCategories categoryHandler={categoryHandler} />
            </div>
        </div>
    )
}