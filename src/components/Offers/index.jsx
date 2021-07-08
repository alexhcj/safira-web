import { BestSellers } from "./BestSellers"
import { DealWeek } from "./DealWeek"
import { NewProducts } from "./NewProducts"
import { SpecialOffer } from "./SpecialOffer"
import s from "./offers.module.css"

export const Offers = () => {
    return (
        <div className={s.section}>
            <div className="container">
                <div className={s.wrapper}>
                    <div className={s.left}>
                        <DealWeek />
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