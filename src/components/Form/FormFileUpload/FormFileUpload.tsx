import React from 'react'
import { UseFormRegister } from 'react-hook-form'

type InputFileProps = {
	name: string
	register: UseFormRegister<any>
	className?: string
	type?: 'file'
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormFileUpload = ({name, register, className, type}: InputFileProps) => {
	return (
		<input
			type="file"
			className={className}
			{...register(name)}
		/>
	)
}
