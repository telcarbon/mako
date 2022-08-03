import React, { useState } from 'react'
import {
	Elements,
	CardElement,
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import { Form, FormField } from 'components'
import axios from 'axios'

const inputStyle = {
	iconColor: '#334c6e',
	fontWeight: '400',
	fontSize: '16px',
}

export const PaymentForm = () => {
	const stripe = useStripe()
	const elements = useElements()
	const [success, setSuccess] = useState(false)

	const [cvcError, setCvcError] = useState('')
	const [cardCvcElementError, setCardCvcElementError] = useState('')

	async function handleSubmit(e: any) {
		const cardNumberElement = elements?.getElement(CardNumberElement)!
		const cardExpiryElement = elements?.getElement(CardExpiryElement)!
		const cardCvcElement = elements?.getElement(CardCvcElement)!

		// stripe?.createToken(cardNumberElement).then(function (result) {
		// 	console.log(result)
		// })
		// const {error, token} = await stripe?.createToken(cardNumberElement);

		stripe
			?.createToken(cardNumberElement)
			.then((result) => {
				console.log(result)
			})
			.catch((err) => {
				setCardCvcElementError(err.message)
			})
	}

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
					/>
				</FormField>
				<FormField name="expiry">
					<CardExpiryElement
						className="form-control"
						options={{
							style: {
								base: inputStyle,
							},
						}}
					/>
				</FormField>
				<FormField name="cvc">
					<CardCvcElement
						className="form-control"
						options={{
							style: {
								base: inputStyle,
							},
						}}
					/>
				</FormField>
				<span>{cardCvcElementError}</span>
				<button type="button" onClick={handleSubmit}>
					save
				</button>
			</form>
		</>
	)
}
