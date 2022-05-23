const KEY_USER = 'user'
const KEY_CART = 'cart'
const KEY_WISHLIST = 'wishlist'

const setJsonItem = (key, item) => {
	if (item === null || item === undefined) {
		localStorage.removeItem(key)
	} else {
		localStorage.setItem(key, JSON.stringify(item))
	}
}

const getJsonItem = (key) => {
	const json = localStorage.getItem(key)
	return json ? JSON.parse(json) : json
}

export const getUserStorage = () => getJsonItem(KEY_USER)
export const setUserStorage = (user) => setJsonItem(KEY_USER, user)

export const getCartStorage = () => getJsonItem(KEY_CART)
export const getWishlistStorage = () => getJsonItem(KEY_WISHLIST)
