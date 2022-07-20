import { UseFormRegister } from 'react-hook-form'

type FormPlainSelectProps = {
	name: string
	register: UseFormRegister<any>
	required?: boolean
	className?: string
	placeholder?: string
	options: any[]
	disabled?: boolean
}

export const FormPlainSelect = ({
	name,
	register,
	placeholder,
	className,
	options,
	disabled,
}: FormPlainSelectProps) => {
	return (
		<select
			className={`form-select custom-select ${className || ''}`}
			{...register(name)}
			disabled={disabled}
		>
			{placeholder && (
				<option className="placeholder" value="" disabled>
					{placeholder}
				</option>
			)}
			{options.map(({ label, value }) => (
				<option value={value} key={value}>
					{label}
				</option>
			))}
		</select>
	)
}
