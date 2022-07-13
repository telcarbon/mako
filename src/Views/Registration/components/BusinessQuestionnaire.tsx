import React from 'react'
import {
	Button,
	ContentHeader,
	Form,
	FormField,
	FormRadioGroup,
	FormTextInput,
} from 'components'
import { Container, Row, Col } from 'react-bootstrap'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'

export enum RadioOptionsLabel {
	YES = 'Yes',
	NO = 'No',
}

export const RadioLabelOptions = [
	{ value: true, name: 'YES' },
	{ value: false, name: 'NO' },
]

const OptionsLabel: RadioOptionsLabel[] = [
	RadioOptionsLabel.YES,
	RadioOptionsLabel.NO,
]

export const BusinessQuestionnaire = () => {
	const validationSchema = Yup.object().shape({
		offerPhlebotomy: Yup.string().required('Please select an option'),
		isLicensedPhlebotomist: Yup.string().when('offerPhlebotomy', {
			is: (offerPhlebotomyCollapse: RadioOptionsLabel) =>
				offerPhlebotomyCollapse === RadioOptionsLabel.YES,
			then: Yup.string().required('Please select an option'),
		}),
		// phlebotomistName: Yup.string().when('isLicensedPhlebotomist', {
		// 	is: (islicensedPhlebotomistCollapse: RadioOptionsLabel) =>
		//     islicensedPhlebotomistCollapse === RadioOptionsLabel.YES,
		// 	then: Yup.string().required('Please select an option'),
		// }),
		trainExistingStaff: Yup.string().when('isLicensedPhlebotomist', {
			is: (islicensedPhlebotomistCollapse: RadioOptionsLabel) =>
				islicensedPhlebotomistCollapse === RadioOptionsLabel.YES,
			then: Yup.string().required('Please select an option'),
		}),
		offerClia: Yup.string().when('trainExistingStaff', {
			is: (trainExistingStaffCollapse: RadioOptionsLabel) =>
				trainExistingStaffCollapse === RadioOptionsLabel.YES,
			then: Yup.string().required('Please select an option'),
		}),
		isCliaWaivedSite: Yup.string().when('offerClia', {
			is: (offerCliaCollapse: RadioOptionsLabel) =>
				offerCliaCollapse === RadioOptionsLabel.YES,
			then: Yup.string().required('Please select an option'),
		}),
	})

	const initialValues = {
		offerPhlebotomy: '',
		isLicensedPhlebotomist: '',
		phlebotomist: [{ phlebotomistName: '' }],
		trainExistingStaff: '',
		offerClia: '',
		isCliaWaivedSite: '',
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
	}
	return (
		<Container fluid>
			<ContentHeader
				title="Business Questionnaire"
				backText="Back"
				backLink={-1}
			/>
			<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
				<Row className="justify-content-center">
					<Col lg={10}>
						<FormField
							name="offerPhlebotomy"
							label="Would you like to offer phlebotomy/blood draw services?"
							useWrapper={false}
							className="form-radio-wrap rounded-2 d-flex ps-3"
							isRadio
						>
							<div className="d-flex">
								{OptionsLabel.map((option, index) => (
									<FormRadioGroup
										name={'offerPhlebotomy'}
										register={register}
										value={option}
										required={false}
										key={index}
									/>
								))}
							</div>
						</FormField>
						{offerPhlebotomyCollapse === RadioOptionsLabel.YES && (
							<FormField
								name="isLicensedPhlebotomist"
								label="Do you have a licensed phlebotomist?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
							>
								<div className="d-flex">
									{OptionsLabel.map((option, index) => (
										<FormRadioGroup
											name={'isLicensedPhlebotomist'}
											register={register}
											value={option}
											required={false}
											key={index}
										/>
									))}
								</div>
								{licensedPhlebotomistCollapse ===
									RadioOptionsLabel.YES && (
									<div style={{ flexBasis: '100%' }}>
										{fields.map((item, index) => {
											return (
												<div
													key={item.id}
													className="col-lg-7 d-flex mb-1 align-items-center"
												>
													<FormTextInput
														name={`phlebotomist[${index}].phlebotomistName`}
														register={register}
														placeholder="Phlebotomist Name"
														hasAppendButton={true}
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
															handleRemove(index)
														}
													/>
												</div>
											)
										})}
									</div>
								)}
							</FormField>
						)}
						{licensedPhlebotomistCollapse ===
							RadioOptionsLabel.YES && (
							<FormField
								name="trainExistingStaff"
								label="Would you like to train your existing staff in phlebotomy?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
							>
								<div className="d-flex">
									{OptionsLabel.map((option, index) => (
										<FormRadioGroup
											name={'trainExistingStaff'}
											register={register}
											value={option}
											required={false}
											key={index}
										/>
									))}
								</div>
							</FormField>
						)}
						{trainExistingStaffCollapse ===
							RadioOptionsLabel.YES && (
							<FormField
								name="offerClia"
								label="Would you like to offer CLIA waived point of care testing
                                services to the general public (Strep, HIV, UTI, Flu, A1c, Blood Pressure, etc)?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
							>
								<div className="d-flex">
									{OptionsLabel.map((option, index) => (
										<FormRadioGroup
											name={'offerClia'}
											register={register}
											value={option}
											required={false}
											key={index}
										/>
									))}
								</div>
							</FormField>
						)}
						{offerCliaCollapse === RadioOptionsLabel.YES && (
							<FormField
								name="isCliaWaivedSite"
								label="Is your business a CLIA WAIVED site?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
							>
								<div className="d-flex">
									{OptionsLabel.map((option, index) => (
										<FormRadioGroup
											name={'isCliaWaivedSite'}
											register={register}
											value={option}
											required={false}
											key={index}
										/>
									))}
								</div>
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
							</FormField>
						)}						
					</Col>
				</Row>
				<div className='footer'>
					<Button
						type="submit"
						disabled={!isDirty}
					>
						Next
					</Button>
				</div>
			</Form>
		</Container>
	)
}
