import {
	SideNav,
	Form,
	FormField,
	FormTextInput,
	SubmitButton,
} from 'components'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

export const ForgotPassword = () => {
	const navigate = useNavigate()
	
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('Email address is required')
			.email('Must be a valid email address'),
	})
	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {},
	})

	const {
		register,
		formState: { isDirty, isSubmitting },
	} = useFormInstance

	const handleSubmit = () => {
		console.log('test')
		navigate('/user/verify-email')
	}

	return (
		<>
			<Container fluid className="v-middle">
				<Row className="justify-content-center align-items-center vh-100">
					<Col lg={6}>
						<h3 className="mb-5 text-center">Forgot Password</h3>
						<p className="text-center mb-5">
							Please enter the MakoRx Complete Care employer
							e-mail address that you registered with.
						</p>
						<Row className="justify-content-center">
							<Col lg={6}>
								<Form
									useFormInstance={useFormInstance}
									onSubmit={handleSubmit}
								>
									<FormField
										name="email"
										className="text-left pb-3"
									>
										<FormTextInput
											placeholder="Email Address"
											name="email"
											register={register}
										/>
									</FormField>
									<div className="text-center">
										<SubmitButton
											pending={isSubmitting}
											pendingText="Submitting"
											disabled={!isDirty || isSubmitting}
										>
											Submit
										</SubmitButton>
									</div>
								</Form>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	)
}
