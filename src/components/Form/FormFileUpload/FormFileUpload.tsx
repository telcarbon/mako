import {
	faChain,
	faCloudArrowUp,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Button } from 'components'
import React, { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

type InputFileProps = {
	name: string
	register: UseFormRegister<any>
	className?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	label?: string
}

const displayIcon = (icon: any) => {
	return (
		<FontAwesomeIcon
			icon={icon}
			className="text-secondary"
			size="1x"
			style={{
				fontSize: '1.25em',
				paddingRight: '0.4em',
			}}
		/>
	)
}

export const FormFileUpload = ({
	name,
	register,
	className,
	label,
}: InputFileProps) => {
	const [selectedFile, setSelectedFile] = useState<string>('')
	const { onChange } = register(name)

	return (
		<label
			className={classNames(
				`btn btn-outline-dark border-2 ${className || ''}`
			)}
		>
			{selectedFile === '' ? (
				<>
					<input
						type="file"
						accept="application/pdf"
						{...register(name)}
						onChange={(event) => {
							setSelectedFile(event.target.value)
							onChange(event)
						}}
					/>
					{displayIcon(faCloudArrowUp)}
					{label}
				</>
			) : (
				<button
					type="button"
					onClick={(e) => {
						setSelectedFile('')
						e.preventDefault()
					}}
					className="d-block bg-transparent border-0 m-auto py-0"
				>
					{displayIcon(faChain)}
					<span className='pe-5 ps-2'>{selectedFile}</span>
					{displayIcon(faTrash)}
				</button>
			)}
		</label>
	)
}
