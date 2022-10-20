import { disableUrlType } from 'common/Util'
import {
	Button,
	ContentHeader,
	Form,
	FormCheckBox,
	FormField,
	LoadingMaskWrap,
	SubmitButton,
} from 'components'
import { useEffect } from 'react'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from 'shared/config'
import { ITermsInfo } from '../types'

interface TermsAndAgreementProps {
	onSubmit: (...args: any[]) => void
	setTermsInfo: (value: ITermsInfo) => void
	setCurrentStep: (value: Number) => void
	currentStep: Number
}

export const TermsAndAgreement = ({
	onSubmit,
	setTermsInfo,
	setCurrentStep,
	currentStep,
}: TermsAndAgreementProps) => {
	const navigate = useNavigate()

	const initialValues: ITermsInfo = {
		termsOfUse: false,
		privacyStatement: false,
		pharmacyPrivacy: false,
	}

	const useFormInstance = useForm({
		defaultValues: initialValues,
	})

	const {
		getValues,
		register,
		watch,
		formState: { isSubmitting },
	} = useFormInstance

	const handleSubmit = async (values: any) => {
		return new Promise(() => {
			setTimeout(() => {
				const formValues = getValues()
				setTermsInfo(formValues)
				onSubmit()
			}, 1000)
		})
	}

	const allTermsHasFalse = watch([
		'termsOfUse',
		'privacyStatement',
		'pharmacyPrivacy',
	]).includes(false)

	useEffect(() => {
		disableUrlType(4, navigate, currentStep)
	}, [])

	return (
		<>
			{currentStep === 4 && (
				<Container fluid>
					<ContentHeader
						title="Terms & Agreement"
						backText="Back"
						backLink={-1}
					/>
					<Form
						useFormInstance={useFormInstance}
						onSubmit={handleSubmit}
					>
						<Row className="justify-content-center mb-5">
							<Col lg={10}>
								<FormField name="terms">
									<FormCheckBox
										name="termsOfUse"
										register={register}
										value={'termsOfUse'}
									>
										I agree and accept the{' '}
										<a
											className="link-secondary"
											href={`${BASE_URL}/static/pdf/MakoRx_CareConnect_CareCheckIn_Terms_of_Use_9.29.22.pdf`}
											target="_blank"
										>
											MakoRX Care Connect Care Check-In
											Terms Of Use
										</a>
										.
									</FormCheckBox>
									<FormCheckBox
										name="privacyStatement"
										register={register}
										value={'privacyStatement'}
										className="my-2"
									>
										I agree and accept the{' '}
										<a
											className="link-secondary"
											href={`${BASE_URL}/static/pdf/MakoRx_Privacy_Statement_Care Connect_Check in Tablet_9.29.22.pdf`}
											target="_blank"
										>
											MakoRX Privacy Statement Care
											Connect Care Check-In
										</a>
										.
									</FormCheckBox>
									<FormCheckBox
										name="pharmacyPrivacy"
										register={register}
										value={'pharmacyPrivacy'}
									>
										I agree and accept the{' '}
										<a
											className="link-secondary"
											href={`${BASE_URL}/static/pdf/MakoRx_CareCheckIn_PharmacyAgreement_9.29.22.pdf`}
											target="_blank"
										>
											MakoRx Care Check-In Pharmacy
											Agreement
										</a>
										.
									</FormCheckBox>
								</FormField>
							</Col>
						</Row>
						<div className="footer w-75">
							<ProgressBar
								variant="secondary"
								now={100}
								className="col-lg-7 pull-left mt-3"
							/>
							<SubmitButton
								pending={isSubmitting}
								pendingText="Submitting"
								className="col-lg-auto pull-right"
								disabled={allTermsHasFalse || isSubmitting}
							>
								Agree & Proceed
							</SubmitButton>
						</div>
					</Form>
				</Container>
			)}
			{isSubmitting && <LoadingMaskWrap />}
		</>
	)
}
