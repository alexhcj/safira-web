import React from 'react';
import s from './title.module.scss'
import cn from "classnames";

export const Title = ({
		tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
		type = 'title' | 'subtitle',
		color,
		className,
		children
	}) => {
	const Heading = tag
	return (
		<Heading className={cn(type && s[type], tag && s[tag], color && s[color], className)}>
			{children}
		</Heading>
	);
};
