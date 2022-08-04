import React, { useState } from 'react'
import {
	Elements,
	CardElement,
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
	useElements,
	useStripe,
	IbanElement,
} from '@stripe/react-stripe-js'
import { Form, FormField } from 'components'
import axios from 'axios'
import { StripeFields } from '../types'

const inputStyle = {
	iconColor: '#334c6e',
	fontWeight: '400',
	fontSize: '16px',
}

export const PaymentForm = () => {
	const stripe = useStripe()
	const elements = useElements()
	const [success, setSuccess] = useState(false)

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
						onChange={(e) => {
							stripeValidationSetter(
								e.error?.message,
								StripeFields.CARD_NUMBER
							)
						}}
						options={{
							style: {
								base: inputStyle,
							},
							showIcon: true,
						}}
					/>
					<div>
						{isError(StripeFields.CARD_NUMBER) &&
							stripeErrors[StripeFields.CARD_NUMBER]}
					</div>
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
					<div>
						{isError(StripeFields.CARD_EXPIRY_DATE) &&
							stripeErrors[StripeFields.CARD_EXPIRY_DATE]}
					</div>
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
					{isError(StripeFields.CARD_CVC_NUMBER) &&
						stripeErrors[StripeFields.CARD_CVC_NUMBER]}
				</FormField>
				<IbanElement></IbanElement>
				<button type="button" onClick={handleSubmit}>
					save
				</button>
			</form>
		</>
	)
}
