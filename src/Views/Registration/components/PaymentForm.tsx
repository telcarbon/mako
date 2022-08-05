import React, { useState } from 'react'
import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import { Button, Form, FormField } from 'components'
import { StripeFields } from '../types'

const inputStyle = {
	iconColor: '#334c6e',
	fontWeight: '400',
	fontSize: '16px',
}

interface PaymentFormProps {
	onSubmit?: (...args: any[]) => void
}

export const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
	const stripe = useStripe()
	const elements = useElements()

	const [stripeErrors, setStripeErrors] = useState({
		cardNumber: undefined,
		cardCVCNumber: undefined,
		cardExpiryDate: undefined,
	})

	const hasStripeErrors = () =>
		Object.values(stripeErrors).every((value) => {
			return value === undefined
		})

	async function handleSubmit(e: any) {
		const cardNumberElement = elements?.getElement(CardNumberElement)!
		// const cardExpiryElement = elements?.getElement(CardExpiryElement)!
		// const cardCvcElement = elements?.getElement(CardCvcElement)!

		if (hasStripeErrors()) {
			try {
				stripe
					?.createToken(cardNumberElement)
					.then((result) => {
						console.log(result)
					})
					.catch((err) => {
						console.log('stripe post error', err)
					})
			} catch (ex) {
				console.log('try error', ex)
			}
		}
	}

	const stripeValidationSetter = (
		message: string | undefined,
		type: StripeFields
	): void => setStripeErrors({ ...stripeErrors, [type]: message })

	const isError = (type: StripeFields) => !!stripeErrors[type]

	return (
		<>
			<form onSubmit={handleSubmit}>
				<FormField name="creditCard" label="Credit Card">
					<CardNumberElement
						className="form-control"
						options={{
							style: {
								base: inputStyle,
							},
							showIcon: true,
						}}
						onChange={(e) => {
							stripeValidationSetter(
								e.error?.message,
								StripeFields.CARD_NUMBER
							)
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
							stripeValidationSetter(
								e.error?.message,
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
							stripeValidationSetter(
								e.error?.message,
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
				<Button
					type="button"
					onClick={handleSubmit}
					className="pull-right"
				>
					Save
				</Button>
			</form>
		</>
	)
}
