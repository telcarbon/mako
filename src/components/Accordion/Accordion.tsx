import classNames from 'classnames'
import React, { useState } from 'react'

export interface AccordionWrapProps {
	children: React.ReactNode
}

export const AccordionWrap = ({ children }: AccordionWrapProps) => {
	return <div className="accordion">{children}</div>
}

export interface AccordionProps {
	// children: React.ReactNode
	// controlId: string
	// icon: string
	// label: string
	// defaultExpand: boolean
	title: string
	content: string
}

export const Accordion = ({ title, content }: AccordionProps) => {
	const [isActive, setIsActive] = useState(false)

	return (
		<div className="accordion-item">
			<div className="accordion-title d-flex">
				<div>
          <h6>{title}</h6>
        </div>
				<div onClick={() => setIsActive(!isActive)}>
					{isActive ? '-' : '+'}
				</div>
			</div>
			{isActive && <div className="accordion-content">{content}</div>}
		</div>
	)
}
