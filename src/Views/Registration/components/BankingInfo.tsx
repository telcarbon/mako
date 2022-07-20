import React from 'react'
import { useForm } from 'react-hook-form'
import { ContentHeader } from 'components/ContentHeader'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
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
import { bankingTypeOptions } from '../types'

export const BankingInfo = () => {
	const match = useMatch('registration/*')
	const navigate = useNavigate()

	const validationSchema = Yup.object().shape({
		nameOnCreditCard: Yup.string().required(
			'Name on Credit Card is required'
		),
		creditCardNumber: Yup.string().required(
			'Credit Card Number is required'
		),
		expiration: Yup.string().required('Expiration Date is required'),
		bankName: Yup.string().required('Bank Name is required'),
		bankAccountType: Yup.string()
			.required('Please select an option')
			.nullable(),
		accountName: Yup.string().required('Account Name is required'),
		accountNumber: Yup.string().required('Account Number is required'),
		abaRoutingNumber: Yup.string().required(
			'ABA Routing Number is required'
		),
	})

	const initialValues = {
		nameOnCreditCard: '',
		creditCardNumber: '',
		expiration: '',
		bankName: '',
		bankAccountType: '',
		accountName: '',
		accountNumber: '',
		abaRoutingNumber: '',
	}

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: initialValues,
	})

	const {
		getValues,
		register,
		formState: { isDirty },
		watch,
		control,
	} = useFormInstance

	const handleSubmit = async (values: any) => {
		console.log(getValues(), 'values')
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
								<Col
									lg={5}
									className="d-flex align-items-stretch card border-2 border-dark rounded-2"
								>
									{/* <div className="card border-2 border-dark rounded-2"> */}
									<div className="card-body d-flex flex-column">
										<FormField
											name="creditCardNumber"
											label="Credit Card"
										>
											<FormTextInput
												placeholder="Credit Card Number"
												name="creditCardNumber"
												register={register}
											/>
										</FormField>
										<FormField name="nameOnCreditCard">
											<FormTextInput
												placeholder="Name on Credit Card"
												name="nameOnCreditCard"
												register={register}
											/>
										</FormField>
										<FormField name="expiration">
											<FormTextInput
												placeholder="Expiration Date"
												name="expiration"
												register={register}
											/>
										</FormField>
										{/* </div> */}
									</div>
								</Col>
								<Col
									lg={5}
									className="d-flex align-items-stretch card border-2 border-dark rounded-2"
								>
									{/* <div className="card border-2 border-dark rounded-2 w-100"> */}
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
												options={bankingTypeOptions}
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
									{/* </div> */}
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
							disabled={!isDirty}
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
