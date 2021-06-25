import { BestSellers } from "./BestSellers"
import { DealWeek } from "./DealWeek"
import { NewProducts } from "./NewProducts"
import s from "./offers.module.css"
import { SpecialOffer } from "./SpecialOffer"

export const Offers = () => {
    return (
        <div className={s.section}>
            <div className="container">
                <div className={s.wrapper}>
                    <div>
                        <DealWeek />
                        <SpecialOffer />
                    </div>
                    <div>
                        <BestSellers />
                        <NewProducts />
                    </div>
                </div>
            </div>
        </div>
    )
}