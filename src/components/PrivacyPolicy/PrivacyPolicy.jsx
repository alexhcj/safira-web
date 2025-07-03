import cn from 'classnames'

import { useSmoothScroll } from '@hooks/useScmoothScroll'
import { useScrollSpy } from '@hooks/useScrollSpy'

import { BlockNote } from '@shared/components/UI/BlockNote/BlockNote'

import s from './privacy-policy.module.scss'

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

export const PrivacyPolicy = () => {
	const navigationItems = [
		{
			order: 1,
			id: 'information-collection',
			title: 'Information We Collect',
			subNavs: [
				{ order: 1, id: 'personal-information', title: 'Personal Information You Provide' },
				{ order: 2, id: 'automatic-information', title: 'Information Collected Automatically' },
				{ order: 3, id: 'third-party-information', title: 'Information from Third Parties' },
			],
		},
		{
			order: 2,
			id: 'information-use',
			title: 'How We Use Your Information',
			subNavs: [
				{ order: 1, id: 'order-processing', title: 'Order Processing and Delivery' },
				{ order: 2, id: 'account-management', title: 'Account Management' },
				{ order: 3, id: 'communication-marketing', title: 'Communication and Marketing' },
				{ order: 4, id: 'business-operations', title: 'Business Operations' },
			],
		},
		{
			order: 3,
			id: 'information-sharing',
			title: 'Information Sharing',
			subNavs: [
				{ order: 1, id: 'service-providers', title: 'Service Providers' },
				{ order: 2, id: 'business-transfers', title: 'Business Transfers' },
				{ order: 3, id: 'legal-requirements', title: 'Legal Requirements' },
				{ order: 4, id: 'with-consent', title: 'With Your Consent' },
			],
		},
		{
			order: 4,
			id: 'data-security',
			title: 'Data Security',
			subNavs: [
				{ order: 1, id: 'technical-safeguards', title: 'Technical Safeguards' },
				{ order: 2, id: 'operational-safeguards', title: 'Operational Safeguards' },
			],
		},
		{
			order: 5,
			id: 'cookies',
			title: 'Cookies & Tracking',
			subNavs: [
				{ order: 1, id: 'cookies-types', title: 'Types of Cookies We Use' },
				{ order: 2, id: 'cookies-preferences', title: 'Managing Cookie Preferences' },
			],
		},
		{
			order: 6,
			id: 'your-rights',
			title: 'Your Rights',
			subNavs: [
				{ order: 1, id: 'access-portability', title: 'Access and Portability' },
				{ order: 2, id: 'correction-deletion', title: 'Correction and Deletion' },
				{ order: 3, id: 'communication-preferences', title: 'Communication Preferences' },
				{ order: 4, id: 'exercising-rights', title: 'Exercising Your Rights' },
			],
		},
		{ order: 7, id: 'children-privacy', title: 'Children`s Privacy' },
		{ order: 8, id: 'international-transfers', title: 'International Transfers' },
		{
			order: 9,
			id: 'data-retention',
			title: 'Data Retention',
			subNavs: [
				{ order: 1, id: 'retention-periods', title: 'Retention Periods' },
				{ order: 2, id: 'deletion-process', title: 'Deletion Process' },
			],
		},
		{ order: 10, id: 'policy-changes', title: 'Policy Changes' },
		{ order: 11, id: 'contact', title: 'Contact Information' },
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
				<div className={s.content}>
					<BlockNote className={s.block_note}>
						<strong>Your Privacy Matters:</strong> At Safira, we are committed to protecting your personal information
						and being transparent about how we collect, use, and share your data. This privacy policy explains our
						practices in clear, understandable terms.
					</BlockNote>

					<span className={s.updated}>Last updated: July 1, 2025</span>

					<Section order={1} id='information-collection' title='Information We Collect' className={s.section}>
						<h3 id='personal-information'>Personal Information You Provide</h3>
						<p>When you create an account, place orders, or interact with our services, we collect:</p>
						<ul>
							<li>
								<strong>Account Information:</strong> Name, email address, phone number, date of birth
							</li>
							<li>
								<strong>Delivery Information:</strong> Shipping addresses, delivery preferences, special instructions
							</li>
							<li>
								<strong>Payment Information:</strong> Credit card details, billing address (processed securely through
								encrypted payment processors)
							</li>
							<li>
								<strong>Profile Information:</strong> Dietary preferences, allergies, favorite products
							</li>
							<li>
								<strong>Communication Data:</strong> Messages sent through our customer service, reviews and ratings
							</li>
						</ul>

						<h3 id='automatic-information'>Information Collected Automatically</h3>
						<p>When you use our website and mobile app, we automatically collect:</p>
						<ul>
							<li>
								<strong>Device Information:</strong> IP address, browser type, operating system, device identifiers
							</li>
							<li>
								<strong>Usage Data:</strong> Pages visited, time spent on pages, click-through rates, search queries
							</li>
							<li>
								<strong>Location Data:</strong> Approximate location for delivery services (with your permission)
							</li>
							<li>
								<strong>App Analytics:</strong> App performance data, crash reports, feature usage statistics
							</li>
						</ul>

						<h3 id='third-party-information'>Information from Third Parties</h3>
						<p>We may receive information from:</p>
						<ul>
							<li>Social media platforms when you connect your accounts</li>
							<li>Payment processors for transaction verification</li>
							<li>Delivery partners for order fulfillment updates</li>
							<li>Marketing partners for promotional campaigns (with your consent)</li>
						</ul>
					</Section>

					<Section order={2} id='information-use' title='How We Use Your Information' className={s.section}>
						<p>We use your personal information for the following purposes:</p>

						<h3 id='order-processing'>Order Processing and Delivery</h3>
						<ul>
							<li>Processing and fulfilling your food orders</li>
							<li>Coordinating delivery and pickup services</li>
							<li>Sending order confirmations, updates, and delivery notifications</li>
							<li>Managing returns, refunds, and customer service inquiries</li>
						</ul>

						<h3 id='account-management'>Account Management</h3>
						<ul>
							<li>Creating and maintaining your user account</li>
							<li>Authenticating your identity and preventing fraud</li>
							<li>Providing personalized product recommendations</li>
							<li>Saving your preferences and order history</li>
						</ul>

						<h3 id='communication-marketing'>Communication and Marketing</h3>
						<ul>
							<li>Sending promotional emails about new products and special offers</li>
							<li>Providing customer support and responding to inquiries</li>
							<li>Conducting surveys and gathering feedback</li>
							<li>Sending important service announcements and policy updates</li>
						</ul>

						<h3 id='business-operations'>Business Operations</h3>
						<ul>
							<li>Analyzing website and app usage to improve our services</li>
							<li>Preventing fraud and ensuring platform security</li>
							<li>Complying with legal obligations and regulations</li>
							<li>Conducting internal research and development</li>
						</ul>
					</Section>

					<Section order={3} id='information-sharing' title='Information Sharing and Disclosure' className={s.section}>
						<p>
							We respect your privacy and do not sell your personal information. We may share your information in the
							following circumstances:
						</p>

						<h3 id='service-providers'>Service Providers</h3>
						<p>We work with trusted third-party service providers who help us operate our business:</p>
						<ul>
							<li>
								<strong>Payment Processors:</strong> Stripe, PayPal for secure payment processing
							</li>
							<li>
								<strong>Delivery Partners:</strong> Local delivery services and courier companies
							</li>
							<li>
								<strong>Cloud Services:</strong> AWS, Google Cloud for data storage and hosting
							</li>
							<li>
								<strong>Analytics Providers:</strong> Google Analytics, Mixpanel for usage analysis
							</li>
							<li>
								<strong>Customer Support:</strong> Zendesk, Intercom for customer service tools
							</li>
						</ul>

						<h3 id='business-transfers'>Business Transfers</h3>
						<p>
							In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new
							entity, subject to the same privacy protections.
						</p>

						<h3 id='legal-requirements'>Legal Requirements</h3>
						<p>We may disclose your information when required by law or to:</p>
						<ul>
							<li>Respond to legal requests and comply with court orders</li>
							<li>Protect our rights, property, and safety</li>
							<li>Prevent fraud and ensure platform security</li>
							<li>Cooperate with law enforcement investigations</li>
						</ul>

						<h3 id='with-consent'>With Your Consent</h3>
						<p>
							We may share your information for other purposes with your explicit consent, such as participating in
							promotional campaigns or surveys.
						</p>
					</Section>

					<Section order={4} id='data-security' title='Data Security' className={s.section}>
						<p>We implement comprehensive security measures to protect your personal information:</p>

						<h3 id='technical-safeguards'>Technical Safeguards</h3>
						<ul>
							<li>
								<strong>Encryption:</strong> All data transmissions are protected with SSL/TLS encryption
							</li>
							<li>
								<strong>Secure Storage:</strong> Personal data is stored in encrypted databases with access controls
							</li>
							<li>
								<strong>Regular Updates:</strong> Security systems are continuously monitored and updated
							</li>
							<li>
								<strong>Access Controls:</strong> Strict employee access controls with multi-factor authentication
							</li>
						</ul>

						<h3 id='operational-safeguards'>Operational Safeguards</h3>
						<ul>
							<li>Regular security audits and vulnerability assessments</li>
							<li>Employee training on data protection and privacy best practices</li>
							<li>Incident response procedures for potential security breaches</li>
							<li>Background checks for employees with access to personal data</li>
						</ul>

						<div className='highlight-box'>
							<strong>Data Breach Notification:</strong> In the unlikely event of a data breach affecting your personal
							information, we will notify you within 72 hours and provide guidance on protective measures you can take.
						</div>
					</Section>

					<Section order={5} id='cookies' title='Cookies and Tracking Technologies' className={s.section}>
						<p>
							We use cookies and similar technologies to enhance your browsing experience and understand how you use our
							services.
						</p>

						<h3 id='cookies-types'>Types of Cookies We Use</h3>
						<ul>
							<li>
								<strong>Essential Cookies:</strong> Required for basic website functionality and security
							</li>
							<li>
								<strong>Performance Cookies:</strong> Help us understand website usage and improve performance
							</li>
							<li>
								<strong>Functional Cookies:</strong> Remember your preferences and personalize your experience
							</li>
							<li>
								<strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign
								effectiveness
							</li>
						</ul>

						<h3 id='cookies-preferences'>Managing Cookie Preferences</h3>
						<p>You can control cookie settings through:</p>
						<ul>
							<li>Our cookie preference center available on the website</li>
							<li>Your browser settings to block or delete cookies</li>
							<li>Opt-out tools provided by advertising networks</li>
							<li>Mobile app settings for tracking preferences</li>
						</ul>

						<p>
							<em>Note: Disabling certain cookies may affect website functionality and your user experience.</em>
						</p>
					</Section>

					<Section order={6} id='your-rights' title='Your Rights and Choices' className={s.section}>
						<p>You have several rights regarding your personal information:</p>

						<h3 id='access-portability'>Access and Portability</h3>
						<ul>
							<li>
								<strong>Access:</strong> Request a copy of all personal information we hold about you
							</li>
							<li>
								<strong>Portability:</strong> Receive your data in a structured, machine-readable format
							</li>
							<li>
								<strong>Account Dashboard:</strong> View and download your order history and account data
							</li>
						</ul>

						<h3 id='correction-deletion'>Correction and Deletion</h3>
						<ul>
							<li>
								<strong>Correction:</strong> Update or correct inaccurate personal information
							</li>
							<li>
								<strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)
							</li>
							<li>
								<strong>Account Closure:</strong> Permanently close your account and delete associated data
							</li>
						</ul>

						<h3 id='communication-preferences'>Communication Preferences</h3>
						<ul>
							<li>
								<strong>Email Unsubscribe:</strong> Opt out of marketing emails using unsubscribe links
							</li>
							<li>
								<strong>SMS Opt-out:</strong> Reply STOP to SMS messages to unsubscribe
							</li>
							<li>
								<strong>Push Notifications:</strong> Disable through your device or app settings
							</li>
							<li>
								<strong>Preference Center:</strong> Manage all communication preferences in your account
							</li>
						</ul>

						<h3 id='exercising-rights'>Exercising Your Rights</h3>
						<p>
							To exercise any of these rights, contact us at{' '}
							<a className={s.link} href='mailto:privacy@safira.com'>
								privacy@safira.com
							</a>{' '}
							or through your account settings. We will respond within 30 days and may require identity verification for
							security purposes.
						</p>
					</Section>

					<Section order={7} id='children-privacy' title="Children's Privacy" className={s.section}>
						<p>Safira is committed to protecting children`s privacy online:</p>
						<ul>
							<li>Our services are not intended for children under 13 years of age</li>
							<li>We do not knowingly collect personal information from children under 13</li>
							<li>If we discover we have collected information from a child under 13, we will delete it immediately</li>
							<li>
								Parents who believe their child has provided information to us can contact us for immediate removal
							</li>
						</ul>

						<div className='highlight-box'>
							<strong>Parental Notice:</strong> If you are a parent or guardian and believe your child has provided
							personal information to Safira, please contact us immediately at{' '}
							<a className={s.link} href='mailto:privacy@safira.com'>
								privacy@safira.com
							</a>{' '}
							so we can remove the information.
						</div>
					</Section>

					<Section order={8} id='international-transfers' title='International Data Transfers' className={s.section}>
						<p>As a global service, we may transfer your personal information to countries outside your residence:</p>
						<ul>
							<li>Data may be stored and processed in the United States and European Union</li>
							<li>We ensure adequate protection through approved transfer mechanisms</li>
							<li>All transfers comply with applicable data protection laws (GDPR, CCPA)</li>
							<li>We use Standard Contractual Clauses for EU data transfers</li>
						</ul>

						<p>
							Countries where your data may be processed maintain adequate data protection standards or we implement
							additional safeguards to protect your information.
						</p>
					</Section>

					<Section order={9} id='data-retention' title='Data Retention' className={s.section}>
						<p>We retain your personal information for different periods based on the type of data and purpose:</p>

						<h3 id='retention-periods'>Retention Periods</h3>
						<ul>
							<li>
								<strong>Account Information:</strong> Retained while your account is active, plus 3 years after closure
							</li>
							<li>
								<strong>Order History:</strong> Kept for 7 years for financial and legal compliance
							</li>
							<li>
								<strong>Payment Data:</strong> Tokenized payment information retained for 1 year
							</li>
							<li>
								<strong>Marketing Data:</strong> Deleted within 2 years of last engagement
							</li>
							<li>
								<strong>Support Tickets:</strong> Retained for 3 years for quality assurance
							</li>
						</ul>

						<h3 id='deletion-process'>Deletion Process</h3>
						<p>
							When retention periods expire or you request deletion, we securely delete your information using
							industry-standard data destruction methods. Some information may be retained longer if required by law or
							for legitimate business purposes.
						</p>
					</Section>

					<Section order={10} id='policy-changes' title='Changes to This Privacy Policy' className={s.section}>
						<p>
							We may update this privacy policy periodically to reflect changes in our practices or legal requirements:
						</p>
						<ul>
							<li>We will notify you of significant changes via email or app notification</li>
							<li>The &#34;Last Updated&#34; date at the top indicates when changes were made</li>
							<li>Continued use of our services after changes constitutes acceptance</li>
							<li>Previous versions are archived and available upon request</li>
						</ul>

						<p>We encourage you to review this policy regularly to stay informed about how we protect your privacy.</p>
					</Section>

					<Section order={11} id='contact' title='Contact Information' className={s.section}>
						<p>
							If you have questions, concerns, or requests regarding this privacy policy or your personal information,
							please contact us:
						</p>
					</Section>

					<div className={s.contacts}>
						<div className={s.contacts_item}>
							<a className={s.contacts_link} href='mailto:privacy@safira.com'>
								<strong>Email:</strong>
								<span>privacy@safira.com</span>
							</a>
						</div>
						<div className={s.contacts_item}>
							<a className={s.contacts_link} href='tel:792134777999'>
								<strong>Phone:</strong>
								<span>+7 (812) 34 777 999</span>
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
