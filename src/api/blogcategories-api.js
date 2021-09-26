import { instance } from ".";

export const blogCategoriesAPI = {
    getCategories() {
        return instance.get('blogCategories').then(res => res.data)
    }
}