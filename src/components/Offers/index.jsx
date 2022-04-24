import { BestSellers } from "./BestSellers"
import { DealsWeek } from "./DealsWeek/DealsWeek"
import { NewProducts } from "./NewProducts"
import { SpecialOffer } from "./SpecialOffer"
import s from "./offers.module.css"

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
