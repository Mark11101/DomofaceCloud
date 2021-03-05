import React from 'react'
import Box from '@material-ui/core/Box'

const TabPanel = (props) => {
  const {
		value,
		index,
		children, 
	} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
		>
			{value === index && (
				<Box p={3}>
					{children}
				</Box>
			)}
		</div>
	)
}

export default TabPanel
