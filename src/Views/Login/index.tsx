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

export const Login = () => {
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
		getValues,
		register,
		formState: { isDirty, isSubmitting, isValid },
		watch,
		control,
	} = useFormInstance

	const handleSubmit = () => {
		console.log('test')
	}

	return (
		<>
			<SideNav className="fixed-top" hasContactInfo hasRegisterLink />
			<Container fluid className="v-middle">
				<Row className="justify-content-center align-items-center vh-100">
					<Col lg={3}>
						<h5 className="mb-5 text-center">Welcome Back</h5>
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
								<h6 className="pt-3 pb-5">Forgot Password?</h6>
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
