import React, { MouseEventHandler } from 'react'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Path, useForm, UseFormRegister } from 'react-hook-form'

type FormSelectProps = {
	name: string
	register: UseFormRegister<any>
	required?: boolean
	className?: string
	placeholder?: string
	options: any[]
	disabled?: boolean
}

export const FormSelect = ({
	name,
	register,
	placeholder,
	className,
	options,
	disabled,
}: FormSelectProps) => {
	return (
		<select
			className={`form-select custom-select ${className || ''}`}
			{...register(name)}
		>
			{placeholder && (
				<option className="placeholder" value="" disabled>
					{placeholder}
				</option>
			)}
			{options.map(({ label, value }) => (
				<option value={value} key={value}>{label}</option>
			))}
		</select>
	)
}
