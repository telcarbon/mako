import { useState } from 'react'
import { Button, ContentHeader, Form, FormField, FormCheckBox } from 'components'
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
		// resolver: yupResolver(validationSchema),
		defaultValues: initialValues,
	})

	const {
		getValues,
		register,
		formState: { isDirty },
	} = useFormInstance

	const handleSubmit = async (values: any) => {
		const formValues = getValues()
		console.log(formValues)
		setTermsInfo(formValues)
		onSubmit()
		navigate(`${match?.pathnameBase}/success`)
	}

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
								I agree to the general terms and agreement
							</FormCheckBox>
							<FormCheckBox
								name="techUsage"
								register={register}
								value={'techUsage'}
								className="my-2"
							>
								I agree to the Tech Usage agreement
							</FormCheckBox>
							<FormCheckBox
								name="bankAccountUsage"
								register={register}
								value={'bankAccountUsage'}
								className="my-2"
							>
								I agree to the Bank Account Usage agreement
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
						disabled={!isDirty}
						className="col-lg-auto pull-right"
					>
						Agree & Proceed
					</Button>
				</div>
			</Form>
		</Container>
	)
}
