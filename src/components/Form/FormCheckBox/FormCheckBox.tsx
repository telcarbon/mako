import classNames from 'classnames'
import { ReactNode } from 'react'
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
	manageCounter?: any
	data?: any
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
	manageCounter,
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
					value={value.id || value}
					onChange={(e) => {
						register(name).onChange(e)
						{
							manageCounter && manageCounter(e, value)
						}
					}}
				/>
				{components && components}
				{children}
			</label>
		</div>
	)
}
