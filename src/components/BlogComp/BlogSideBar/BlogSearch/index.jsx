import { useEffect, useState } from 'react'
import s from './BlogSearch.module.css'
import {postsAPI} from "../../../../api/posts";
import { FullsizeDivider } from '../../../UI'

export const BlogSearch = ({searchHanlder}) => {
    const [input, setInput] = useState('')

    useEffect(()=>{
        const params = {
            limit: 5,
            title: input
        }

        const fetchData = async () => {
            if(input.length>2){
                try {
                    const data = await postsAPI.getAll(params)
                    console.log(data.data)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        const timer = setTimeout(() => {
            fetchData()
        }, 200);
        return () => clearTimeout(timer)

    },[input])

    return (
        <div>
            <p className={s.heading}>search</p>
            <FullsizeDivider marginTop={10} />
            <input className={s.search}
                type="text"
                placeholder="Search..."
                onChange={(e)=>setInput(e.target.value)}
                value={input}
            />
            <button className={s.btn}
                onClick={()=>searchHanlder(input)}
            >search</button>
        </div>
    )
}
