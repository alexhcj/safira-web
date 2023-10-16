import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as NotFoundSVG } from '../../assets/svg/not-found.svg'
import s from './no-match.module.scss'

export const NoMatch = () => {
	const location = useLocation()

	return (
		<section className={s.section}>
			<div className='container'>
				<div className={s.match}>
					<NotFoundSVG className={s.img} />
					<h1 className={s.title}>Oops! You seem to be lost.</h1>
					<p className={s.text}>
						No match for <code>{location.pathname}</code>
					</p>
					<div className={s.links}>
						<h5 className={s.links_title}>Here are some helpful links:</h5>
						<ul className={s.links_list}>
							<li>
								<Link className={s.link} to='/'>
									Home
								</Link>
							</li>
							<li>
								<Link className={s.link} to={`/shop?${process.env.REACT_APP_SHOP_DEFULT_QUERY}`}>
									Shop
								</Link>
							</li>
							<li>
								<Link className={s.link} to={`/blog?${process.env.REACT_APP_BLOG_DEFULT_QUERY}`}>
									Blog
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
