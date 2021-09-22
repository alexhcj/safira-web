import { Route, Switch } from 'react-router-dom'
import { Home, Shop, Blog, Cart, Checkout, Product, Docs } from './pages'
import { Header, Footer, Copyright } from './components'
import { ScrollBtn, DocsBtn } from './components/UI'

function App() {
	return (
		<div className='app'>
			<Header />
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/shop'>
					<Shop />
				</Route>
				<Route path='/blog'>
					<Blog />
				</Route>
				<Route path='/cart'>
					<Cart />
				</Route>
				<Route path='/checkout'>
					<Checkout />
				</Route>
				<Route path='/product/:id'>
					<Product />
				</Route>
				<Route path='/docs'>
					<Docs />
				</Route>
			</Switch>
			<Footer />
			<Copyright />
			<ScrollBtn />
			<DocsBtn />
		</div>
	)
}

export default App
