import {
	faChain,
	faCloudArrowUp,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Button } from 'components'
import React, { useState } from 'react'
import { useFormContext, UseFormRegister } from 'react-hook-form'

type InputFileProps = {
	name: string
	register: UseFormRegister<any>
	className?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	label?: string
	reset?: any
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
	reset,
	onChange,
}: InputFileProps) => {
	const [selectedFile, setSelectedFile] = useState<string>('')
	const [uploadedPhotos, setUploadedPhotos] = useState<any[]>([])
	// const { onChange } = register(name)

	const {
		setValue,
		formState: { errors },
	} = useFormContext()

	const handleUpload = (e: any) => {
		console.log(typeof e.target.files)
		const files = e.target.files[0]
		setUploadedPhotos([...uploadedPhotos, files])
		console.log(files)
	}

	return (
		<label
			className={classNames(
				`btn btn-outline-dark border-2 ${className || ''}`
			)}
		>
			{uploadedPhotos?.length === 0 ? (
				<>
					<input
						type="file"
						accept="application/pdf"
						{...register(name)}
						// onChange={(event) => {
						// 	setSelectedFile(event.target.value)
						// 	onChange(event)
						// }}
						onChange={
							// setSelectedFile(e.target.value)
							// const files = e.target.files[0]
							// setUploadedPhotos([...uploadedPhotos, files])
							onChange
						}
					/>
					{displayIcon(faCloudArrowUp)}
					{label}
				</>
			) : (
				<Button
					type="button"
					onClick={(e) => {
						setSelectedFile('')
						setUploadedPhotos([])
						reset
						e.preventDefault()
					}}
					className="d-block bg-transparent border-0 m-auto py-0"
				>
					{displayIcon(faChain)}
					<span className="pe-5 ps-2">{uploadedPhotos[0]?.name}</span>
					{displayIcon(faTrash)}
				</Button>
			)}
		</label>
	)
}
