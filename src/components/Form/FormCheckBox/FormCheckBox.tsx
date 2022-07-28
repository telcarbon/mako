import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { UseFormRegister } from 'react-hook-form'

type FormCheckBoxProps = {
	name: string
	register: UseFormRegister<any>
	className?: string
	disabled?: boolean
	value: any
	control?: any
	children?: ReactNode
}

export const FormCheckBox = ({
	name,
	register,
	className,
	value,
	children,
}: FormCheckBoxProps) => {
	return (
		<div className={classNames('form-check', className)}>
			<label className="form-check-label">
				<input
					className="form-check-input"
					type="checkbox"
					{...register(name)}
				/>
				{children}
			</label>
		</div>
	)
}
