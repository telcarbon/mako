import { yupResolver } from '@hookform/resolvers/yup'
import {
	CardNumberElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import stripeLogo from 'assets/images/stripe.png'
import {
	checkObjectIfComplete,
	disableUrlType,
	isNumericDigits,
	yupShortTest,
} from 'common/Util'
import { Variety } from 'common/Variety'
import {
	Button,
	Form,
	FormField,
	FormSearchSelect,
	FormTextInput,
	LoadingMaskWrap,
	SubmitButton,
} from 'components'
import { ContentHeader } from 'components/ContentHeader'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { bankingTypeOptions, IBankDetailsInfo } from '../types'
import { PaymentForm } from './PaymentForm'

interface IBankingInfoProps {
	bankingInfo: IBankDetailsInfo | undefined
	setBankingInfo: (value: IBankDetailsInfo) => void
	setCurrentStep: (value: Number) => void
	setStripeToken: (value: any) => void
	stripeToken: any
	currentStep: Number
}

export const BankingInfo = ({
	bankingInfo,
	setBankingInfo,
	setCurrentStep,
	setStripeToken,
	stripeToken,
	currentStep,
}: IBankingInfoProps) => {
	const navigate = useNavigate()
	const stripe = useStripe()
	const elements = useElements()
	const [tabKey, setTabKey] = useState<string>('bank')
	const [isStripeSubmitting, setIsStripeSubmitting] = useState<boolean>(false)
	const [isDataSubmitting, setIsDataSubmitting] = useState<boolean>(false)
	const [isBankSubmitting, setIsBankSubmitting] = useState<boolean>(false)

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
			})
			.length(9, 'ABA Routing Number cannot exceed 9 numeric digits'),
	})

	const useFormInstance = useForm({
		resolver: tabKey === 'bank' ? yupResolver(validationSchema) : undefined,
		defaultValues: bankingInfo,
	})

	const {
		getValues,
		register,
		formState: { isDirty, isSubmitting, isValid },
		control,
	} = useFormInstance

	// NOTE: REFACTOR \/

	useEffect(() => {
		disableUrlType(2, navigate, currentStep)
	}, [currentStep])

	const [stripeErrors, setStripeErrors] = useState({
		cardNumber: undefined,
		cardCVCNumber: undefined,
		cardExpiryDate: undefined,
	})

	const [stripeValid, setStripeValid] = useState({
		cardNumber: false,
		cardCVCNumber: false,
		cardExpiryDate: false,
	})

	// END: REFACTOR

	const hasStripeErrors = () =>
		Object.values(stripeErrors).every((value) => {
			return value === undefined
		})

	const isStripeFieldsValid = () =>
		Object.values(stripeValid).every((value) => {
			return value === true
		})

	async function handleStripeTokenSubmit() {
		const cardNumberElement = elements?.getElement(CardNumberElement)!
		setIsStripeSubmitting(true)
		if (hasStripeErrors()) {
			try {
				stripe
					?.createToken(cardNumberElement)
					.then((result) => {
						setTimeout(() => {
							setStripeToken(result.token?.id)
							console.log(result, 'token')
							setIsStripeSubmitting(false)
						}, 1000)
					})
					.catch((err) => {
						console.log('stripe post error', err)
					})
			} catch (ex) {
				console.log('try error', ex)
			}
		}
	}

	const checkProceedByCC = () => {
		return stripeToken ? true : isStripeFieldsValid() ? false : true
	}

	const handleSubmit = async (values: any) => {
		return new Promise(() => {
			setTimeout(() => {
				const formValues = getValues()
				setBankingInfo(formValues)
				setIsBankSubmitting(false)
			}, 1000)
			setIsBankSubmitting(true)
		})
	}

	const handleNext = async () => {
		const checkBank = checkObjectIfComplete(bankingInfo)
		const checkCredit = checkProceedByCC()

		if (checkBank || checkCredit) {
			return new Promise(() => {
				setIsDataSubmitting(true)
				setTimeout(() => {
					setCurrentStep(3)
					navigate('/business-questionnaire')
				}, 1000)
			})
		}
	}

	const handleDisable = () => {
		return ![
			stripeToken === '',
			!checkObjectIfComplete(bankingInfo) && !isValid,
		].includes(false)
	}

	return (
		<>
			{currentStep === 2 && (
				<Container fluid className="banking-info">
					<ContentHeader
						title="Banking Information"
						subtitle="Enter either of the following"
						backText="Back"
						backLink={-1}
					/>
					<Form
						useFormInstance={useFormInstance}
						onSubmit={handleSubmit}
					>
						<Row className="justify-content-center mb-5">
							<Col lg={10}>
								<div className="card border-0">
									<div className="mb-5 m-auto button-tab">
										<Button
											variety={
												tabKey === 'bank'
													? Variety.Secondary
													: Variety.Primary
											}
											onClick={() => setTabKey('bank')}
											className="me-3"
										>
											Bank
										</Button>
										<Button
											variety={
												tabKey !== 'bank'
													? Variety.Secondary
													: Variety.Primary
											}
											onClick={() => setTabKey('credit')}
										>
											Credit
										</Button>
									</div>
									<Row className="justify-content-center">
										<Col
											lg={6}
											className={`card border-2 border-dark rounded-2 m-auto ${
												tabKey === 'bank'
													? 'd-block'
													: 'd-none'
											}`}
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
														type="number"
													/>
												</FormField>
												<FormField name="abaRoutingNumber">
													<FormTextInput
														placeholder="ABA Routing Number"
														name="abaRoutingNumber"
														register={register}
														type="number"
													/>
												</FormField>
												<SubmitButton
													pending={isBankSubmitting}
													pendingText="Saving"
													className="col-lg-auto m-auto"
													disabled={!isDirty}
												>
													Save
												</SubmitButton>
											</div>
										</Col>
										<Col
											lg={6}
											className={`card border-2 border-dark rounded-2 m-auto ${
												tabKey === 'credit'
													? 'd-block'
													: 'd-none'
											}`}
										>
											<div className="card-body d-flex flex-column">
												<PaymentForm
													setStripeToken={
														setStripeToken
													}
													setStripeErrors={
														setStripeErrors
													}
													stripeErrors={stripeErrors}
													setStripeValid={
														setStripeValid
													}
													stripeValid={stripeValid}
												/>
												<SubmitButton
													pending={isStripeSubmitting}
													pendingText="Saving"
													className="col-lg-auto mx-auto"
													disabled={
														!isStripeFieldsValid()
													}
													onClick={async () => {
														await handleStripeTokenSubmit()
													}}
													type="button"
												>
													Save
												</SubmitButton>
												<img
													src={stripeLogo}
													alt="logo"
													className="img-fluid mt-auto w-25 align-self-center"
												/>
											</div>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
						<div className="footer w-75">
							<ProgressBar
								variant="secondary"
								now={60}
								className="col-lg-7 pull-left mt-3"
							/>
							<SubmitButton
								pending={isDataSubmitting}
								pendingText="Saving"
								disabled={handleDisable()}
								onClick={() => handleNext()}
								className="col-lg-auto pull-right"
								type="button"
							>
								Next
							</SubmitButton>
						</div>
					</Form>
				</Container>
			)}
			{(isDataSubmitting || isStripeSubmitting || isBankSubmitting) && (
				<LoadingMaskWrap />
			)}
		</>
	)
}
