import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'

import './Tooltip.css'

const TooltipWrapper = (props) => {
	const {
		title,
		className,
	} = props;

	const [open, setOpen] = React.useState(false);

	const deviceType = useDevice();

  const handleTooltipClose = () => {

    setOpen(false);
  };

  const handleTooltipOpen = (event) => {
		event.preventDefault()
		
		setOpen(true);
	};
	
	return (
		<>
			{
				deviceType !== DeviceTypes.DESKTOP
				?
					<ClickAwayListener onClickAway={handleTooltipClose}>
						<Tooltip
							PopperProps={{
								disablePortal: true,
							}}
							onClose={handleTooltipClose}
							open={open}
							disableFocusListener
							disableHoverListener
							disableTouchListener
							title={title}
						>
							<button 
								className={'b-tooltip ' + className}  
								onClick={handleTooltipOpen}
							>
							  <span>?</span>
							</button>
						</Tooltip>
					</ClickAwayListener>
				:
					<Tooltip 
						disableFocusListener 
						disableTouchListener 
						title={title}
					>
						<button className={'b-tooltip ' + className}>
							<span>?</span>
						</button>
					</Tooltip>
			}
		</>
	)
}

export default TooltipWrapper
