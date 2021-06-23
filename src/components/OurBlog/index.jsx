import { useEffect, useState } from 'react'
import { postsAPI } from '../../api'
import s from "./ourBlog.module.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { NavLink } from 'react-router-dom'

export const OurBlog = () => {
  const [slides, setPosts] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await postsAPI.getPosts()
				setPosts(data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

  const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 3,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 3,
		},
	}

  return (
    <div className={s.section}>
      <div className="container">
        <div className={s.block}>
          <h3 className={s.above__heading}>Our recent articles about Organic</h3>
          <h2 className={s.heading}>Our Blog Posts</h2>
          
      </div>
        <Carousel responsive={responsive} infinite={true} swipeable={false} draggable={false}>
          {slides.map((slide) => {
				let { id, date, img, text, tags } = slide
				text = text.substr(0, 75)+'...'
				return (
        <div className={s.item} key={id}>
			<div className={s.content__wrapper}>
				<img className={s.img} src={img}/>
				<p className={s.date}>{date} | <span className={s.tags}>{tags[0] + ' / ' + tags[1]}</span></p>
				<p className={s.text}>{text}</p>
				<NavLink className={s.link} to='/blog'>
						Show more	<img className={s.arrow__img} src="http://localhost:5000/assets/images/blog-showMore/showmore.png" alt=""/>	
				</NavLink>
			</div>
        </div>
				)
			})}
          </Carousel>
      </div>
    </div>
  )
};
