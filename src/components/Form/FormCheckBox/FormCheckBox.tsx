import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { UseFormRegister } from 'react-hook-form'

type FormCheckBoxProps = {
	name: string
	register: UseFormRegister<any>
	className?: string
	disabled?: boolean
	value?: any
	control?: any
	children?: ReactNode
	checkClassName?: string
	labelClassname?: string
	components?: any
	onClick?: any
	setCounter?: any
}

export const FormCheckBox = ({
	name,
	register,
	className,
	value,
	children,
	checkClassName,
	labelClassname,
	disabled,
	components,
	onClick,
	setCounter,
}: FormCheckBoxProps) => {
	return (
		<div className={classNames('form-check', className)}>
			<label
				className={classNames('form-check-label', labelClassname, {
					disabled: disabled,
				})}
			>
				<input
					className={classNames('form-check-input', checkClassName)}
					type="checkbox"
					{...register(name)}
					value={value}
					onClick={(e) => {
						if (setCounter !== undefined) {
							console.log('ssss', e)
							console.log('target', e.target)
						}
					}}
				/>
				{components && components}
				{children}
			</label>
		</div>
	)
}
