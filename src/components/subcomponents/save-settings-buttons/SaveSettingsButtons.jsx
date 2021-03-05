import React from 'react'

import './SaveSettingsButtons.css'

const SaveSettingsButtons = (props) => {
	const {
		saveSettings,
		resetSettings,
		disabled,
	} = props;

  return (
    <div className='b-save-settings-buttons'>
			<button
				className='b-button b-save-settings-buttons__save-settings-btn'
				onClick={saveSettings}
				disabled={disabled}
			>
				Сохранить
			</button>
			<button
				className='b-button b-save-settings-buttons__reset-settings-btn'
				onClick={resetSettings}
			>
				Сбросить
			</button>
    </div>
  )
}

export default SaveSettingsButtons
