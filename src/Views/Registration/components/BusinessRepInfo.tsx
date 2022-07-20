import React from 'react'
import {
	ContentHeader,
	FormField,
	FormTextInput,
	Form,
	Button,
	FormSearchSelect,
} from 'components'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { useMatch, useNavigate } from 'react-router-dom'
import { salutationOptions } from '../types'

export const BusinessRepInfo = () => {
	const match = useMatch('registration/*')
	const navigate = useNavigate()

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
		// resolver: yupResolver(validationSchema),
		defaultValues: initialValues,
	})

	const {
		getValues,
		register,
		formState: { isDirty },
		watch,
		control,
	} = useFormInstance

	const handleSubmit = async (values: any) => {
		console.log(getValues(), 'values')
		navigate(`${match?.pathnameBase}/banking-info`)
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
					<Row className="justify-content-center mb-5">
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
										<FormSearchSelect
											name="salutation"
											register={register}
											placeholder="Salutation"
											control={control}
											options={salutationOptions}
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
					<div className="footer w-75">
						<ProgressBar
							variant="secondary"
							now={40}
							className="col-lg-7 pull-left mt-3"
						/>
						<Button
							type="submit"
							disabled={!isDirty}
							className="col-lg-auto pull-right"
						>
							Next
						</Button>
					</div>
				</Form>
			</Container>
		</>
	)
}
