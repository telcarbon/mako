import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ContentHeader } from 'components/ContentHeader'
import { Container, Row, Col, ProgressBar, Tabs, Tab } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {
	Button,
	Form,
	FormField,
	FormSearchSelect,
	FormTextInput,
} from 'components'
import { useMatch, useNavigate } from 'react-router-dom'
import { bankingTypeOptions, IBankDetailsInfo } from '../types'
import { isNumericDigits, yupShortTest } from 'common/Util'
import { loadStripe } from '@stripe/stripe-js'
import {
	CardNumberElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import { PaymentForm } from './PaymentForm'
import stripeLogo from 'assets/images/stripe.png'

interface IBankingInfoProps {
	bankingInfo: IBankDetailsInfo | undefined
	setBankingInfo: (value: IBankDetailsInfo) => void
	setCurrentStep: (value: Number) => void
	setStripeToken: (value: any) => void
}

export const BankingInfo = ({
	bankingInfo,
	setBankingInfo,
	setCurrentStep,
	setStripeToken,
}: IBankingInfoProps) => {
	const match = useMatch('registration/*')
	const navigate = useNavigate()
	const stripe = useStripe()
	const elements = useElements()
	const [tabKey, setTabKey] = useState<string>('bank')
	console.log(tabKey)

	const validationSchema = Yup.object().shape({
		bankName: Yup.string().required('Bank Name is required'),
		bankAccountType: Yup.string()
			.required('Please select an option')
			.nullable(),
		accountName: Yup.string().required('Account Name is required'),
		accountNumber: Yup.string()
			.required('Account Number is required')
			.test('numeric-test', 'Numeric digits only', function (value) {
				return yupShortTest(value, isNumericDigits(value))
			}),
		abaRoutingNumber: Yup.string()
			.required('ABA Routing Number is required')
			.test('numeric-test', 'Numeric digits only', function (value) {
				return yupShortTest(value, isNumericDigits(value))
			}),
	})

	const useFormInstance = useForm({
		resolver: tabKey === 'bank' ? yupResolver(validationSchema) : undefined,
		defaultValues: bankingInfo,
	})

	const {
		getValues,
		register,
		formState: { isDirty },
		control,
	} = useFormInstance

	const [stripeErrors, setStripeErrors] = useState({
		cardNumber: undefined,
		cardCVCNumber: undefined,
		cardExpiryDate: undefined,
	})

	const hasStripeErrors = () =>
		Object.values(stripeErrors).every((value) => {
			return value === undefined
		})

	async function handleStripeTokenSubmit(e: any) {
		const cardNumberElement = elements?.getElement(CardNumberElement)!
		// const cardExpiryElement = elements?.getElement(CardExpiryElement)!
		// const cardCvcElement = elements?.getElement(CardCvcElement)!

		if (hasStripeErrors()) {
			try {
				stripe
					?.createToken(cardNumberElement)
					.then((result) => {
						setStripeToken(result.token?.id)
						console.log(result.token?.id)
					})
					.catch((err) => {
						console.log('stripe post error', err)
					})
			} catch (ex) {
				console.log('try error', ex)
			}
		}
	}

	const handleSubmit = async (values: any) => {
		if (tabKey === 'bank') {
			const formValues = getValues()
			setBankingInfo(formValues)
		} else {
			handleStripeTokenSubmit
		}
		setCurrentStep(3)
		navigate(`${match?.pathnameBase}/business-questionnaire`)
	}

	return (
		<>
			<Container fluid>
				<ContentHeader
					title="Banking Information"
					subtitle="Enter either of the following"
					backText="Back"
					backLink={-1}
				/>
				<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
					<Row className="justify-content-center mb-5">
						<Col lg={12}>
							<Row className="justify-content-center">
								<Col lg={10}>
									<Tabs
										id="controlled-tab-example"
										activeKey={tabKey}
										onSelect={(key: any) => setTabKey(key)}
										className="mb-3"
									>
										<Tab
											eventKey="bank"
											title="Bank Account"
										>
											<Col
												lg={6}
												className="card border-2 border-dark rounded-2 m-auto"
											>
												<div className="card-body d-flex flex-column">
													<FormField
														name="bankName"
														label="Bank Account"
													>
														<FormTextInput
															placeholder="Bank Name"
															name="bankName"
															register={register}
														/>
													</FormField>
													<FormField name="bankAccountType">
														<FormSearchSelect
															name="bankAccountType"
															register={register}
															placeholder="Bank Account Type"
															control={control}
															options={
																bankingTypeOptions
															}
														/>
													</FormField>
													<FormField name="accountName">
														<FormTextInput
															placeholder="Account Name"
															name="accountName"
															register={register}
														/>
													</FormField>
													<FormField name="accountNumber">
														<FormTextInput
															placeholder="Account Number"
															name="accountNumber"
															register={register}
														/>
													</FormField>
													<FormField name="abaRoutingNumber">
														<FormTextInput
															placeholder="ABA Routing Number"
															name="abaRoutingNumber"
															register={register}
														/>
													</FormField>
												</div>
											</Col>
										</Tab>
										<Tab
											eventKey="credit"
											title="Credit Card"
										>
											<Col
												lg={6}
												className="card border-2 border-dark rounded-2 m-auto"
											>
												<div className="card-body d-flex flex-column">
													<PaymentForm
														setStripeToken={
															setStripeToken
														}
														setStripeErrors={
															setStripeErrors
														}
														stripeErrors={
															stripeErrors
														}
													/>
													<img
														src={stripeLogo}
														alt="logo"
														className="img-fluid mt-auto w-25 align-self-center"
													/>
												</div>
											</Col>
										</Tab>
									</Tabs>
								</Col>
							</Row>
						</Col>
					</Row>
					<div className="footer w-75">
						<ProgressBar
							variant="secondary"
							now={60}
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
