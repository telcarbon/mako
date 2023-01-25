import { Card, Table } from 'react-bootstrap'

interface ServicesSummaryTableProps {
	title: string
	serviceCounters: any[]
}

export const ServicesSummaryTable = ({
	title,
	serviceCounters,
}: ServicesSummaryTableProps) => {
	let totalAmount = 0

	const servicesSummaryArray = () => {
		let id: number = 1
		return serviceCounters?.map((service: any, index: number) => {
			let content = []

			for (let i = 0; i < service.counter; i++) {
				content.push(
					<tr key={id}>
						<td className="text-start">{service?.name}</td>
						<td className="text-end">${service?.price}</td>
					</tr>
				)
				id++
			}
			totalAmount += parseFloat(service?.price) * service.counter
			return content
		})
	}
	return (
		<>
			<h5>{title}</h5>
			<Card className="border border-2 border-dark py-1 px-4 mt-3">
				<Table responsive className="test-table">
					<tbody>{servicesSummaryArray()}</tbody>

					<tfoot className="fw-bold">
						<tr>
							<td className="border-0 text-start">Total</td>
							<td className="border-0 text-end">
								${totalAmount.toFixed(2)}
							</td>
						</tr>
					</tfoot>
				</Table>
			</Card>
		</>
	)
}
