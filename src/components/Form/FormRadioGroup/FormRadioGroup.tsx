import classNames from 'classnames'
import React from 'react'
import { Controller, useFormContext, UseFormRegister } from 'react-hook-form'

type FormRadioGroupProps = {
	name: string
	register: UseFormRegister<any>
	className?: string
	radioClassName?: string
	disabled?: boolean
	children?: React.ReactNode
	value: any
	control?: any
	components?: any
	labelClassname?: string
}

export const FormRadioGroup = ({
	name,
	register,
	className,
	value,
	control,
	children,
	disabled,
	radioClassName,
	components,
	labelClassname,
}: FormRadioGroupProps) => {
	// const { control } = useFormContext()
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<label
					key={value}
					className={classNames(labelClassname, {
						disabled: disabled,
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
						className={classNames(radioClassName, {
							disabled: disabled,
						})}
					>
						{radioClassName === 'box' && (
							<span>{value === true ? 'Yes' : 'No'}</span>
						)}
						{components && components}
					</div>
					{children}
				</label>
			)}
		/>
	)
}
