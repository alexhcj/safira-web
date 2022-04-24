import { Route, Routes } from 'react-router-dom'
import { Home, Shop, Blog, Cart, Checkout, Product, Docs } from './pages'
import { Header, Footer, Copyright } from './components'
import { ScrollBtn, DocsBtn } from './components/UI'

function App() {
	return (
		<div className='app'>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/blog'  element={<Blog />} />
				<Route path='/blog/:id' element={<Blog />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/checkout' element={<Checkout />} />
				<Route path='/products/:slug' element={<Product />} />
				<Route path='/docs' element={<Docs />} />
			</Routes>
			<Footer />
			<Copyright />
			<ScrollBtn />
			<DocsBtn />
		</div>
	)
}

export default App
