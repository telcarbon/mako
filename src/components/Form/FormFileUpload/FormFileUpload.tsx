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
	hasPhotoPreview?: boolean
	photoName?: any
}

const displayIcon = (icon: any, handleDelete?: any) => {
	return (
		<FontAwesomeIcon
			onClick={() => {
				handleDelete()
			}}
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
	hasPhotoPreview,
	photoName,
}: InputFileProps) => {
	const [selectedFile, setSelectedFile] = useState<any>('')
	const [selectedFilename, setSelectedFilename] = useState<string>('')
	const { onChange } = register(name)

	return (
		<label
			className={classNames(
				`${
					!hasPhotoPreview
						? 'btn btn-outline-dark border-2'
						: 'upload-photo bg-primary'
				} ${className || ''}`
			)}
		>
			{selectedFile === '' && value.length === 0 ? (
				<>
					<input
						type="file"
						accept={`${
							hasPhotoPreview
								? 'image/png, image/jpeg'
								: 'application/pdf'
						}`}
						{...register(name)}
						onChange={(event) => {
							const names = event.target.value.split('\\')
							let fileName = names[names.length - 1]
							const getExt = fileName.split('.')
							const fileExt = getExt[getExt.length - 1]

							if (photoName) {
								fileName = `${photoName}.${fileExt}`
							}

							setSelectedFile(event.target.files)
							setSelectedFilename(fileName)
							onChange(event)
						}}
					/>
					{!hasPhotoPreview ? (
						<>
							{displayIcon(faCloudArrowUp)}
							{label}
						</>
					) : (
						<i
							className="fa fa-user-plus fa-2x text-secondary"
							aria-hidden="true"
						/>
					)}
				</>
			) : (
				<button
					type="button"
					onClick={(e) => {
						if (selectedFilename && !hasPhotoPreview) {
							setSelectedFile('')
							setSelectedFilename('')
							e.preventDefault()
						}
					}}
					{...(selectedFilename &&
						hasPhotoPreview && {
							style: {
								display: 'unset',
							},
						})}
					className="d-block bg-transparent border-0 m-auto py-0"
				>
					{!hasPhotoPreview ? (
						<>
							{displayIcon(faChain)}
							<span className="pe-5 ps-2">
								{selectedFilename
									? selectedFilename
									: value[0].name}
							</span>
							{displayIcon(faTrash, onClear)}
						</>
					) : (
						<div className="img-preview">
							<img
								src={window.URL.createObjectURL(
									selectedFile ? selectedFile[0] : value[0]
								)}
								alt="Thumb"
								className="img-fluid"
							/>
						</div>
					)}
				</button>
			)}
		</label>
	)
}
