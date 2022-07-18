import React from 'react'
import {
	Button,
	ContentHeader,
	Form,
	FormField,
	FormRadioGroup,
	FormTextInput,
} from 'components'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useMatch, useNavigate } from 'react-router-dom'

export const RadioLabelOptions = [
	{ value: true, name: 'YES' },
	{ value: false, name: 'NO' },
]

export const BusinessQuestionnaire = () => {
	const match = useMatch('registration/*')
	const navigate = useNavigate()

	const validationSchema = Yup.object().shape({
		offerPhlebotomy: Yup.mixed()
			.required('Please select an option')
			.nullable(),

		isLicensedPhlebotomist: Yup.mixed().when('offerPhlebotomy', {
			is: true,
			then: Yup.boolean().required('Please select an option').nullable(),
		}),
		// phlebotomistName: Yup.mixed().when('isLicensedPhlebotomist', {
		// 	is: true,
		// 	then: Yup.string().required('Please select an option'),
		// }),
		phlebotomist: Yup.array().of(
			Yup.object().shape({
				phlebotomistName: Yup.string().required(
					'This field is required'
				),
			})
		),
		trainExistingStaff: Yup.mixed().when('isLicensedPhlebotomist', {
			is: true,
			then: Yup.boolean().required('Please select an option').nullable(),
		}),
		offerClia: Yup.mixed().when('trainExistingStaff', {
			is: true,
			then: Yup.boolean().required('Please select an option').nullable(),
		}),
		isCliaWaivedSite: Yup.mixed().when('offerClia', {
			is: true,
			then: Yup.boolean().required('Please select an option').nullable(),
		}),
		hasParkingLot: Yup.mixed().when('isCliaWaivedSite', {
			is: true,
			then: Yup.boolean().required('Please select an option').nullable(),
		}),
		offerPrescription: Yup.mixed().when('hasParkingLot', {
			is: true,
			then: Yup.boolean().required('Please select an option').nullable(),
		}),
	})

	const initialValues = {
		offerPhlebotomy: null,
		isLicensedPhlebotomist: null,
		phlebotomist: [{ phlebotomistName: '' }],
		trainExistingStaff: null,
		offerClia: null,
		isCliaWaivedSite: null,
		hasParkingLot: null,
		offerPrescription: null,
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

	const offerPhlebotomyCollapse = watch('offerPhlebotomy')
	const licensedPhlebotomistCollapse = watch('isLicensedPhlebotomist')
	const trainExistingStaffCollapse = watch('trainExistingStaff')
	const offerCliaCollapse = watch('offerClia')
	const isCliaWaivedSiteCollapse = watch('isCliaWaivedSite')
	const hasParkingLotCollapse = watch('hasParkingLot')

	console.log(offerPhlebotomyCollapse, 'watch')

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'phlebotomist',
	})

	const handleAppend = (
		value:
			| Partial<{ phlebotomistName: string }>
			| Partial<{ phlebotomistName: string }>[]
	) => {
		append(value)
		console.log('add: ', getValues())
	}

	const handleRemove = (index: number | number[] | undefined) => {
		remove(index)
		console.log('remove: ', getValues())
	}

	const handleSubmit = async (values: any) => {
		console.log(getValues(), 'values')
		navigate(`${match?.pathnameBase}/terms`)
	}
	return (
		<Container fluid>
			<ContentHeader
				title="Business Questionnaire"
				backText="Back"
				backLink={-1}
			/>
			<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
				<Row className="justify-content-center mb-5">
					<Col lg={10}>
						<FormField
							name="offerPhlebotomy"
							label="Would you like to offer phlebotomy/blood draw services?"
							useWrapper={false}
							className="form-radio-wrap rounded-2 d-flex ps-3"
							isRadio
						>
							<div className="d-flex">
								{RadioLabelOptions.map((option, index) => (
									<FormRadioGroup
										name={'offerPhlebotomy'}
										register={register}
										value={option.value}
										key={index}
									/>
								))}
							</div>
						</FormField>
						{offerPhlebotomyCollapse && (
							<FormField
								name="isLicensedPhlebotomist"
								label="Do you have a licensed phlebotomist?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
							>
								<div className="d-flex">
									{RadioLabelOptions.map((option, index) => (
										<FormRadioGroup
											name={'isLicensedPhlebotomist'}
											register={register}
											value={option.value}
											key={index}
										/>
									))}
								</div>
								{licensedPhlebotomistCollapse && (
									<div style={{ flexBasis: '100%' }}>
										{fields.map((item, index) => {
											return (
												<div
													key={item.id}
													className="col-lg-7 d-flex mb-1 align-items-center"
												>
													<FormField
														name={`phlebotomist[${index}].phlebotomistName`}
													className="d-flex">
														<FormTextInput
															name={`phlebotomist[${index}].phlebotomistName`}
															register={register}
															placeholder="Phlebotomist Name"
															hasAppendButton={
																true
															}
															onClickAppend={() =>
																handleAppend({
																	phlebotomistName:
																		'',
																})
															}
															fieldCount={
																fields?.length
															}
															onClickRemove={() =>
																handleRemove(
																	index
																)
															}
														/>
													</FormField>
												</div>
											)
										})}
									</div>
								)}
							</FormField>
						)}
						{licensedPhlebotomistCollapse && (
							<FormField
								name="trainExistingStaff"
								label="Would you like to train your existing staff in phlebotomy?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
							>
								<div className="d-flex">
									{RadioLabelOptions.map((option, index) => (
										<FormRadioGroup
											name={'trainExistingStaff'}
											register={register}
											value={option.value}
											key={index}
										/>
									))}
								</div>
							</FormField>
						)}
						{trainExistingStaffCollapse && (
							<FormField
								name="offerClia"
								label="Would you like to offer CLIA waived point of care testing
                                services to the general public (Strep, HIV, UTI, Flu, A1c, Blood Pressure, etc)?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
								labelClassName="w-75"
							>
								<div className="d-flex">
									{RadioLabelOptions.map((option, index) => (
										<FormRadioGroup
											name={'offerClia'}
											register={register}
											value={option.value}
											key={index}
										/>
									))}
								</div>
							</FormField>
						)}
						{offerCliaCollapse && (
							<FormField
								name="isCliaWaivedSite"
								label="Is your business a CLIA WAIVED site?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
							>
								<div className="d-flex">
									{RadioLabelOptions.map((option, index) => (
										<FormRadioGroup
											name={'isCliaWaivedSite'}
											register={register}
											value={option.value}
											key={index}
										/>
									))}
								</div>
								{isCliaWaivedSiteCollapse && (
									<div style={{ flexBasis: '100%' }}>
										<button className="btn btn-outline-dark border-2 col-	-4">
											Upload CLIA certification
											<FontAwesomeIcon
												icon={faCloudArrowUp}
												className="text-secondary ps-2"
												size="1x"
												style={{
													fontSize: '1.25em',
												}}
											/>
										</button>
									</div>
								)}
							</FormField>
						)}
						{isCliaWaivedSiteCollapse && (
							<FormField
								name="hasParkingLot"
								label="Does your business have parking lot area for MakoRx mobile medical unit to complete annual physical exams for patients?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
								labelClassName="w-75"
							>
								<div className="d-flex">
									{RadioLabelOptions.map((option, index) => (
										<FormRadioGroup
											name={'hasParkingLot'}
											register={register}
											value={option.value}
											key={index}
										/>
									))}
								</div>
							</FormField>
						)}
						{hasParkingLotCollapse && (
							<FormField
								name="offerPrescription"
								label="Does your business offer prescription delivery via company driver or courier service?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
							>
								<div className="d-flex">
									{RadioLabelOptions.map((option, index) => (
										<FormRadioGroup
											name={'offerPrescription'}
											register={register}
											value={option.value}
											key={index}
										/>
									))}
								</div>
							</FormField>
						)}
					</Col>
				</Row>
				<div className="footer w-75">
					<ProgressBar
						variant="secondary"
						now={80}
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
	)
}
