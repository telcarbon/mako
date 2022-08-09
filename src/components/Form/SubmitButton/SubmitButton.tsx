import { Variety } from 'common/Variety'
import { Button } from 'components'
import React, { MouseEventHandler, ReactNode } from 'react'
import { Spinner } from 'react-bootstrap'

interface SubmitButtonProps {
	pending: boolean
	disabled?: boolean
	pendingText?: string
	className?: string
	variety?: Variety
	type?: 'button' | 'submit' | 'reset'
	title?: string
	onClick?: MouseEventHandler
	children: ReactNode
}

export const SubmitButton = ({
	pending,
	disabled,
	pendingText,
	children,
	variety = Variety.Primary,
	type = 'submit',
	...props
}: SubmitButtonProps) => {
	return (
		<Button
			variety={variety}
			type={type}
			disabled={disabled || pending}
			{...props}
		>
			{pending && <Spinner animation="border" size="sm" className='me-2' />}
			{pending ? pendingText && `${pendingText}...` : children}
		</Button>
	)
}
