import React, { useState } from 'react'
import {
	Controller,
	useForm,
	UseFormRegister,
	UseFormSetValue,
	Control,
} from 'react-hook-form'
import Select from 'react-select'
import { IBusinessInfo } from 'Views/Registration/types'

interface FormSelectNewProps {
	options: any[]
	register: UseFormRegister<any>
	// setValue: UseFormSetValue<IBusinessInfo>
	control?: Control<IBusinessInfo, object>
	name: string
	defaultValue?: any
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

const theme = (theme: any) => ({
	...theme,
	colors: {
		...theme.colors,
		primary25: '#f3f3f3',
		primary: '#333333',
	},
})

export const FormSelectNew = ({
	options,
	register,
	//setValue,
	name,
	control,
	defaultValue,
}: FormSelectNewProps) => {
	// const [selectedValue, setSelectedValue] = useState('')
	return (
		<Controller
			control={control}
			name={'typeOfLocation'}
			render={({ field }) => {
				console.log(field)

				// const props = {
				// 	name: field.name,
				// 	value: field.value || '',
				// 	on
				// }
				return (
					<Select
						{...field}
						options={options}
						placeholder="Type of Location"
						isClearable
						// getOptionValue={opt => opt.value}
						// getOptionLabel={opt => opt.label}
						// className="filter"
						// classNamePrefix="select"
						// classNamePrefix="filter"
						styles={selectStyles}
						// value={selectedValue}
						onChange={(e: any) => {
							console.log('ee', e)
							field.onChange(e)
							// field.onChange(e.value)
							// sample.onChange(e)
						}}
						// theme={theme}
					/>
				)
			}}
		/>
	)
}
