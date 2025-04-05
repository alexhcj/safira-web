import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Preloader } from './shared/components/common/Preloader/Preloader'
import App from './App'
import './index.scss'
import './alice-carousel-override.css'

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
	<StrictMode>
		<Suspense fallback={<Preloader />}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Suspense>
	</StrictMode>,
	document.getElementById('root'),
)
