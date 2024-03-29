import { Controller, useForm } from 'react-hook-form'
import {
	ContentHeader,
	FormTextInput,
	FormField,
	Form,
	Button,
	FormSearchSelect,
	SubmitButton,
	LoadingMaskWrap,
} from 'components'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Form as BootstrapForm } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { IBusinessInfo, locationTypeOptions } from '../types'
import stateAndCitiesData from '../../../common/state_cities.json'
import {
	isNumericDigits,
	checkLength,
	ifNullOrEmpty,
	yupShortTest,
	restructureCities,
} from 'common/Util'
import axios from 'axios'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { API_URL, TOKEN } from 'shared/config'

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
	const navigate = useNavigate()

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${TOKEN}`,
	}

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Business name is required'),
		type: Yup.number()
			.required('Please select an option')
			.test('check-test', 'Please select an option', (value) => {
				return value !== 0
			}),
		street: Yup.string().required('Address Line 1 is required'),
		// unitFloorBuilding: Yup.string().required('Address Line 2 is required'),
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
			.test('numeric-test', 'Numeric digits only', (value) => {
				return yupShortTest(value, isNumericDigits(value))
			})
			.test(
				'length-test',
				'Zip code cannot exceed 5 numeric digits',
				(value) => {
					return yupShortTest(value, checkLength(value, 5))
				}
			),
		email: Yup.string()
			.required('Email address is required')
			.email('Must be a valid email address')
			.test('is-existing', 'Email address already exists', (value) => {
				return new Promise((resolve) => {
					axios
						.get(`${API_URL}/partner-checker/?email=${value}`, {
							headers,
						})
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
			}),

		phoneNumber: Yup.string()
			.required('Phone Number is required')
			.test({
				test: (value) => (!value ? true : isValidPhoneNumber(value)),
				message: 'Enter a valid mobile phone number',
			})
			.test(
				'is-existing',
				'Phone Number is already registered',
				(value) => {
					return new Promise((resolve) => {
						axios
							.get(
								`${API_URL}/partner-checker/?phone_number=${value?.replace(
									value[0],
									'%2B'
								)}`,
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

		npi: Yup.string()
			.required('NPI Number is required')
			.test('numeric-test', 'Numeric digits only', (value) => {
				return yupShortTest(value, isNumericDigits(value))
			})
			.test('is-existing', 'NPI Number already exists', (value) => {
				return new Promise((resolve) => {
					axios
						.get(`${API_URL}/partner-checker/?npi=${value}`, {
							headers,
						})
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
			})
			.length(10, 'Should be compose of 10 digits'),
		ncpdp: Yup.string()
			.required('NCPDP Number is required')
			.test('numeric-test', 'Numeric digits only', (value) => {
				return value ? (!isNumericDigits(value) ? false : true) : true
			})
			.test('is-existing', 'NCPDP Number already exists', (value) => {
				return new Promise((resolve) => {
					axios
						.get(`${API_URL}/partner-checker/?ncpdp=${value}`, {
							headers,
						})
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
			})
			.length(7, 'Should be compose of 7 digits'),
	})

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: businessInfo,
	})

	const {
		getValues,
		register,
		formState: { isDirty, isSubmitting, isValid },
		watch,
		control,
	} = useFormInstance

	const handleSubmit = async (values: any) => {
		const formValues = getValues()
		setBusinessInfo(formValues)
		setCurrentStep(1)
		return new Promise(() => {
			setTimeout(() => {
				navigate(`/business-rep-info`)
			}, 1000)
		})
	}

	const stateWatch: any = watch('state')
	const ifEmptyState = ifNullOrEmpty(stateWatch)

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
											options={restructureCities(
												stateAndCitiesData,
												ifEmptyState,
												stateWatch
											)}
											control={control}
											disabled={ifEmptyState}
										/>
									</FormField>
									<FormField name="zipCode">
										<FormTextInput
											placeholder="Zip Code"
											name="zipCode"
											register={register}
											type="number"
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
													international={false}
													placeholder="Phone number"
													value={value}
													onChange={onChange}
													defaultCountry="US"
													inputComponent={
														BootstrapForm.Control as any
													}
													countries={['US']}
													addInternationalOption={
														false
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
						<SubmitButton
							pending={isSubmitting}
							pendingText="Saving"
							className="col-lg-auto pull-right"
							disabled={(!isDirty && !isValid) || isSubmitting}
						>
							Next
						</SubmitButton>
					</div>
				</Form>
				{isSubmitting && <LoadingMaskWrap />}
			</Container>
		</>
	)
}
