import { Controller, useForm, useWatch } from 'react-hook-form'
import {
	ContentHeader,
	FormTextInput,
	FormField,
	Form,
	Button,
	FormSearchSelect,
} from 'components'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Form as BootstrapForm } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useMatch, useNavigate } from 'react-router-dom'
import { IBusinessInfo, locationTypeOptions } from '../types'
import stateAndCitiesData from '../../../common/state_cities.json'
import {
	isNumericDigits,
	checkLength,
	ifNullOrEmpty,
	yupShortTest,
} from 'common/Util'
import axios from 'axios'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface IBusinessInfoProps {
	businessInfo: IBusinessInfo | undefined
	setBusinessInfo: (value: IBusinessInfo) => void
	setCurrentStep: (value: Number) => void
}

export const BusinessInfo = ({
	businessInfo,
	setBusinessInfo,
	setCurrentStep,
}: IBusinessInfoProps) => {
	const match = useMatch('registration/*')
	const navigate = useNavigate()

	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Token d5a100a2099c66cd2060fd3951bad9db82e1704f',
	}

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Enter a valid email address'),
		type: Yup.number()
			.required('Please select an option')
			.test('check-test', 'Please select an option', function (value) {
				return value !== 0
			}),
		street: Yup.string().required('Address Line 1 is required'),
		unitFloorBuilding: Yup.string().required('Address Line 2 is required'),
		state: Yup.string().required('State is required').nullable(),
		city: Yup.mixed().when('state', {
			is: (state: string) => {
				if (state !== '') {
					const cities = stateAndCitiesData.find(
						(f) => f.name === state
					)?.cities
					return cities && cities.length > 0
				}
				return false
			},
			then: Yup.string().required('City is required').nullable(),
		}),
		// country: Yup.string().required('Country is required'), Note: Since it has default value
		zipCode: Yup.string()
			.required('Zip code is required')
			.nullable()
			.test('numeric-test', 'Numeric digits only', function (value) {
				return yupShortTest(value, isNumericDigits(value))
			})
			.test(
				'length-test',
				'Should be compose of 5 digits',
				function (value) {
					return yupShortTest(value, checkLength(value, 5))
				}
			),
		email: Yup.string()
			.required('Email address is required')
			.email('Must be a valid email address')
			.test(
				'email-existing',
				'Email address already exists',
				function (value) {
					return new Promise((resolve) => {
						axios
							.get(
								`http://localhost:8000/api/partner-checker/?email=${value}`,
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

		phoneNumber: Yup.string()
			.required('Phone Number is required')
			.test({
				test: (value) => (!value ? true : isValidPhoneNumber(value)),
				message: 'Enter a valid mobile phone number',
			}),

		npi: Yup.string()
			.required('NPI Number is required')
			.test('numeric-test', 'Numeric digits only', function (value) {
				return yupShortTest(value, isNumericDigits(value))
			})
			.length(10, 'Should be compose of 10 digits'),
		ncpdp: Yup.string()
			.required('NCPDP Number is required')
			.test('numeric-test', 'Numeric digits only', function (value) {
				return value ? (!isNumericDigits(value) ? false : true) : true
			})
			.length(7, 'Should be compose of 7 digits'),
	})

	const initialValues: IBusinessInfo = {
		name: '',
		type: 0,
		street: '',
		unitFloorBuilding: '',
		email: '',
		phoneNumber: '',
		city: '',
		state: '',
		zipCode: '',
		country: 'US',
		npi: '',
		ncpdp: '',
	}

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: businessInfo,
	})

	const {
		getValues,
		register,
		formState: { isDirty },
		watch,
		control,
		setValue,
	} = useFormInstance

	const handleSubmit = async (values: any) => {
		// console.log('============', getValues())
		// console.log('testing', (123).toString('D16'))
		const formValues = getValues()
		setBusinessInfo(formValues)
		setCurrentStep(1)
		navigate(`${match?.pathnameBase}/busines-rep-info`)
		console.log(formValues)
	}

	const stateWatch: any = watch('state')
	const ifEmptyState = ifNullOrEmpty(stateWatch)

	const emailWatch = watch('email')

	const restructureCities = (): any => {
		if (!ifEmptyState) {
			var res: string[] | undefined
			res = stateAndCitiesData.find((f) => f.name === stateWatch)?.cities
			if (res && res.length > 0) {
				const restructured = res?.map((m) => {
					return {
						label: m,
						value: m,
					}
				})
				return restructured
			}
			return []
		}
	}

	return (
		<>
			<Container fluid>
				<ContentHeader title="Business Information" />
				<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
					<Row className="justify-content-center mb-5">
						<Col lg={10}>
							<Row className="justify-content-center">
								<Col lg={6} className="px-3">
									<FormField name="name">
										<FormTextInput
											placeholder="Business Name"
											name="name"
											register={register}
										/>
									</FormField>
								</Col>
								<Col lg={6} className="px-3">
									<FormField name="type">
										<FormSearchSelect
											name="type"
											register={register}
											placeholder="Type of Location"
											control={control}
											options={locationTypeOptions}
											defaultValue={0}
										/>
									</FormField>
								</Col>
							</Row>
							<Row className="justify-content-center mt-2">
								<Col lg={6} className="px-3">
									<FormField
										name="street"
										label="Business Address"
									>
										<FormTextInput
											placeholder="Address Line 1"
											name="street"
											register={register}
										/>
									</FormField>
									<FormField name="unitFloorBuilding">
										<FormTextInput
											placeholder="Address Line 2"
											name="unitFloorBuilding"
											register={register}
										/>
									</FormField>
									<FormField name="state">
										<FormSearchSelect
											name="state"
											register={register}
											placeholder="State"
											options={stateAndCitiesData.map(
												(m: any) => {
													return {
														label: m.name,
														value: m.name,
													}
												}
											)}
											control={control}
										/>
									</FormField>
									<FormField name="city">
										<FormSearchSelect
											name="city"
											register={register}
											placeholder="City"
											options={restructureCities()}
											control={control}
											disabled={ifEmptyState}
										/>
									</FormField>
									<FormField name="zipCode">
										<FormTextInput
											placeholder="Zip Code"
											name="zipCode"
											register={register}
										/>
									</FormField>
									<FormField name="country">
										<FormSearchSelect
											name="country"
											disabled
											register={register}
											options={[
												{
													label: 'United States of America',
													value: 'US',
												},
											]}
											placeholder={'Country'}
										/>
									</FormField>
								</Col>
								<Col lg={6} className="px-3">
									<FormField
										name="email"
										label="Contact Details"
									>
										<FormTextInput
											placeholder="Email Address"
											name="email"
											register={register}
										/>
									</FormField>
									<FormField
										name="phoneNumber"
										useWrapper={false}
										className="form-group"
									>
										<Controller
											control={control}
											name="phoneNumber"
											render={({
												field: { onChange, value },
											}) => (
												<PhoneInput
													international
													placeholder="Enter phone number"
													value={value}
													onChange={onChange}
													defaultCountry="US"
													inputComponent={
														BootstrapForm.Control as any
													}
												/>
											)}
										/>
									</FormField>
									<FormField
										name="npi"
										label="Licenses"
										className="mt-5"
									>
										<FormTextInput
											placeholder="NPI Number"
											name="npi"
											register={register}
										/>
									</FormField>
									<FormField name="ncpdp">
										<FormTextInput
											placeholder="NCPDP Number"
											name="ncpdp"
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
							now={20}
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
