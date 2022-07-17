import React from 'react'
import { Controller, useFormContext, UseFormRegister } from 'react-hook-form'

type FormRadioGroupProps = {
	name: string
	register: UseFormRegister<any>
	className?: string
	disabled?: boolean
	children?: React.ReactNode
	value: any
}

export const FormRadioGroup = ({
	name,
	register,
	className,
	value,
	children,
}: FormRadioGroupProps) => {
	const { control } = useFormContext()
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur } }) => (
				<label key={value}>
					<input
						type="radio"
						className={className}
						value={value}
						{...register(name)}
						onBlur={onBlur} // notify when input is touched
						onChange={() => onChange(value)} // send value to hook form
					/>
					<div className="box">
						<span>{value === true ? 'Yes' : 'No'}</span>
					</div>
					{children}
				</label>
			)}
		/>
	)
}
