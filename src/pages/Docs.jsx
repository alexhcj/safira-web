import { ImgSizes } from '@components/Docs/ImgSizes/ImgSizes'
import { MostLess } from '@components/Docs/MostLess/MostLess'

export const Docs = () => {
	const s = {
		section: {
			padding: '100px 0',
			letterSpacing: '-0.32px',
		},
		most: {
			color: '#40a944',
		},
		less: {
			color: '#ff7063',
		},
		h1: {
			display: 'inline-flex',
			marginBottom: '50px',
			paddingBottom: '2px',
			fontSize: '36px',
			fontWeight: '600',
			borderBottom: '1px solid #222',
		},
		h4: {
			fontSize: '28px',
			fontWeight: '500',
			letterSpacing: '-2px',
		},
		divider: {
			display: 'block',
			margin: '15px 0 35px 0',
			width: '100%',
			height: '1px',
			backgroundColor: '#ededed',
		},
	}

	return (
		<section style={s.section}>
			<div className='container'>
				<h1 style={s.h1}>Documentation</h1>
				<span style={s.divider}></span>
				<h4 style={s.h4}>
					<span style={s.most}>Most</span> & <span style={s.less}>Less</span>
				</h4>
				<span style={s.divider}></span>
				<MostLess />
				<span style={s.divider}></span>
				<h4 style={s.h4}>Images Sizes</h4>
				<span style={s.divider}></span>
				<ImgSizes />
			</div>
		</section>
	)
}
