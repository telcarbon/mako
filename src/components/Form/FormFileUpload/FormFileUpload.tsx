import {
	faChain,
	faCloudArrowUp,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

type InputFileProps = {
	name: string
	register: UseFormRegister<any>
	className?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	label?: string
	onClear?: any
	value?: any
}

const displayIcon = (icon: any, handleDelete?: any) => {
	return (
		<FontAwesomeIcon
			onClick={() => handleDelete()}
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
	onClear,
	value,
}: InputFileProps) => {
	const [selectedFile, setSelectedFile] = useState<string>('')
	const { onChange } = register(name)

	return (
		<label
			className={classNames(
				`btn btn-outline-dark border-2 ${className || ''}`
			)}
		>
			{selectedFile === '' && value.length === 0 ? (
				<>
					<input
						type="file"
						accept="application/pdf"
						{...register(name)}
						onChange={(event) => {
							const fileName = event.target.value.split('\\')
							setSelectedFile(fileName[fileName.length - 1])
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
					<span className="pe-5 ps-2">
						{selectedFile ? selectedFile : value[0].name}
					</span>
					{displayIcon(faTrash, onClear)}
				</button>
			)}
		</label>
	)
}
