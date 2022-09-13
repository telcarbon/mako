import { Form, FormField, FormTextInput, SubmitButton } from 'components'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

export const ResetPassword = () => {
	const navigate = useNavigate()

	const validationSchema = Yup.object().shape({
		newPassword: Yup.string().required('Password is required'),
		confirmNewPassword: Yup.string().required('Password is required'),
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
		navigate('/user/reset-password-success')
	}

	return (
		<>
			<Container fluid className="v-middle">
				<Row className="justify-content-center align-items-center vh-100">
					<Col lg={3}>
						<h3 className="mb-5 text-center">
							Reset your Password
						</h3>
						<Form
							useFormInstance={useFormInstance}
							onSubmit={handleSubmit}
						>
							<FormField name="newPassword" className="text-left">
								<FormTextInput
									placeholder="New Password"
									name="newPassword"
									register={register}
									type="password"
								/>
							</FormField>
							<FormField name="confirmNewPassword">
								<FormTextInput
									placeholder="Confirm New Password"
									name="confirmNewPassword"
									register={register}
									type="password"
								/>
							</FormField>
							<div className="text-center pt-5">
								<SubmitButton
									pending={isSubmitting}
									pendingText="Submitting"
									disabled={!isDirty || isSubmitting}
								>
									Reset
								</SubmitButton>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	)
}
