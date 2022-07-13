import React from 'react'
import { Button } from 'react-bootstrap'
import classNames from 'classnames'
import { Variety } from 'common/Variety'

export interface ButtonIconOnlyProps {
	icon: string
	buttonIconVariety?: Variety
	buttonVariety?: Variety
	size?: any
	title?: string
	disabled?: boolean
	onClick?: any
}

export const ButtonIconOnly = ({
	icon,
	buttonIconVariety,
	buttonVariety,
	size,
	onClick,
}: ButtonIconOnlyProps) => {
	return (
		<Button
			className={classNames('btn icon-only', buttonIconVariety, size)}
			onClick={onClick}
			variant={buttonVariety as any}
		>
			<i className={icon} aria-hidden="true"></i>
		</Button>
	)
}
