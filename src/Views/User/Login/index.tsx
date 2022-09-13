import {
	ContentHeader,
	Form,
	FormField,
	FormTextInput,
	SubmitButton,
} from 'components'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
	const navigate = useNavigate()

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('Email address is required')
			.email('Must be a valid email address'),
		password: Yup.string().required('Password is required'),
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
	}

	return (
		<>
			<Container fluid className="v-middle">
				<Row className="justify-content-center align-items-center vh-100">
					<Col lg={3}>
						<ContentHeader title="Welcome Back" />
						<Form
							useFormInstance={useFormInstance}
							onSubmit={handleSubmit}
						>
							<FormField name="email" className="text-left">
								<FormTextInput
									placeholder="Email Address"
									name="email"
									register={register}
								/>
							</FormField>
							<FormField name="password">
								<FormTextInput
									placeholder="Password"
									name="password"
									register={register}
								/>
							</FormField>
							<div className="text-center">
								<Link
									to={'/user/forgot-password'}
									className="pt-3 pb-5 h6 text-dark d-block text-decoration-none"
								>
									Forgot Password?
								</Link>
								<SubmitButton
									pending={isSubmitting}
									pendingText="Submitting"
									disabled={!isDirty || isSubmitting}
								>
									Log in
								</SubmitButton>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	)
}
