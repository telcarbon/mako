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
	hasPhotoPreview,
}: InputFileProps) => {
	const [selectedFile, setSelectedFile] = useState<string>('')
	const [preview, setPreview] = useState<any>()
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
							const fileName = event.target.value.split('\\')
							setSelectedFile(fileName[fileName.length - 1])
							// if (event?.target?.files?.length !== 0) {
							// 	setPreview({
							// 		image: URL.createObjectURL(
							// 			// @ts-ignore: Object is possibly 'null'.
							// 			event?.target?.files[0]
							// 		),
							// 	})
							// }
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
						></i>
					)}
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
					{!hasPhotoPreview ? (
						<>
							{displayIcon(faChain)}
							<span className="pe-5 ps-2">
								{selectedFile ? selectedFile : value[0].name}
							</span>
							{displayIcon(faTrash, onClear)}
						</>
					) : (
						<img
							src={window.URL.createObjectURL(value[0])}
							alt="Thumb"
						/>
						// "test"
					)}
				</button>
			)}
		</label>
	)
}
