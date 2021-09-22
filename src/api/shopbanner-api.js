import { instance } from '.'

export const shopbannerAPI = {
    getShopBanner(){
        return instance.get('shopbanner').then((res) => res.data)
    },
}