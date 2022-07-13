import React, { EventHandler, MouseEventHandler } from 'react'
import { Variety } from '../../common/Variety'
import classNames from 'classnames'

export enum ButtonVariety {
	Link = 'link',
}

export interface ButtonProps {
	variety?: Variety | ButtonVariety
	children: React.ReactNode
	title?: string
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
	onClick?: MouseEventHandler
	className?: string
}

export const Button = ({
	variety = Variety.Primary,
	children,
	title,
	type = 'button',
	className = '',
	...props
}: ButtonProps) => {
	const onClick = props.onClick
	if (variety === ButtonVariety.Link) {
		return (
			<a
				className={classNames('link-dark', className)}
				title={title}
				href={`javascript:${
					props.disabled ? 'void(0)' : 'return false'
				};`}
				onClick={onClick}
			>
				{children}
			</a>
		)
	} else {
		return (
			<button
				type={type}
				className={classNames('btn rounded-pill', `btn-${variety}`, className)}
				title={title}
				onClick={onClick}
				disabled={props.disabled}
			>
				{children}
			</button>
		)
	}
}
