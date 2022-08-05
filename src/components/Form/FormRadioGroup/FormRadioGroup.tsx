import classNames from 'classnames'
import React from 'react'
import { Controller, useFormContext, UseFormRegister } from 'react-hook-form'

type FormRadioGroupProps = {
	name: string
	register: UseFormRegister<any>
	className?: string
	disabled?: boolean
	children?: React.ReactNode
	value: any
	control?: any
}

export const FormRadioGroup = ({
	name,
	register,
	className,
	value,
	control,
	children,
	disabled,
}: FormRadioGroupProps) => {
	// const { control } = useFormContext()
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<label
					key={value}
					{...(disabled && {
						className: 'disabled',
					})}
				>
					<input
						type="radio"
						className={className}
						{...field}
						checked={field.value === value}
						value={value}
						onBlur={field.onBlur} // notify when input is touched
						onChange={() => field.onChange(value)} // send value to hook form
						disabled={disabled}
						{...(disabled && {
							className: 'disabled',
						})}
					/>
					<div
						className={classNames('box', {
							disabled: disabled,
						})}
					>
						<span>{value === true ? 'Yes' : 'No'}</span>
					</div>
					{children}
				</label>
			)}
		/>
	)
}
