import React, { useState } from 'react'

import appendClassName from '../../../utils/string/appendClassName'
import InputField from '../../subcomponents/input-field/InputField'
import Tooltip from '@material-ui/core/Tooltip'

import './RangeField.css'

const RangeField = (props) => {
  const {
    label,
    minNumberName,
    maxNumberName,
    minValidValue,
    maxValidValue,
    minNumberValue,
    maxNumberValue,
    innerDescriptionLabel,
    className,
    onChange,
    tooltip,
  } = props;

  const [open, setOpen] = useState(false);

  const handleOpenTooltip = (open) => {

    if (!open) {
      setOpen(true)
    }
  }

  const handleCloseTooltip = () => {

    setOpen(false);
  }

  return (
    <div className={
      className
      ?
        appendClassName('b-range-field', className)
      :
        'b-range-field'
    }>
      {
        label
        &&
          <small className='b-range-field__title'>
            {label}
            {
              tooltip
              ?
                <Tooltip
                  open={open}
                  title={tooltip}
                  placement='top'
                  onOpen={() => handleOpenTooltip(open)}
                  onClose={handleCloseTooltip}
                >
                  <span className='b-range-field__hint'>
                    ?
                  </span>
                </Tooltip>
              :
                null
            }
          </small>
      }
      <div className='b-range-field__input'>
        <InputField
          type='number'
          innerDescriptionLabel={innerDescriptionLabel}
          name={minNumberName}
          value={minNumberValue}
          onChange={onChange}
        />
        <span className='b-range-field__divider'>
          -
        </span>
        <InputField
          type='number'
          innerDescriptionLabel={innerDescriptionLabel}
          name={maxNumberName}
          value={maxNumberValue}
          onChange={onChange}
        />
      </div>
      {
        minValidValue && maxValidValue
        &&
          <p className='b-range-field__helper-text'>
            {`min: ${minValidValue}, max: ${maxValidValue}`}
          </p>
      }
    </div>
  )
}

export default RangeField
