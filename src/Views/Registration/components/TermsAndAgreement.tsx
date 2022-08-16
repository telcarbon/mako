import {
	Button,
	ContentHeader,
	Form,
	FormCheckBox,
	FormField,
	SubmitButton,
} from 'components'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BASE_URL } from 'shared/config'
import { ITermsInfo } from '../types'

interface TermsAndAgreementProps {
	onSubmit: (...args: any[]) => void
	setTermsInfo: (value: ITermsInfo) => void
}

export const TermsAndAgreement = ({
	onSubmit,
	setTermsInfo,
}: TermsAndAgreementProps) => {
	const initialValues: ITermsInfo = {
		termsOfUse: false,
		privacyStatement: false,
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

	const allTermsHasFalse = watch(['termsOfUse', 'privacyStatement']).includes(
		false
	)

	return (
		<Container fluid>
			<ContentHeader
				title="Terms & Agreement"
				backText="Back"
				backLink={-1}
			/>
			<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
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
									href={`${BASE_URL}/static/pdf/MakoRx_CareConnect_CareCheckIn_Terms_of_Use_8.9.22.pdf`}
									target="_blank"
								>
									MakoRx Care Check-In Terms of Use
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
									href={`${BASE_URL}/static/pdf/MakoRx_Privacy_Statement_8.9.22.pdf`}
									target="_blank"
								>
									MakoRx Privacy Statement
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
	)
}
