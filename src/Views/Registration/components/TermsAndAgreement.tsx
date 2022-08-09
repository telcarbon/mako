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
		general: false,
		techUsage: false,
		bankAccountUsage: false,
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
		// return promise that resolves after 2 seconds
		return new Promise((resolve) => {
			setTimeout(() => {
				const formValues = getValues()
				setTermsInfo(formValues)
				onSubmit()
			}, 2000)
		})
	}

	const allTermsHasFalse = watch([
		'general',
		'techUsage',
		'bankAccountUsage',
	]).includes(false)

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
								name="general"
								register={register}
								value={'hasAgreeToTerms'}
							>
								I agree and accept the{' '}
								<a
									className="link-secondary"
									href="http://google.com"
									target="_blank"
								>
									general terms and conditions
								</a>
								.
							</FormCheckBox>
							<FormCheckBox
								name="techUsage"
								register={register}
								value={'techUsage'}
								className="my-2"
							>
								I agree and accept the{' '}
								<a
									className="link-secondary"
									href="http://google.com"
									target="_blank"
								>
									MakoRX technical usage terms and conditions
								</a>
								.
							</FormCheckBox>
							<FormCheckBox
								name="bankAccountUsage"
								register={register}
								value={'bankAccountUsage'}
								className="my-2"
							>
								I agree and accept the{' '}
								<a
									className="link-secondary"
									href="http://google.com"
									target="_blank"
								>
									MakoRX bank account information usage terms
									and conditions
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
