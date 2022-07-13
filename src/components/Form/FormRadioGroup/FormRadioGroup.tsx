import React from 'react'
import { useFormContext, UseFormRegister } from 'react-hook-form'

type FormRadioGroupProps = {
	name: string
	register: UseFormRegister<any>
	required: boolean
	className?: string
	disabled?: boolean
	children?: React.ReactNode
	value: any
}

export const FormRadioGroup = ({
	name,
	register,
	required,
	className,
	value,
	children,
}: FormRadioGroupProps) => {
	return (
		<div>
			<label key={value}>
				<input
					type="radio"
					className={className}
					value={value}
					{...register(name, { required })}
				/>
				<div className="box">
					<span>{value}</span>
				</div>
				{children}
			</label>
		</div>
	)
}
