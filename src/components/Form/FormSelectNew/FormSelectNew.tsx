import { Control, Controller, UseFormRegister } from 'react-hook-form'
import Select from 'react-select'
import { IBusinessInfo } from 'Views/Registration/types'

interface FormSelectNewProps {
	options: any[]
	register: UseFormRegister<any>
	control?: Control<IBusinessInfo, object>
	name: any
	defaultValue?: any
	disabled?: boolean
	placeholder?: string
}

const selectStyles = {
	control: (base: any) => ({
		...base,
		fontSize: '16px',
		borderRadius: '0.25em',
		border: '2px solid #333333',
		boxShadow: 'none',
		'&:focus': {
			border: '0 !important',
		},
		'&:focus-within': {
			borderColor: '#333333',
			boxShadow: '0 0 0 0.2rem rgba(51, 51, 51, 0.25)',
		},
		'&:hover': {
			opacity: 1,
		},
	}),
	multiValue: (base: any) => ({
		...base,
		backgroundColor: 'blue',
		color: 'white',
	}),
}

export const FormSelectNew = ({
	options,
	name,
	control,
	placeholder = '',
	defaultValue = null,
	disabled = false,
}: FormSelectNewProps) => {
	return (
		<Controller
			control={control}
			name={name as any}
			render={({ field }) => {
				return (
					<Select
						{...field}
						getOptionValue={(opt) => opt.value}
						getOptionLabel={(opt) => opt.label}
						options={options}
						placeholder={placeholder}
						isClearable
						value={
							(options &&
								options.find((f) => f.value === field.value)) ||
							defaultValue
						}
						// className="filter"
						// classNamePrefix="select"
						// classNamePrefix="filter"
						styles={selectStyles}
						isDisabled={disabled}
						onChange={(e: any) => {
							field.onChange((e && e.value) || defaultValue)
						}}
					/>
				)
			}}
		/>
	)
}
