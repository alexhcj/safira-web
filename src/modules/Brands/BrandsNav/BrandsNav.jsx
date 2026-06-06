import cn from 'classnames'

import s from './brands-nav.module.scss'

const alphabet = [
	'#',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
]

export const BrandsNav = ({ chars, onClick, isSticky, isTablet }) => {
	return (
		<div className={cn(s.box, { [isTablet ? s.visible : s.sticky]: !isSticky })}>
			<nav className={s.nav}>
				{alphabet.map((char) => {
					return (
						<span
							className={cn(s.char, { [s.available]: chars.includes(char) })}
							key={char}
							onClick={() => chars.includes(char) && onClick(chars[chars.indexOf(char)])}
						>
							{char}
						</span>
					)
				})}
			</nav>
		</div>
	)
}
