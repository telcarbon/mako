import React from 'react'
import {
	ContentHeader,
	FormField,
	FormTextInput,
	Form,
	FormSelect,
	Button,
} from 'components'
import { Container, Row, Col } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { options } from './BusinessInfo'
import { useMatch, useNavigate } from 'react-router-dom'

export const BusinessRepInfo = () => {
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Must be a valid email address')
			.required('Enter a valid email address'),
		password: Yup.string().required('Password is required'),
		salutation: Yup.string().required('Salutation is required'),
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		mobile: Yup.string().required('Mobile Number is required'),
	})

	const initialValues = {
		email: '',
		password: '',
		salutation: '',
		firstName: '',
		middleName: '',
		lastName: '',
		mobile: '',
	}

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: initialValues,
	})

	const {
		getValues,
		register,
		formState: { isDirty },
		watch,
	} = useFormInstance

	const handleSubmit = async (values: any) => {
		console.log(getValues(), 'values')
	}
	return (
		<>
			<Container fluid>
				<ContentHeader
					title="Business Representative Information"
					backText="Back"
					backLink={-1}
				/>
				<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
					<Row className="justify-content-center">
						<Col lg={5} className="px-3">
							<Row className="justify-content-center">
								<Col className="px-3">
									<FormField
										name="email"
										label="Account Log-in Credentials"
										centered
									>
										<FormTextInput
											placeholder="Email"
											name="email"
											register={register}
										/>
									</FormField>
									<FormField name="password">
										<FormTextInput
											placeholder="Password"
											name="password"
											register={register}
										/>
									</FormField>
								</Col>
							</Row>
							<Row className="justify-content-center mt-5">
								<Col className="px-3">
									<FormField
										name="salutation"
										label="Personal Information"
										centered
									>
										<FormSelect
											name="salutation"
											register={register}
											options={options}
											placeholder={'Salutation'}
										/>
									</FormField>
									<FormField name="firstName">
										<FormTextInput
											placeholder="First Name"
											name="firstName"
											register={register}
										/>
									</FormField>
									<FormField name="middleName">
										<FormTextInput
											placeholder="Middle Name"
											name="middleName"
											register={register}
										/>
									</FormField>
									<FormField name="lastName">
										<FormTextInput
											placeholder="Last Name"
											name="lastName"
											register={register}
										/>
									</FormField>
									<FormField name="mobile">
										<FormTextInput
											placeholder="Mobile Number"
											name="mobile"
											register={register}
										/>
									</FormField>
								</Col>
							</Row>
						</Col>
					</Row>
					<div className="footer">
						<Button
							type="submit"
							disabled={!isDirty}
						>
							Next
						</Button>
					</div>
				</Form>
			</Container>
		</>
	)
}
