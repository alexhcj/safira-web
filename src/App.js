import { Route, Switch } from 'react-router-dom'
import { Home, Shop, Blog, Cart, Checkout, Product } from './pages/Home'
import { Header } from './components/Header'

function App() {
	return (
		<div className='app'>
			<Header />
			<Switch>
				<Route path='/'>
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
				<Route path='/product'>
					<Product />
				</Route>
			</Switch>
		</div>
	)
}

export default App
