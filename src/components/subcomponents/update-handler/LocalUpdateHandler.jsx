import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

import './LocalUpdateHandler.css'

const LocalUpdateHandler = () => {
  const [scrollYPixels, setScrollYPixels] = React.useState('');

  window.onscroll = () => {

    setScrollYPixels(window.scrollY + '')
  }
	
	return (
		<div 
			className='b-local-update-handler' 
			style={
				{
					top: scrollYPixels + 'px',
				}
			}
		>
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	)
}

export default LocalUpdateHandler
