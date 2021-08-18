import { instance } from '.'

export const shopProductsAPI = {
    getShopProducts(sName){
        return instance.get(`products?name=${sName}`).then((res) => res.data)
    },
}
