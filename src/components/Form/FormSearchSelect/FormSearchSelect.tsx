import { useEffect } from 'react'
import { Controller, UseFormRegister } from 'react-hook-form'
import Select from 'react-select'

interface FormSearchSelectProps {
	options: any[]
	register: UseFormRegister<any>
	control?: any
	name: string
	defaultValue?: any
	disabled?: boolean
	placeholder?: string
	isClearable?: boolean
	setServiceCounters?: any
	setValue?: any
	setToDefaultValue?: boolean
}

export const FormSearchSelect = ({
	options,
	name,
	control,
	placeholder = '',
	defaultValue = null,
	disabled = false,
	isClearable = true,
	setServiceCounters = null,
	setValue = null,
	setToDefaultValue = false,
}: FormSearchSelectProps) => {
	return (
		<Controller
			control={control}
			name={name as any}
			render={({ field }) => {
				useEffect(() => {
					if (disabled && setToDefaultValue) {
						if (defaultValue && defaultValue.value) {
							field.onChange(defaultValue.value)
						} else {
							field.onChange(defaultValue)
						}
					}
				}, [])

				return (
					<Select
						{...field}
						getOptionValue={(opt) => opt.value}
						getOptionLabel={(opt) => opt.label}
						options={options}
						placeholder={placeholder}
						isClearable={isClearable}
						value={
							(options &&
								options.find((f) => f.value === field.value)) ||
							defaultValue
						}
						className="select"
						classNamePrefix="select"
						isDisabled={disabled}
						onChange={(e: any) => {
							field.onChange((e && e.value) || defaultValue)
							if (setServiceCounters) {
								setServiceCounters([])
								setValue('multiServices', [])
							}
						}}
					/>
				)
			}}
		/>
	)
}
