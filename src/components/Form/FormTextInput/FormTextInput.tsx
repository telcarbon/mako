import { faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

type InputProps = {
	name: string
	register: UseFormRegister<any>
	required?: boolean
	className?: string
	placeholder?: string
	hasAppendButton?: boolean
	onClickAppend?: React.MouseEventHandler<HTMLButtonElement>
	fieldCount?: any
	onClickRemove?: React.MouseEventHandler<HTMLButtonElement>
	type?: 'text' | 'number' | 'date' | 'time' | 'password'
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const FormTextInput = ({
	name,
	register,
	placeholder,
	hasAppendButton,
	onClickAppend,
	fieldCount,
	onClickRemove,
	type = 'text',
}: // onChange,
InputProps) => {
	const { onChange } = register(name)
	return (
		<>
			<div className="input-group rounded-left">
				<input
					type={type}
					className="form-control rounded-right"
					{...register(name)}
					placeholder={placeholder}
					onChange={(evt) => onChange(evt)}
				/>
				{fieldCount > 1 && (
					<button
						className="icon-only"
						onClick={onClickRemove}
						type="button"
					>
						<FontAwesomeIcon
							icon={faCircleXmark}
							className="text-secondary"
							size="1x"
						/>
					</button>
				)}
			</div>
			{hasAppendButton && (
				<button
					className="icon-only"
					onClick={onClickAppend}
					type="button"
				>
					<FontAwesomeIcon
						icon={faCirclePlus}
						className="text-secondary"
						size="2x"
					/>
				</button>
			)}
		</>
	)
}
