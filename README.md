# Safira - Online E-commerce Food Store

---

## Demo

- [Production App](https://safira-store.online)
- [Development App](https://safira-shop-web-dev.onrender.com/) (see work in progress)
- [Figma Design](https://www.figma.com/design/i0PEldds46MbUNR5avusy3/safira?node-id=1494-199&t=U6ofgb37pEb4sqSM-1)

## Description

**Safira** - fullstack training project based on [React](https://react.dev/)
ecosystem ([hooks](https://react.dev/reference/react), [context](https://react.dev/reference/react/useContext), etc.)
and [NestJS](https://nestjs.com/) in conjunction with [MongoDB](https://www.mongodb.com/).

**Main idea** is to develop frontend with minimum dependencies based writer on React.

**MVP** version would consist of frontend part with most used features of necessary real life e-commerce solutions and
backend with api, services, and database.

In the **LTS** 1.0.0 version would be added some more features like: info pages, responsive design, improved product and
auth management logic. The full list you can view at [Roadmap](https://safira-shop-web-dev.onrender.com/road-map) and
also future beyond LTS.

The complete application ecosystem will include web platform (possibly with PWA), admin panel, content management
system, mobile application, and robust backend infrastructure.

## Roadmap

View [Roadmap](https://safira-shop-web-dev.onrender.com/road-map) for nearest feature releases.

## Features

### Auth

- [x] Register
- [x] Login
- [x] User actions (calls for login | register...)

- ### API

- [x] Global error handling

### Verifications & Mailing

- [x] Verify email with code
- [x] Change password
- [x] Reset password
- [x] Change email
- [x] Subscribe
	- [x] From profile
- [x] Unsubscribe
	- [x] From email
	- [x] From profile
- [x] Redis queues & schedulers

### Navigation

- [x] Categories & Brands
- [x] Default page routing
- [x] Protected page routing
- [x] Multi layer categories
- [x] Blank page (fake)
- [x] 404 page

### Support pages

- [x] About us
- [ ] Delivery information
- [x] Privacy Policy
- [x] Terms & Conditions
- [x] Contact us
- [x] Site map
- [ ] Specials
- [x] Roadmap

### Common

- [x] Modals
- [x] Scroll to top
- [x] Popovers
- [x] Forms validation & error handling
- [x] Password strength

### E-commerce

- [x] Wishlist
- [x] Cart
- [x] Global search (products & posts)
- [x] Separate search by collections (products || posts)
- [x] Reviews (products)
- [x] Comments with replies (posts)
- [x] Breadcrumbs
- [x] Unauthorized buy
- [x] CompareList products

- **Products**
- [x] Pagination
- [x] Sorting
- [x] Filtering (name, price range, brand, tags)
- [x] Details (by slug)
- [x] Quick view (modal)
- [x] Rating
- [x] Related products
- [x] Scheduled sales & promos (CRON jobs)


- **Posts**
- [x] Details (by slug)
- [x] Infinite scroll (posts)
- [ ] Related posts

### User

- [x] Profile (private)
- [ ] Profile (public)
- [ ] Order history
- [x] Avatars (stored by server)
- [ ] Returns

### Discount System & Payment

- [ ] Promotions
- [ ] Promo codes
- [x] Checkout
- [ ] Coupons
- [ ] Gift cards
- [ ] Affiliate

### Marketing

- [x] Sliders and offers

### International

- [ ] Multi language
- [ ] Multi currency

## Features Admin & CMS

🔜 In developing

## Styles

Used scss modules in combination with [classnames](https://www.npmjs.com/package/classnames) package

- **Response supported screens**
- [x] 1440+
- [ ] 1201 - 1440
- [ ] 1025 - 1200
- [ ] 769 - 1024
- [ ] 481 - 768
- [ ] 320 - 480

## Project

- [x] Vite integration
	- [x] Aliases
- [x] Eslint
	- [x] Imports sorting

## Additional Packages

- [axios](https://www.npmjs.com/package/axios)
- [classnames](https://www.npmjs.com/package/classnames)
- [react-alice-carousel](https://www.npmjs.com/package/react-alice-carousel)
- [react-scroll](https://www.npmjs.com/package/react-scroll)
- [react-slider](https://www.npmjs.com/package/react-slider)
- [react-transition-group](https://www.npmjs.com/package/react-transition-group)
- [sass](https://www.npmjs.com/package/sass)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [eslint](https://www.npmjs.com/package/eslint)
- [prettier](https://www.npmjs.com/package/prettier)
