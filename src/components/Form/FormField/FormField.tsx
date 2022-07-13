import React from 'react'
import classNames from 'classnames'
import { useFormContext, get, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

export interface FormFieldProps {
	name: string
	label?: string
	children: React.ReactNode
	className?: string
	useWrapper?: boolean
	hidden?: boolean
	isRadio?: boolean
	centered?: boolean
}

export const FormField = ({
	name,
	label,
	children,
	className,
	useWrapper = true,
	hidden = false,
	isRadio,
	centered,
}: FormFieldProps) => {
	const {
		formState: { errors },
	} = useFormContext()

	const hasError = Boolean(get(errors, name))

	return (
		<>
			<div
				className={classNames(`form-group ${className || ''}`, {
					'error-highlight': hasError,
					'mb-0': isRadio && hasError,
				})}
				style={{ display: hidden ? 'none' : 'block' }}
			>
				<ContentWrapper useWrapper={useWrapper}>
					{label && (
						<label
							className={classNames('form-label w-75', {
								'text-center': centered,
							})}
							htmlFor={name}
						>
							{label}
						</label>
					)}
					{children}
				</ContentWrapper>
				{!isRadio && (
					<ErrorMessage
						errors={errors}
						name={name}
						render={({ message }) => (
							<small className="text-danger px-2">
								{message}
							</small>
						)}
					/>
				)}
			</div>
			{isRadio && (
				<ErrorMessage
					errors={errors}
					name={name}
					render={({ message }) => (
						<small className="text-danger px-2 mb-3 d-inline-block">
							{message}
						</small>
					)}
				/>
			)}
		</>
	)
}

const ContentWrapper = ({
	useWrapper,
	children,
}: {
	useWrapper: boolean
	children: React.ReactNode
}) => {
	if (!useWrapper) {
		return <>{children}</>
	}
	return (
		<div className="form-element-wrap" style={{ display: 'grid' }}>
			{children}
		</div>
	)
}
