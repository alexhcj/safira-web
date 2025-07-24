import cn from 'classnames'

import { useSmoothScroll } from '@hooks/useScmoothScroll'
import { useScrollSpy } from '@hooks/useScrollSpy'

import { BlockNote } from '@shared/components/UI/BlockNote/BlockNote'

import s from './terms-conditions.module.scss'

// content section component
const Section = ({ order, id, title, children, className }) => (
	<section id={id} className={className}>
		<h2>
			{order}. {title}
		</h2>
		{children}
	</section>
)

// sidebar navigation link component
const NavLink = ({ order, href, children, isActive, onClick, subNavs, activeInnerId }) => (
	<div>
		<button className={cn(s.sidebar_button, isActive && s.active)} onClick={() => onClick(href.replace('#', ''))}>
			{children}
		</button>
		{subNavs && (
			<div className={s.subnav}>
				{subNavs.map((subNav, index) => (
					<button
						key={index}
						className={cn(s.sidebar_button, isActive && activeInnerId === subNav.id && s.active)}
						onClick={() => {
							const element = document.getElementById(subNav.id)

							if (element) {
								// calculate offset for navbar height plus extra spacing for h3 elements
								const navbarHeight = 75 // 50px navbar + 25px extra spacing
								const elementPosition = element.offsetTop - navbarHeight

								window.scrollTo({
									top: elementPosition,
									behavior: 'smooth',
								})
							}
						}}
					>
						{order}.{subNav.order}. {subNav.title}
					</button>
				))}
			</div>
		)}
	</div>
)

