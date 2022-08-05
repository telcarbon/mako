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
	setStripeToken: (...args: any[]) => void
	setStripeErrors: (...args: any[]) => void
	stripeErrors: any
}

export const PaymentForm = ({
	onSubmit,
	setStripeToken,
	setStripeErrors,
	stripeErrors,
}: PaymentFormProps) => {
	const stripe = useStripe()
	const elements = useElements()

	const stripeValidationSetter = (
		message: string | undefined,
		type: StripeFields
	): void => setStripeErrors({ ...stripeErrors, [type]: message })

	const isError = (type: StripeFields) => !!stripeErrors[type]

	return (
		<>
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
		</>
	)
}
