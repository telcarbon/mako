import {
	ContentHeader,
	Form,
	FormField,
	FormTextInput,
	LoadingMaskWrap,
	SubmitButton,
} from 'components'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL, TOKEN } from 'shared/config'
import axios from 'axios'
import { useContext, useState } from 'react'
import { UserContext } from 'App'

export const Login = () => {
	const navigate = useNavigate()
	const [apiError, setApiError] = useState<string>('')

	const { setAccessToken } = useContext(UserContext)

	const validationSchema = Yup.object().shape({
		username: Yup.string().required('Username is required'),
		password: Yup.string().required('Password is required'),
	})
	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const {
		register,
		formState: { isDirty, isSubmitting },
		getValues,
	} = useFormInstance

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${TOKEN}`,
	}

	const handleSubmit = async () => {
		const value = getValues()
		const params = {
			username: value.username,
			password: value.password,
		}

		axios
			.post(`${BASE_URL}/token/obtain/`, params, {
				headers,
			})
			.then((response) => {
				console.log(response.data.access, ' response')
				localStorage.setItem('accessToken', response.data.access)
				setAccessToken(response.data.access)
				navigate('/booking')
			})
			.catch((error) => {
				setApiError(error?.response?.data?.detail)
			})
	}

	return (
		<>
			<Container fluid className="v-middle">
				<Row className="justify-content-center align-items-center vh-100">
					<Col lg={3}>
						<ContentHeader title="Welcome Back" />
						{apiError && <Alert variant="danger">{apiError}</Alert>}
						<Form
							useFormInstance={useFormInstance}
							onSubmit={handleSubmit}
						>
							<FormField name="username" className="text-left">
								<FormTextInput
									placeholder="Email Address"
									name="username"
									register={register}
								/>
							</FormField>
							<FormField name="password">
								<FormTextInput
									placeholder="Password"
									name="password"
									register={register}
									type="password"
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
				{isSubmitting && <LoadingMaskWrap />}
			</Container>
		</>
	)
}