export const TermsConditions = () => {
	const navigationItems = [
		{
			order: 1,
			id: 'agreement-to-terms',
			title: 'Agreement to Terms',
		},
		{
			order: 2,
			id: 'use-license',
			title: 'Use License',
			subNavs: [
				{ order: 1, id: 'permitted-use', title: 'Permitted Use' },
				{ order: 2, id: 'license-termination', title: 'License Termination' },
			],
		},
		{
			order: 3,
			id: 'user-account',
			title: 'User Account',
			subNavs: [
				{ order: 1, id: 'account-creation', title: 'Account Creation' },
				{ order: 2, id: 'account-suspension', title: 'Account Suspension' },
			],
		},
		{
			order: 4,
			id: 'prohibited-uses',
			title: 'Prohibited Uses',
			subNavs: [{ order: 1, id: 'prohibited-activities', title: 'Specifically Prohibited Activities' }],
		},
		{
			order: 5,
			id: 'service-availability',
			title: 'Service Availability',
			subNavs: [
				{ order: 1, id: 'maintenance', title: 'Uptime and Maintenance' },
				{ order: 2, id: 'service-modifications', title: 'Service Modifications' },
			],
		},
		{
			order: 6,
			id: 'payment-terms',
			title: 'Payment Terms',
			subNavs: [
				{ order: 1, id: 'billing-payments', title: 'Billing and Payments' },
				{ order: 2, id: 'refund-policy', title: 'Refund Policy' },
				{ order: 3, id: 'late-payments', title: 'Late Payments' },
			],
		},
		{
			order: 7,
			id: 'intellectual-property',
			title: 'Intellectual Property',
			subNavs: [
				{ order: 1, id: 'our-content', title: 'Our Content' },
				{ order: 2, id: 'user-content', title: 'User Content' },
			],
		},
		{ order: 8, id: 'limitation-liability', title: 'Limitation of Liability' },
		{
			order: 9,
			id: 'indemnification',
			title: 'Indemnification',
		},
		{ order: 10, id: 'governing-law', title: 'Governing Law' },
		{
			order: 11,
			id: 'change-terms',
			title: 'Changes to Terms',
			subNavs: [{ order: 1, id: 'notification-changes', title: 'Notification of Changes' }],
		},
		{ order: 12, id: 'contact', title: 'Contact Information' },
	]

	const ids = navigationItems.map((item) => item.id)

	// collect all inner section IDs
	const innerIds = navigationItems.reduce((acc, item) => {
		if (item.subNavs && item.subNavs.length > 0) {
			item.subNavs.forEach((subNav) => {
				acc.push(subNav.id)
			})
		}
		return acc
	}, [])

	const { activeId, activeInnerId } = useScrollSpy(ids, innerIds)
	const scrollToSection = useSmoothScroll()

	return (
		<div className='container'>
			<div className={s.box}>
				<div>
					<BlockNote type='notification' className={s.block_note}>
						<strong>Important Notice</strong>
						<p>
							These terms constitute a legally binding agreement between you and Safira. Please read them carefully and
							contact us if you have any questions.
						</p>
					</BlockNote>

					<span className={s.updated}>Last updated: July 1, 2025</span>

					<Section order={1} id='agreement-to-terms' title='Agreement to Terms' className={s.section}>
						<p>
							By accessing and using Safira&apos;s website and services, you accept and agree to be bound by the terms
							and provision of this agreement. If you do not agree to abide by the above, please do not use this
							service.
						</p>
					</Section>

					<Section order={2} id='use-license' title='Use License' className={s.section}>
						<h3 id='permitted-use'>Permitted Use</h3>
						<p>
							Permission is granted to temporarily download one copy of the materials on Safira&apos;s website for
							personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title,
							and under this license you may not:
						</p>
						<ul>
							<li>Modify or copy the materials</li>
							<li>Use the materials for any commercial purpose or for any public display</li>
							<li>Attempt to reverse engineer any software contained on the website</li>
							<li>Remove any copyright or other proprietary notations from the materials</li>
						</ul>

						<h3 id='license-termination'>License Termination</h3>
						<p>
							This license shall automatically terminate if you violate any of these restrictions and may be terminated
							by Safira at any time. Upon terminating your viewing of these materials or upon the termination of this
							license, you must destroy any downloaded materials in your possession whether in electronic or printed
							format.
						</p>
					</Section>

					<Section order={3} id='user-account' title='User Account' className={s.section}>
						<h3 id='account-creation'>Account Creation</h3>
						<p>
							To access certain features of our service, you may be required to create an account. You are responsible
							for:
						</p>
						<ul>
							<li>Maintaining the confidentiality of your account credentials</li>
							<li>All activities that occur under your account</li>
							<li>Notifying us immediately of any unauthorized use</li>
							<li>Providing accurate and complete information</li>
						</ul>

						<h3 id='account-suspension'>Account Suspension</h3>
						<p>
							We reserve the right to suspend or terminate your account if you violate these terms or engage in
							activities that harm our service or other users.
						</p>
					</Section>

					<Section order={4} id='prohibited-uses' title='Prohibited Uses' className={s.section}>
						<p>
							You may not use our service for any unlawful purpose or to solicit others to perform or participate in any
							unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, or
							laws.
						</p>

						<h3 id='prohibited-activities'>Specifically Prohibited Activities</h3>
						<ul>
							<li>Transmitting or procuring the sending of any advertising or promotional material</li>
							<li>Transmitting any worms, viruses, or any code of a destructive nature</li>
							<li>Harassing, abusing, or harming another person</li>
							<li>Using the service for any fraudulent or unlawful purpose</li>
							<li>Interfering with or circumventing the security features of the service</li>
							<li>Impersonating another person or entity</li>
						</ul>
					</Section>

					<Section order={5} id='service-availability' title='Service Availability' className={s.section}>
						<h3 id='maintenance'>Uptime and Maintenance</h3>
						<p>
							While we strive to maintain continuous service availability, we do not guarantee that our service will be
							available at all times. We may experience:
						</p>

						<ul>
							<li>Scheduled maintenance periods</li>
							<li>Unexpected technical difficulties</li>
							<li>Third-party service interruptions</li>
							<li>Force majeure events</li>
						</ul>

						<h3 id='service-modifications'>Service Modifications</h3>
						<p>
							We reserve the right to modify, suspend, or discontinue any aspect of our service at any time, with or
							without notice. We will not be liable for any modification, suspension, or discontinuation of the service.
						</p>
					</Section>

					<Section order={6} id='payment-terms' title='Payment Terms' className={s.section}>
						<h3 id='billing-payments'>Billing and Payments</h3>
						<p>
							For paid services, you agree to pay all fees and charges incurred in connection with your account. All
							payments are due immediately upon receipt of invoice unless otherwise specified.
						</p>
						<h3 id='refund-policy'>Refund Policy</h3>
						<p>
							Refunds are processed according to our refund policy. Generally, refunds are available within 30 days of
							purchase for unused services, subject to terms and conditions.
						</p>
						<h3 id='late-payments'>Late Payments</h3>
						<p>
							Late payments may result in service suspension and additional fees. We reserve the right to charge
							interest on overdue amounts at a rate of 1.5% per month.
						</p>
					</Section>

					<Section order={7} id='intellectual-property' title='Intellectual Property' className={s.section}>
						<h3 id='our-content'>Our Content</h3>
						<p>
							All content on this website, including text, graphics, logos, images, and software, is the property of
							Safira or its content suppliers and is protected by copyright and other intellectual property laws.
						</p>
						<h3 id='user-content'>User Content</h3>
						<p>
							By submitting content to our service, you grant us a non-exclusive, worldwide, royalty-free license to
							use, reproduce, modify, and distribute your content in connection with our service.
						</p>
					</Section>

					<Section order={8} id='limitation-liability' title='Limitation of Liability' className={s.section}>
						<p>
							In no event shall Safira or its suppliers be liable for any damages (including, without limitation,
							damages for loss of data or profit, or due to business interruption) arising out of the use or inability
							to use the materials on Safira&apos;s website, even if Safira or an authorized representative has been
							notified orally or in writing of the possibility of such damage.
						</p>
						<BlockNote type='notification' className={s.block_note}>
							<strong>Disclaimer</strong>
							<p>
								Some jurisdictions do not allow limitations on implied warranties, or limitations of liability for
								consequential or incidental damages. These limitations may not apply to you.
							</p>
						</BlockNote>
					</Section>

					<Section order={9} id='indemnification' title='Indemnification' className={s.section}>
						<p>
							You agree to indemnify and hold harmless Safira and its affiliates, officers, directors, employees, and
							agents from any claims, damages, losses, liabilities, costs, and expenses (including reasonable
							attorneys&apos; fees) arising out of or resulting from your use of the service or violation of these
							terms.
						</p>
					</Section>

					<Section order={10} id='governing-law' title='Governing Law' className={s.section}>
						<p>
							These terms and conditions are governed by and construed in accordance with the laws of [Jurisdiction] and
							you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
						</p>
					</Section>

					<Section order={11} id='change-terms' title='Changes to Terms' className={s.section}>
						<p>
							We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting
							on our website. Your continued use of the service after any such changes constitutes your acceptance of
							the new terms.
						</p>
						<h3 id='notification-changes'>Notification of Changes</h3>
						<p>
							We will make reasonable efforts to notify users of material changes to these terms through email
							notifications or prominent notices on our website.
						</p>
					</Section>
					<Section order={12} id='contact' title='Contact Information' className={s.section}>
						<p>If you have any questions about these Terms & Conditions, please contact us at:</p>
						<div className={s.contacts}>
							<div className={s.contacts_item}>
								<a className={s.contacts_link} href='mailto:legal@safira.com'>
									<strong>Email:</strong>
									<span>legal@safira.com</span>
								</a>
							</div>
							<div className={s.contacts_item}>
								<a className={s.contacts_link} href='tel:781252777999'>
									<strong>Phone:</strong>
									<span>+7 (812) 52 777 999</span>
								</a>
							</div>
							<div className={s.contacts_item}>
								<a
									className={s.contacts_link}
									target='_blank'
									rel='noreferrer'
									href='https://goo.gl/maps/STZQGHm5kxchbajm8'
								>
									<strong>Address:</strong>
									<span>Ligovsky Ave, 50 block 3, St Petersburg, Russia, 191040</span>
								</a>
							</div>
							<div className={s.contacts_item}>
								<div className={s.contacts_hours}>
									<strong>Business Hours:</strong>
									<span>Mon-Fri 9AM-6PM</span>
								</div>
							</div>
						</div>
					</Section>
				</div>
				<div className={s.sidebar}>
					<nav className={s.sidebar_list}>
						{navigationItems.map(({ order, id, title, subNavs }) => (
							<NavLink
								order={order}
								key={id}
								href={`#${id}`}
								isActive={activeId === id}
								onClick={scrollToSection}
								subNavs={subNavs}
								activeInnerId={activeInnerId}
							>
								{order}. {title}
							</NavLink>
						))}
					</nav>
				</div>
			</div>
		</div>
	)
}
