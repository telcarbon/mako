import React from 'react'
import { UseFormRegister } from 'react-hook-form'

type InputFileProps = {
        name: string
        register: UseFormRegister<any>
        required?: boolean
        className?: string
        placeholder?: string
        type?: 'text' | 'number' | 'date' | 'time' | 'password'
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }

export const FormFileUpload = () => {

    
  return (
    <div>FormFileUpload</div>
  )
}
