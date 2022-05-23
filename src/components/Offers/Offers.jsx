import { BestSellers } from "./BestSellers/BestSellers"
import { NewProducts } from "./NewProducts/NewProducts"
import { SpecialOffer } from "./SpecialOffer/SpecialOffer"
import {DealsWeek} from "./DealsWeek/DealsWeek";
import s from "./offers.module.scss"

export const Offers = () => {
    return (
        <div className={s.section}>
            <div className="container">
                <div className={s.wrapper}>
                    <div className={s.left}>
                        <DealsWeek />
                        <SpecialOffer />
                    </div>
                    <div className={s.right}>
                        <BestSellers />
                        <NewProducts />
                    </div>
                </div>
            </div>
        </div>
    )
}
