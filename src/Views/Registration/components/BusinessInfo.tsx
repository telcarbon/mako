import { useForm } from 'react-hook-form'
import {
	ContentHeader,
	FormTextInput,
	FormField,
	Form,
	Button,
	FormSearchSelect,
} from 'components'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useMatch, useNavigate } from 'react-router-dom'
import { IBusinessInfo, locationTypeOptions } from '../types'
import stateAndCitiesData from '../../../common/state_cities.json'
import { isNumericDigits, checkLength, ifNullOrEmpty } from 'common/Util'

const yupShortTest = (val: any, checker: boolean) => {
	return val ? (!checker ? false : true) : true
}

interface IBusinessInfoProps {
	businessInfo: IBusinessInfo | undefined
	setBusinessInfo: (value: IBusinessInfo) => void
}

export const BusinessInfo: React.FunctionComponent<IBusinessInfoProps> = ({
	businessInfo,
	setBusinessInfo,
}) => {
	const match = useMatch('registration/*')
	const navigate = useNavigate()

	const validationSchema = Yup.object().shape({
		businessName: Yup.string().required('Business Name is required'),
		typeOfLocation: Yup.number()
			.required('Please select an option')
			.moreThan(1, 'Please select an option')
			.nullable(),
		addressLineOne: Yup.string().required('Address Line 1 is required'),
		city: Yup.string().required('City is required'),
		state: Yup.string().required('State is required'),
		// country: Yup.string().required('Country is required'), Note: Since it has default value
		zip: Yup.string()
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
			.email('Must be a valid email address')
			.required('Enter a valid email address'),
		phoneNumber: Yup.string()
			.required('Phone Number is required')
			.test('numeric-test', 'Numeric digits only', function (value) {
				return yupShortTest(value, isNumericDigits(value))
			}), // problem with format tskk
		npiNumber: Yup.string()
			.required('NPI Number is required')
			.test('numeric-test', 'Numeric digits only', function (value) {
				return yupShortTest(value, isNumericDigits(value))
			})
			.length(10, 'Should be compose of 10 digits'),
		ncpdpNumber: Yup.string()
			.required('NCPDP Number is required')
			.test('numeric-test', 'Numeric digits only', function (value) {
				return value ? (!isNumericDigits(value) ? false : true) : true
			})
			.length(7, 'Should be compose of 7 digits'),
	})

	const initialValues: IBusinessInfo = {
		businessName: '',
		typeOfLocation: 0,
		addressLineOne: '',
		addressLineTwo: '',
		email: '',
		phoneNumber: '',
		city: '',
		state: '',
		zip: '',
		country: 'US',
		npiNumber: '',
		ncpdpNumber: '',
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
		control,
	} = useFormInstance

	const handleSubmit = async (values: any) => {
		console.log('============', getValues())
		// console.log('testing', (123).toString('D16'))
		// const formValues = getValues()
		// setBusinessInfo(formValues)
		//navigate(`${match?.pathnameBase}/busines-rep-info`)
	}

	const stateWatch: any = watch('state')
	const ifEmptyState = ifNullOrEmpty(stateWatch)

	const restructureCities = (): any => {
		console.log('aa', !ifEmptyState)
		console.log('typeof', stateWatch)
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
									<FormField name="businessName">
										<FormTextInput
											placeholder="Business Name"
											name="businessName"
											register={register}
										/>
									</FormField>
								</Col>
								<Col lg={6} className="px-3">
									<FormField name="typeOfLocation">
										<FormSearchSelect
											name="typeOfLocation"
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
										name="addressLineOne"
										label="Business Address"
									>
										<FormTextInput
											placeholder="Address Line 1"
											name="addressLineOne"
											register={register}
										/>
									</FormField>
									<FormField name="addressLineTwo">
										<FormTextInput
											placeholder="Address Line 2"
											name="addressLineTwo"
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
									<FormField name="zip">
										<FormTextInput
											placeholder="Zip Code"
											name="zip"
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
									<FormField name="phoneNumber">
										<FormTextInput
											placeholder="Phone Number"
											name="phoneNumber"
											register={register}
										/>
									</FormField>
									<FormField
										name="npiNumber"
										label="Licenses"
										className="mt-5"
									>
										<FormTextInput
											placeholder="NPI Number"
											name="npiNumber"
											register={register}
										/>
									</FormField>
									<FormField name="ncpdpNumber">
										<FormTextInput
											placeholder="NCPDP Number"
											name="ncpdpNumber"
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
							// disabled={!isDirty}
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
