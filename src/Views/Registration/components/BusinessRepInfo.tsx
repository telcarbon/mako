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
import { IBusinessRepInfo, salutationOptions } from '../types'
import { checkLength, isNumericDigits, yupShortTest } from 'common/Util'
import axios from 'axios'
interface IBusinessRepInfoProps {
	businessRepInfo: IBusinessRepInfo | undefined
	setBusinessRepInfo: (value: IBusinessRepInfo) => void
	setCurrentStep: (value: Number) => void
}

export const BusinessRepInfo = ({
	businessRepInfo,
	setBusinessRepInfo,
	setCurrentStep,
}: IBusinessRepInfoProps) => {
	const navigate = useNavigate()
	const match = useMatch('registration/*')

	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Token d5a100a2099c66cd2060fd3951bad9db82e1704f',
	}

	const initialValues: IBusinessRepInfo = {
		email: '',
		password: '',
		salutation: '',
		firstName: '',
		middleName: '',
		lastName: '',
		phoneNumber: '',
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('Enter a valid email address')
			.email('Must be a valid email address')
			.test(
				'email-existing',
				'Email address already exists',
				function (value) {
					return new Promise((resolve) => {
						axios
							.get(
								`http://localhost:8000/api/business-representative-checker/?email=${value}`,
								{
									headers,
								}
							)
							.then((response) => {
								if (response && response.data.count > 0) {
									resolve(false)
								}
								resolve(true)
							})
							.catch(() => {
								resolve(true)
							})
					})
				}
			),
		password: Yup.string()
			.required('Password is required')
			// .min(8, 'Must be 8 characters or more')
			// .matches(/[0-9]/, 'Password requires a number'),
			// .test(
			// 	'is-pass-checker',
			// 	'Should contain alphanumeric characters',
			// 	function (value) {
			// 		if (value) {
			// 			var regex = new RegExp(
			// 				/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
			// 			)
			// 			return regex.test(value)
			// 		}
			// 		return true
			// 	}
			// ),
			.min(8, 'Password must be 8 characters long')
			.matches(/[0-9]/, 'Password requires atleast one number')
			.matches(/[a-zA-Z]/, 'Password requires alphanumeric characters'),
		// .matches(/[^a-zA-Z0-9]/, 'One number'),
		// .test(
		// 	'length-test',
		// 	'Should be composed of 8 characters',
		// 	function (value) {
		// 		return yupShortTest(value, checkLength(value, 8))
		// 	}
		// ),
		salutation: Yup.string().required('Salutation is required').nullable(),
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		phoneNumber: Yup.string()
			.required('Phone Number is required')
			.test('numeric-test', 'Numeric digits only', function (value) {
				return yupShortTest(value, isNumericDigits(value))
			}),
	})

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: businessRepInfo,
	})

	const {
		getValues,
		register,
		formState: { isDirty },
		watch,
		control,
	} = useFormInstance

	const handleSubmit = async (values: any) => {
		const formValues = getValues()
		setBusinessRepInfo(formValues)
		setCurrentStep(2)
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
											// type="password"
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
											name="phoneNumber"
											register={register}
											type="number"
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
