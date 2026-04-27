import { Link, NavLink } from 'react-router-dom'

import { beyondFirstStage, firstStage } from '@components/RoadMap/road-map-data'

import { FeatureStatus } from '@shared/components/UI/FeatureStatus/FeatureStatus'
import { FeatureTag } from '@shared/components/UI/FeatureTag/FeatureTag'

import s from './road-map.module.scss'

export const RoadMap = () => {
	return (
		<div className='container'>
			<div className={s.box}>
				<div className={s.header}>
					<div className={s.text}>
						<h3 className={s.title}>Roadmap</h3>
						<p>
							Here is complete roadmap structured by rational features delivery from drafts to MVP and LTS versions.
						</p>
					</div>
					<span className={s.version}>
						Current stable{' '}
						<Link className={s.link} target='_blank' to='https://safira-store.online'>
							v{import.meta.env.VITE_APP_VERSION}
						</Link>
					</span>
				</div>
				<div className={s.stages}>
					<div className={s.stage}>
						<div className={s.stage_header}>
							<h4 className={s.stage_title}>Safira v1.0.0 — Coming Summer 2026</h4>
							<span className={s.stage_count}>{firstStage.length}</span>
						</div>
						<ul className={s.stage_list}>
							{firstStage.map(({ title, text, status, tag }, index) => (
								<li className={s.stage_item} key={index}>
									<div className={s.stage_item_header}>
										<div className={s.stage_item_meta}>
											<h6 className={s.stage_item_title}>{title}</h6>
											{tag && <FeatureTag tag={tag} />}
										</div>
										{status && <FeatureStatus status={status} />}
									</div>
									<p className={s.stage_item_text}>{text}</p>
								</li>
							))}
						</ul>
					</div>
					<div className={s.separator}></div>
					<div className={s.stage}>
						<div className={s.stage_header}>
							<h4 className={s.stage_title}>Beyond Safira v1.0.0</h4>
							<span className={s.stage_count}>{beyondFirstStage.length}</span>
						</div>
						<ul className={s.stage_list}>
							{beyondFirstStage.map(({ title, text, status, tag }, index) => (
								<li className={s.stage_item} key={index}>
									<div className={s.stage_item_header}>
										<div className={s.stage_item_meta}>
											<h6 className={s.stage_item_title}>{title}</h6>
											{tag && <FeatureTag tag={tag} />}
										</div>
										{status && <span>{status}</span>}
									</div>
									<p className={s.stage_item_text}>{text}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className={s.footer}>
					<span>
						Inspired by <a href='https://zed.dev/roadmap'>Zed</a>
					</span>
				</div>
			</div>
		</div>
	)
}
