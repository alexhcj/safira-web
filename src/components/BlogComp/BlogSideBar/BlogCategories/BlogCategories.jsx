import { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { blogCategoriesAPI } from '../../../../api'
import { FullsizeDivider } from '../../../UI'
import s from './blog-categories.module.scss'

export const BlogCategories = ({categoryHandler}) => {
    const [categories, setCategories] = useState([])
    const [active, setActive] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await blogCategoriesAPI.getCategories()
                setCategories(data)
            } catch(e) {
                console.log(e)
            }
        }
        fetchData()
    },[])



    const categoryChangeHandler = (val) => {
        categoryHandler(val)
        setActive(val)
    }

    return (
        <div className={s.section}>
            <p className={s.heading}>Categories</p>
            <FullsizeDivider marginTop={10} />
            <ul>
                {categories.map(category=>{
                    let itemClassName
                    active===category.category ? itemClassName = s.chosen : itemClassName = s.category
                    return (
                        <li id={category.category}
                            className={itemClassName}
                            key={category.id}
                            onClick={(e) => {
                                categoryChangeHandler(category.category, e)
                            }} >
                            {category.category}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
// .contains
