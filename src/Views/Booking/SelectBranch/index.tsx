import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    ContentHeader,
    Form,
    FormField,
    FormRadioGroup,
    SubmitButton
} from 'components'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ClinicOptions, IBranch } from '../types'

export const SelectBranch = () => {
	const navigate = useNavigate()

	const initialValues: IBranch = {
		branch: 0,
	}

	const useFormInstance = useForm({
		defaultValues: initialValues,
	})

	const {
		getValues,
		register,
		formState: { isDirty, isSubmitting, isValid },
		watch,
		control,
	} = useFormInstance
	const handleSubmit = async (values: any) => {
		console.log(getValues())
		navigate('/booking/select-time')
	}

	const clinicOptionComponent = (name: string, description: string) => (
		<div className="radio-card-wrap location">
			<div className="d-flex justify-content-between">
				<div>
					<FontAwesomeIcon
						icon={faLocationDot}
						className="text-secondary me-2"
						size="1x"
					/>
					<strong>{name}</strong>
				</div>

				<p className="select-text">SELECT</p>
			</div>
			<p className="small">{description}</p>
		</div>
	)

	return (
		<Container fluid>
			<ContentHeader
				title="Select Branch"
				backText="Back"
				backLink={-1}
			/>
			<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
				<Row className="justify-content-center">
					<Col lg={10}>
						<div className="my-4">
							<h5>Available Clinics</h5>
							<Row>
								<Col lg={12}>
									<FormField
										name="branch"
										useWrapper={false}
										className="d-block"
									>
										<Row className="pe-2">
											{ClinicOptions.map(
												(option, index) => (
													<Col lg={6}>
														<FormRadioGroup
															name={'branch'}
															register={register}
															value={option.value}
															key={index}
															radioClassName="radio-card"
															components={clinicOptionComponent(
																option.name,
																option.address
															)}
															labelClassname="d-block mt-2 mb-3"
														/>
													</Col>
												)
											)}
										</Row>
									</FormField>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>

				<div className="footer w-75">
					<SubmitButton
						pending={isSubmitting}
						pendingText="Saving"
						className="col-lg-auto pull-right"
						disabled={!isDirty}
					>
						Next
					</SubmitButton>
				</div>
			</Form>
		</Container>
	)
}
