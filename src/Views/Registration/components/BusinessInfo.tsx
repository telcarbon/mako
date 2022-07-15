import { useForm } from 'react-hook-form'
import {
	ContentHeader,
	FormTextInput,
	FormField,
	Form,
	FormSelect,
	Button,
} from 'components'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useMatch, useNavigate } from 'react-router-dom'


export const options = [
	{
		value: 'Option 1',
		label: 'Option 1',
		id: 1,
	},
	{
		value: 'Option 2',
		label: 'Option 2',
		id: 2,
	},
]

export enum LocationType{
	PHARMACY ='Pharmacy',
	CLINIC ='Clinic',
	MOBILE ='Mobile',
}

const locationTypeOptions = [
	{
		id: 1,
		label: LocationType.PHARMACY,
		value: 1,
	},
	{
		id: 2,
		label: LocationType.CLINIC,
		value: 2,
	},
	{
		id: 1,
		label: LocationType.PHARMACY,
		value: 3,
	},
]

export const BusinessInfo = () => {
	const match = useMatch('registration/*')
	const navigate = useNavigate()

	const validationSchema = Yup.object().shape({
		businessName: Yup.string().required('Business Name is required'),
		typeOfLocation: Yup.string().required('Please select an option'),
		addressLineOne: Yup.string().required('Address Line 1 is required'),
		city: Yup.string().required('City is required'),
		state: Yup.string().required('State is required'),
		country: Yup.string().required('Country is required'),
		email: Yup.string()
			.email('Must be a valid email address')
			.required('Enter a valid email address'),
		phoneNumber: Yup.string().required('Phone Number is required'),
		npiNumber: Yup.string().required('NPI Number is required'),
		ncpdpNumber: Yup.string().required('NCPDP Number is required'),
	})

	const initialValues = {
		businessName: '',
		typeOfLocation: '',
		addressLineOne: '',
		addressLineTwo: '',
		email: '',
		phoneNumber: '',
		city: '',
		state: '',
		zip: '',
		country: '',
		npiNumber: '',
		ncpdpNumber: '',
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
	} = useFormInstance

	const handleSubmit = async (values: any) => {
		console.log(getValues(), 'values')
		navigate(`${match?.pathnameBase}/busines-rep-info`)
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
										<FormSelect
											name="typeOfLocation"
											register={register}
											options={locationTypeOptions}
											placeholder={'Type of Location'}
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
									<FormField name="city">
										<FormSelect
											name="city"
											register={register}
											options={options}
											placeholder={'City'}
										/>
									</FormField>
									<FormField name="state">
										<FormSelect
											name="state"
											register={register}
											options={options}
											placeholder={'State'}
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
										<FormSelect
											name="country"
											register={register}
											options={options}
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
