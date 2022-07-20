import { useState } from 'react'
import { Button, ContentHeader } from 'components'
import { Container, Row, Col, Tab, Tabs, ProgressBar } from 'react-bootstrap'
import { TechUsage } from './Tab/TechUsage'
import { General } from './Tab/General'
import { BankAccountInfoUsage } from './Tab/BankAccountInfoUsage'
import { useMatch, useNavigate } from 'react-router-dom'

export const TermsAndAgreement = () => {
	const match = useMatch('registration/*')
	const navigate = useNavigate()

	const [key, setKey] = useState<string>('tech')
	
	return (
		<Container fluid>
			<ContentHeader
				title="Terms & Agreement"
				backText="Back"
				backLink={-1}
			/>
			<Row className="justify-content-center mb-5">
				<Col lg={10}>
					<Tabs
						id="controlled-tab-example"
						activeKey={key}
						onSelect={(key: any) => setKey(key)}
						className="mb-3"
					>
						<Tab eventKey="general" title="General">
							<General />
						</Tab>
						<Tab eventKey="tech" title="Tech Usage">
							<TechUsage />
						</Tab>
						<Tab
							eventKey="bank"
							title="Bank Account Information Usage"
						>
							<BankAccountInfoUsage />
						</Tab>
					</Tabs>
				</Col>
			</Row>
			<div className="footer w-75">
				<ProgressBar
					variant="secondary"
					now={100}
					className="col-lg-7 pull-left mt-3"
				/>
				<Button
					type="submit"
					// disabled={!isDirty}
					className="col-lg-auto pull-right"
					onClick={() => navigate(`${match?.pathnameBase}/success`)}
				>
					Agree & Proceed
				</Button>
			</div>
		</Container>
	)
}
