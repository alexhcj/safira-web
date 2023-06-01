import React, { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Preloader } from './shared/components/common/Preloader/Preloader'
import App from './App'
import './index.scss'

ReactDOM.render(
	<StrictMode>
		<Suspense fallback={<Preloader />}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Suspense>
	</StrictMode>,
	document.getElementById('root')
)

// import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
