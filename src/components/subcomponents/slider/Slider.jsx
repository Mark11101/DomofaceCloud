import React from 'react'
import Slider from '@material-ui/core/Slider'

const SliderWrapper = (props) => {
	const {
		header,
		value,
		step = 10,
		onChange,
		onBlur
	} = props;

	return (
		<>
			<small>
				{header}
			</small>
			<Slider
				value={Number(value)}
				getAriaValueText={(value) => value}
				aria-labelledby="discrete-slider"
				valueLabelDisplay="auto"
				step={step}
				marks
				min={0}
				max={100}
				onBlur={onBlur}
				onChange={onChange}
			/>
		</>
	)
}

export default SliderWrapper
