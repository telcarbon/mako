import React from 'react'
import classNames from 'classnames'
import { FormProvider, UseFormReturn } from 'react-hook-form'

export interface FormProps {
	useFormInstance: UseFormReturn<any>
	className?: string
	loading?: boolean
	children: React.ReactNode
	onSubmit: (...args: any[]) => void
}

export const Form = ({
	useFormInstance,
	className = 'page-form',
	loading = false,
	children,
	onSubmit,
	...props
}: FormProps) => {
	const { handleSubmit } = useFormInstance
	return (
		<FormProvider {...useFormInstance}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={className}
				{...props}
				noValidate
			>
				{children}
			</form>
		</FormProvider>
	)
}
