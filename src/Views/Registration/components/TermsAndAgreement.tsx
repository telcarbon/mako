import { useState } from 'react'
import { Button, ContentHeader } from 'components'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { TechUsage } from './Tab/TechUsage'
import { General } from './Tab/General'
import { BankAccountInfoUsage } from './Tab/BankAccountInfoUsage'

export const TermsAndAgreement = () => {
	const [key, setKey] = useState<string>('tech')
	return (
		<Container fluid>
			<ContentHeader
				title="Terms & Agreement"
				backText="Back"
				backLink={-1}
			/>
			<Row className="justify-content-center">
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
			<div className="footer">
				<Button type="submit">
					Agree and Proceed
				</Button>
			</div>
		</Container>
	)
}
