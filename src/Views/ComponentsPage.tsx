import { useForm, useFieldArray } from 'react-hook-form'
import { Variety } from '../common/Variety'
import {
	Button,
	ButtonVariety,
	ContentHeader,
	Form,
	FormField,
	FormRadioGroup,
	FormSelect,
	FormSelectNew,
	FormTextInput,
} from 'components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Container, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { LocationType } from './Registration/components/BusinessInfo'

export enum RadioOptionsLabel {
	YES = 'Yes',
	NO = 'No',
}

export const ComponentsPage = () => {
	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		islicensedPhlebotomist: Yup.string().required(
			'Please select an option'
		),
		phlebotomist: Yup.array().of(
			Yup.object().shape({
				phlebotomistName: Yup.string()
					.min(4, 'too short')
					.required('Required'), // these constraints take precedence
			})
		),
	})

	const initialValues = {
		name: '',
		islicensedPhlebotomist: '',
		phlebotomist: [{ phlebotomistName: '' }],
		test: '',
	}

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: initialValues,
	})

	const {
		control,
		getValues,
		register,
		formState: { errors },
		watch,
	} = useFormInstance

	const handleSubmit = async (values: any) => {
		console.log(getValues(), 'values')
	}

	// const { control, getValues } = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'phlebotomist',
	})

	const handleAppend = (
		value:
			| Partial<{ phlebotomistName: string }>
			| Partial<{ phlebotomistName: string }>[]
	) => {
		append(value)
		console.log('add: ', getValues())
	}

	const handleRemove = (index: number | number[] | undefined) => {
		remove(index)
		console.log('remove: ', getValues())
	}

	const islicensedPhlebotomist = watch('islicensedPhlebotomist')

	// console.log(fields.length, 'length')

	return (
		<Container fluid>
			<ContentHeader title="test" backText="Back" />
			<Row className="justify-content-center">
				<Col md={10}>
					<Row>
						<Col>
							<div className="m-5">
								<Button variety={Variety.Secondary}>
									Test
								</Button>
								<Button variety={ButtonVariety.Link}>
									Test
								</Button>
							</div>
						</Col>
					</Row>
					<Row className="justify-content-center">
						<Col md={9}>
							<Form
								useFormInstance={useFormInstance}
								onSubmit={handleSubmit}
							>
								<FormField name="name">
									<FormTextInput
										name={'name'}
										register={register}
										placeholder="Name"
									/>
								</FormField>
								<FormField
									name="islicensedPhlebotomist"
									label="Do you have a licensed phlebotomist?"
									useWrapper={false}
									className="form-radio-wrap rounded-2 d-flex ps-3"
									isRadio={true}
								>
									<div className="d-flex">
										<FormRadioGroup
											name={'islicensedPhlebotomist'}
											register={register}
											required
											value={'Yes'}
										/>
										<FormRadioGroup
											name={'islicensedPhlebotomist'}
											register={register}
											required
											value={'No'}
										/>
									</div>
									{islicensedPhlebotomist ===
										RadioOptionsLabel.YES && (
										<div style={{ flexBasis: '100%' }}>
											{fields.map((item, index) => {
												return (
													<div
														key={item.id}
														className="col-lg-7 d-flex mb-1 align-items-center"
													>
														<FormTextInput
															name={`phlebotomist[${index}].phlebotomistName`}
															register={register}
															placeholder="Phlebotomist Name"
															hasAppendButton={
																true
															}
															onClickAppend={() =>
																handleAppend({
																	phlebotomistName:
																		'',
																})
															}
															fieldCount={
																fields?.length
															}
															onClickRemove={() =>
																handleRemove(
																	index
																)
															}
														/>
													</div>
												)
											})}
										</div>
									)}
								</FormField>
								<FormField name='test'>
									<FormSelectNew
										name="test"
										register={register}
										options={[
											{
												label: LocationType.PHARMACY,
												value: 1,
											},
											{
												label: LocationType.CLINIC,
												value: 2,
											},
											{
												label: LocationType.PHARMACY,
												value: 3,
											},
										]}
									/>
								</FormField>
								<div>
									<Button type="submit">Submit</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}
