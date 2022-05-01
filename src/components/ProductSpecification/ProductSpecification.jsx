import { useState } from 'react/cjs/react.development'
import defaultProfile from '../../assets/images/defaultProfile.png'
import {Space} from "../../shared/components/UI/Spacing/Space";
import s from './productspecification.module.scss'

export const ProductSpecification = ({company, producing_country, quantity, shelf_life}) => {
    const [activeTab, setActiveTab] = useState('specifications')

		const handleActiveTab = (tab) => {
			setActiveTab(tab)
		}

    return (
        <div className={s.box}>
            <div className={s.tabs}>
                <button className={s.tab} onClick={() => handleActiveTab('specifications')}>Specification</button>
                <button className={s.tab} onClick={() => handleActiveTab('reviews')}>Reviews (5)</button>
            </div>
					<Space space={40} />
            {activeTab==='specifications' &&
                <table className={s.table}>
                    <tbody>
                        <tr>
                            <td className={s.spec}>Company</td>
                            <td className={s.spec_value}>{company}</td>
                        </tr>
                        <tr>
                            <td className={s.spec}>Producing country</td>
                            <td className={s.spec_value}>{producing_country}</td>
                        </tr>
                        <tr>
                            <td className={s.spec}>Shelf life</td>
                            <td className={s.spec_value}>{shelf_life} (days)</td>
                        </tr>
                        <tr>
                            <td className={s.spec}>Quantity</td>
                            <td className={s.spec_value}>{quantity}</td>
                        </tr>
                    </tbody>
                </table>}
            {activeTab==='reviews' &&
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
        </div>
    )
}
