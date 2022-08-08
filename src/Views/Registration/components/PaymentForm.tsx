import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement
} from '@stripe/react-stripe-js'
import { FormField } from 'components'
import { StripeFields } from '../types'

const inputStyle = {
	iconColor: '#334c6e',
	fontWeight: '400',
	fontSize: '16px',
}

interface PaymentFormProps {
	onSubmit?: (...args: any[]) => void
	setStripeToken: (...args: any[]) => void
	setStripeErrors: (...args: any[]) => void
	setStripeValid: (...args: any[]) => void
	stripeErrors: any
	stripeValid: any
}

export const PaymentForm = ({
	onSubmit,
	setStripeToken,
	setStripeErrors,
	stripeErrors,
	setStripeValid,
	stripeValid,
}: PaymentFormProps) => {
	const stripeErrorSetter = (
		message: string | undefined,
		type: StripeFields
	): void => setStripeErrors({ ...stripeErrors, [type]: message })

	const stripeValidSetter = (value: boolean, type: StripeFields): void =>
		setStripeValid({ ...stripeValid, [type]: value })

	const validation = (
		error: any,
		complete: boolean,
		type: StripeFields
	): void => {
		stripeErrorSetter(error?.message, type)
		if (error === undefined && complete) {
			stripeValidSetter(true, type)
		} else {
			stripeValidSetter(false, type)
		}
	}

	const isError = (type: StripeFields) => !!stripeErrors[type]

	return (
		<>
			<FormField name="creditCard" label="Credit Card">
				<CardNumberElement
					id="cardNumber"
					className="form-control"
					options={{
						style: {
							base: inputStyle,
						},
						showIcon: true,
					}}
					onChange={(e) => {
						const { error, complete } = e
						validation(error, complete, StripeFields.CARD_NUMBER)
					}}
				/>
				<small className="text-danger px-1">
					{isError(StripeFields.CARD_NUMBER) &&
						stripeErrors[StripeFields.CARD_NUMBER]}
				</small>
			</FormField>
			<FormField name="expiry">
				<CardExpiryElement
					className="form-control"
					onChange={(e) => {
						const { error, complete } = e
						validation(
							error,
							complete,
							StripeFields.CARD_EXPIRY_DATE
						)
					}}
					options={{
						style: {
							base: inputStyle,
						},
					}}
				/>
				<small className="text-danger px-1">
					{isError(StripeFields.CARD_EXPIRY_DATE) &&
						stripeErrors[StripeFields.CARD_EXPIRY_DATE]}
				</small>
			</FormField>
			<FormField name="cvc">
				<CardCvcElement
					className="form-control"
					onChange={(e) => {
						const { error, complete } = e
						validation(
							error,
							complete,
							StripeFields.CARD_CVC_NUMBER
						)
					}}
					options={{
						style: {
							base: inputStyle,
						},
					}}
				/>
				<small className="text-danger p-1">
					{isError(StripeFields.CARD_CVC_NUMBER) &&
						stripeErrors[StripeFields.CARD_CVC_NUMBER]}
				</small>
			</FormField>
		</>
	)
}
