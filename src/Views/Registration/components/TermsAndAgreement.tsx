import { useState } from 'react'
import {
	Button,
	ContentHeader,
	Form,
	FormField,
	FormCheckBox,
} from 'components'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useMatch, useNavigate } from 'react-router-dom'
import { ITermsInfo } from '../types'

interface TermsAndAgreementProps {
	onSubmit: (...args: any[]) => void
	termsInfo: ITermsInfo | undefined
	setTermsInfo: (value: ITermsInfo) => void
}

export const TermsAndAgreement = ({
	onSubmit,
	termsInfo,
	setTermsInfo,
}: TermsAndAgreementProps) => {
	const match = useMatch('registration/*')
	const navigate = useNavigate()

	const initialValues: ITermsInfo = {
		general: false,
		techUsage: false,
		bankAccountUsage: false,
	}

	const useFormInstance = useForm({
		defaultValues: initialValues,
	})

	const { getValues, register, watch } = useFormInstance

	const handleSubmit = async (values: any) => {
		const formValues = getValues()
		setTermsInfo(formValues)
		onSubmit()
		navigate(`${match?.pathnameBase}/success`)
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
								I agree nd accept the{' '}
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
					<Button
						type="submit"
						disabled={allTermsHasFalse}
						className="col-lg-auto pull-right"
					>
						Agree & Proceed
					</Button>
				</div>
			</Form>
		</Container>
	)
}
