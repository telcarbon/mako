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
}: FormRadioGroupProps) => {
	// const { control } = useFormContext()
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<label key={value}>
					<input
						type="radio"
						className={className}
						{...field}
						checked={field.value === value}
						value={value}
						onBlur={field.onBlur} // notify when input is touched
						onChange={() => field.onChange(value)} // send value to hook form
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
