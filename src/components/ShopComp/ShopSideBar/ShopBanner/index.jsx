import { useEffect, useState } from 'react'
import { shopBannerAPI } from '../../../api'

export const ShopBanner = () => {
    const [shopBanner, getShopBanner] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await shopBannerAPI.getShopBanner()
            } catch(e) {
                console.log(e)
            }
        }

    })

    return (
        <img src="" alt="" />
    )
}