import { AuthorSocials } from '@shared/components/UI/AuthorSocials/AuthorSocials'

import s from './blank-page-info.module.scss'

export const BlankPageInfo = () => {
	return (
		<section className={s.section}>
			<div className='container'>
				<div className={s.page}>
					<h1 className={s.title}>Welcome to my digital space</h1>
					<p className={s.text}>You&apos;ve discovered something special</p>
					<h2 className={s.hello}>
						Hi! I&apos;m <span>Alex</span>, a <span>Full-Stack Developer</span>.
					</h2>
					<p className={s.description}>
						I build scalable web applications from concept to deployment. 5+ years crafting e-commerce platforms, CMS
						solutions, and complex business systems. I don&apos;t just code—I solve problems.
					</p>
					<p className={s.contact}>
						Ready to see what I can build? <span>Let&apos;s connect 👇</span>
					</p>
					<AuthorSocials className={s.socials} />
				</div>
			</div>
		</section>
	)
}
