import React, { useState } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Tooltip from '@material-ui/core/Tooltip'

import appendClassName from '../../../utils/string/appendClassName'

import './RadioButton.css'

const RadioButton = (props) => {
  const {
    value,
    label,
    name,
    className,
    onChange,
    tooltip
  } = props;

  const [open, setOpen] = useState(false);

  const changeSwitch = (event) => {

    setOpen(!open);
    onChange(event);
  }

  const handleOpenTooltip = (open) => {

    if (!open) {
      setOpen(true);
    }
  }

  const handleCloseTooltip = () => {
    
    setOpen(false);
  }

  return (
    <div className={
      className
      ?
        appendClassName('b-radio-button', className)
      :
        'b-radio-button'
    }>
      <FormControlLabel
        value={!!value}
        control={
          <Switch
            color="primary"
            checked={!!value}
            name={name}
            onChange={(event) => changeSwitch(event)}
            className={tooltip ? 'b-radio-button__switch': null}
          />
        }
        label={label}
        labelPlacement="start"
      />
      {
        tooltip
        ?
          <Tooltip
            open={open}
            title={tooltip}
            placement="top"
            onClose={handleCloseTooltip}
            onOpen={() => handleOpenTooltip(open)}
          >
            <span className="b-radio__hint">
              ?
            </span>
          </Tooltip>
        :
          null
      }
    </div>
  )
}

export default RadioButton
