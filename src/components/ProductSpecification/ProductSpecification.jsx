import { useState } from 'react/cjs/react.development'
import { FullsizeDivider } from '../UI'
import s from './productspecification.module.scss'
import defaultProfile from '../../assets/images/defaultProfile.png'

export const ProductSpecification = ({product}) => {
    const [active, setActive] = useState('spec')

    return (
        <section className={s.section}>
            <div className={s.wrapper}>
                <button className={s.section_name}
                    onClick={()=>setActive('spec')}
                >Specification</button>
                <button className={s.section_name}
                    onClick={()=>setActive('reviews')}
                >Reviews ({product.reviews.length})</button>
            </div>
            <FullsizeDivider marginTop={15} />
            {active==='spec' &&
                <table className={s.table}>
                    <tbody>
                        <tr>
                            <td className={s.first_col}>Category</td>
                            <td>{product.category}</td>
                        </tr>
                        <tr>
                            <td className={s.first_col}>Rating</td>
                            <td>{product.rating}</td>
                        </tr>
                        <tr>
                            <td className={s.first_col}>Company</td>
                            <td>{product.company}</td>
                        </tr>
                        <tr>
                            <td className={s.first_col}>Local/Import</td>
                            <td>{product["local/import"]}</td>
                        </tr>
                        <tr>
                            <td className={s.first_col}>Tags</td>
                            <td>{product.productTags.join(', ')}</td>
                        </tr>
                        <tr>
                            <td className={s.first_col}>Shelf Life</td>
                            <td>{product.shelfLife}</td>
                        </tr>
                        <tr>
                            <td className={s.first_col}>Quantity</td>
                            <td>{product.quantity}</td>
                        </tr>
                    </tbody>
                </table>}
            {active==='reviews' &&
                <div className={s.reviews_container}>
                    {product.reviews.map(comment=>{
                        let {id, author, text, date, rate} = comment
                        return (
                            <div className={s.item} key={id}>
                                <img className={s.img}
                                    src={defaultProfile}
                                    alt="comment"
                                />
                                <div className={s.field}>
                                    <div className={s.info_container}>
                                        <p className={s.author}>{author}<span> - {date}</span></p>
                                        <p>{rate}</p>
                                    </div>
                                    <p className={s.text}>{text}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>}
        </section>
    )
}
