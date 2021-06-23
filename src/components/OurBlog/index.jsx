import { useEffect, useState } from 'react'
import { postsAPI } from '../../api'
import s from "./ourBlog.module.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
				const { id, title, date, img, text, tags } = slide
				console.log(slides)
				return (
          <div className={s.item} key={id}>
            <img src={img} alt=""/>
      </div>
				)
			})}
          </Carousel>
      </div>
    </div>
  )
};
