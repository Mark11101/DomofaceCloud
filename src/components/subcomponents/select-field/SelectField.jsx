import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import appendClassName from '../../../utils/string/appendClassName'

import './SelectField.css'

const SelectField = (props) => {
  const {
    label,
    defaultValue,
    selectedValue,
    values,  
    name,
    emptyField,
    className,
    onChange,  
  } = props;
  
  return (
    <div className={
      className
      ?
        appendClassName('b-select', className)
      :
        'b-select'
    }>
      {
        label
        &&
          <small>
            {label}
          </small>
      }
      <FormControl variant="outlined" className='b-input-panel'>
        <Select
          value={selectedValue}
          defaultValue={defaultValue}
          name={name}
          onChange={onChange}
        >
          {
            emptyField
            &&
              <MenuItem value='' className='b-select-field__empty-item'></MenuItem>
          }
          {
            Object.keys(values).map((index) => (
              <MenuItem value={values[index]} key={index}>
                {values[index]}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectField
