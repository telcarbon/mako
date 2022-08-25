import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	Button,
	ContentHeader,
	Form,
	FormField,
	FormFileUpload,
	FormRadioGroup,
	FormTextInput,
	LoadingMaskWrap,
	SubmitButton,
} from 'components'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { IQuestionnareInfo } from '../types'

export const RadioLabelOptions = [
	{ value: true, name: 'YES' },
	{ value: false, name: 'NO' },
]

interface IBusinessQuestionnaireProps {
	businessQs: IQuestionnareInfo | undefined
	setBusinessQs: (value: IQuestionnareInfo) => void
	setCurrentStep: (value: Number) => void
}

export const BusinessQuestionnaire = ({
	businessQs,
	setBusinessQs,
	setCurrentStep,
}: IBusinessQuestionnaireProps) => {
	const navigate = useNavigate()
	const [selectedFile, setSelectedFile] = useState<string>('')
	const [uploadedPhotos, setUploadedPhotos] = useState<any[]>([])

	const validationSchema = Yup.object().shape({
		plebotomy: Yup.mixed().required('Please select an option').nullable(),

		licensed: Yup.mixed().when('plebotomy', {
			is: true,
			then: Yup.boolean().required('Please select an option').nullable(),
		}),
		phlebotomist: Yup.array().when('licensed', {
			is: true,
			then: Yup.array().of(
				Yup.object({
					phlebotomistName: Yup.string().required(
						'Phlebotomist Name is required'
					),
				})
			),
		}),
		trainExistingStaff: Yup.mixed().when('licensed', {
			is: true,
			then: Yup.boolean().required('Please select an option').nullable(),
		}),
		offerClia: Yup.mixed().required('Please select an option').nullable(),
		isCliaWaivedSite: Yup.mixed()
			.required('Please select an option')
			.nullable(),
		cliaCertification: Yup.mixed().when('isCliaWaivedSite', {
			is: true,
			then: Yup.mixed()
				.required('Please upload your CLIA Certificate')
				.nullable(),
		}),
		hasParkingLot: Yup.mixed()
			.required('Please select an option')
			.nullable(),
		offerPrescription: Yup.mixed()
			.required('Please select an option')
			.nullable(),
	})

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: businessQs,
	})

	const {
		getValues,
		register,
		formState: { isDirty, isSubmitting, isValid },
		watch,
		control,
		setValue,
	} = useFormInstance
	const q1Watch = watch('plebotomy')
	const q2Watch = watch('licensed')
	const q5Watch = watch('isCliaWaivedSite')

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
	}

	const handleRemove = (index: number | number[] | undefined) => {
		remove(index)
	}

	const handleSubmit = async (values: any) => {
		const formValues = getValues()
		setBusinessQs(formValues)
		return new Promise(() => {
			setTimeout(() => {
				navigate('/terms')
				setCurrentStep(4)
			}, 1000)
		})
	}

	useEffect(() => {
		if (q1Watch === true || q1Watch === null) {
			setValue('licensed', null)
		} else {
			setValue('licensed', false)
		}
	}, [q1Watch])

	useEffect(() => {
		if (q2Watch === true || q2Watch === null) {
			setValue('trainExistingStaff', null)
		} else {
			setValue('trainExistingStaff', false)
		}
	}, [q2Watch])

	return (
		<>
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
								name="plebotomy"
								label="Would you like to offer phlebotomy/blood draw services?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
							>
								<div className="d-flex">
									{RadioLabelOptions.map((option, index) => (
										<FormRadioGroup
											name={'plebotomy'}
											register={register}
											value={option.value}
											key={index}
										/>
									))}
								</div>
							</FormField>
							<FormField
								name="licensed"
								label="Do you have a licensed phlebotomist?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
								disabled={!q1Watch}
							>
								<div className="d-flex">
									{RadioLabelOptions.map((option, index) => (
										<FormRadioGroup
											name={'licensed'}
											register={register}
											value={option.value}
											key={index}
											disabled={!q1Watch}
										/>
									))}
								</div>
								{q2Watch && (
									<div style={{ flexBasis: '100%' }}>
										{fields.map((item, index) => {
											return (
												<FormField
													name={`phlebotomist[${index}].phlebotomistName`}
													key={item.id}
													className="col-lg-5 mb-2"
													isRadio
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
												</FormField>
											)
										})}
									</div>
								)}
							</FormField>
							<FormField
								name="trainExistingStaff"
								label="Would you like to train your existing staff in phlebotomy?"
								useWrapper={false}
								className="form-radio-wrap rounded-2 d-flex ps-3"
								isRadio
								disabled={!q1Watch || !q2Watch}
							>
								<div className="d-flex">
									{RadioLabelOptions.map((option, index) => (
										<FormRadioGroup
											name={'trainExistingStaff'}
											register={register}
											value={option.value}
											key={index}
											disabled={!q1Watch || !q2Watch}
										/>
									))}
								</div>
							</FormField>
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
								{q5Watch && (
									<div style={{ flexBasis: '100%' }}>
										<FormField name="cliaCertification">
											<FormFileUpload
												name="cliaCertification"
												register={register}
												label="Upload CLIA certification"
												className="col-lg-5"
												// reset={setValue('cliaCertification', [])}
												// onChange={(e) => setValue('cliaCertification', e?.target?.files[0])}
											/>
										</FormField>
									</div>
								)}
							</FormField>
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
						</Col>
					</Row>
					<div className="footer w-75">
						<ProgressBar
							variant="secondary"
							now={80}
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
			</Container>
			{isSubmitting && <LoadingMaskWrap />}
		</>
	)
}
