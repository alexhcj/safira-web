import { BestSellers } from "./BestSellers"
import { DealWeek } from "./DealWeek"
import { NewProducts } from "./NewProducts"
import s from "./offers.module.css"
import { SpecialOffer } from "./SpecialOffer"

export const Offers = () => {
    return (
        <div className={s.section}>
            <div className="container">
                <DealWeek />
                <SpecialOffer />
                <BestSellers />
                <NewProducts />
            </div>
        </div>
    )
}