# Safira - Online E-commerce Food Store

---

## Demo

- [Production App](https://safira-store.shop)
- [Development App](https://safira-shop-web-dev.onrender.com/) (see work in progress)
- [Figma Design](https://www.figma.com/design/i0PEldds46MbUNR5avusy3/safira?node-id=1494-199&t=U6ofgb37pEb4sqSM-1)

## Description

**Safira** - fullstack training project based on [React](https://react.dev/)
ecosystem ([hooks](https://react.dev/reference/react), [context](https://react.dev/reference/react/useContext), etc.)
and [NestJS](https://nestjs.com/) in conjunction with [MongoDB](https://www.mongodb.com/).

**Main idea** is to develop frontend with minimum dependencies based writer on React.

**MVP** version would consist of frontend part with most used features of necessary real life e-commerce solutions and
backend with api, services and database.

**Final** project form would have:

- Web (maybe with [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps))
- Admin panel
- [CMS](https://developer.mozilla.org/en-US/docs/Glossary/CMS)
- Mobile
- Backend

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
- [ ] Forget password
- [x] Change email
- [x] Subscribe
- [ ] Unsubscribe
  - [ ] From email
  - [ ] From profile
- [x] Redis queues & schedulers

### Navigation

- [x] Categories & Brands
- [x] Default page routing
- [x] Protected page routing
- [x] Multi layer categories
- [x] Blank page (fake)
- [x] 404 page

### Support pages

- [ ] About us
- [ ] Delivery information
- [ ] Privacy Policy
- [ ] Terms & Conditions
- [ ] Contact us
- [ ] Site map
- [ ] Specials

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

### Discount System & Payment

- [ ] Promotions
- [ ] Promo codes
- [ ] Checkout
- [ ] Coupons
- [ ] Gift cards

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
