import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import moment from 'moment'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { 
  MuiPickersUtilsProvider, 
  DateTimePicker 
} from '@material-ui/pickers'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'

import Divider from '../../subcomponents/divider/Divider'
import Tooltip from '../../subcomponents/tooltip/Tooltip'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'
import Roles from '../../../constants/Roles'

import './Archive.css'

const Archive = (props) => {
  const {
    role,
    intercomId,
    ftpServerId,
    requestGenerateVideo,
  } = props;

  const deviceType = useDevice();
  
  const [firstSelectedDate, setFirstSelectedDate]   = useState(moment().startOf('month').format('YYYY-MM-DD hh:mm'));
  const [secondSelectedDate, setSecondSelectedDate] = useState(moment().format('YYYY-MM-DD hh:mm'));

  const handleFirstDateChange = (date) => {
    
    setFirstSelectedDate(date);
  };

  const handleSecondDateChange = (date) => {
    
    setSecondSelectedDate(date);
  };

  const handleFindVideoArchiveClick = (event) => {
    event.preventDefault()

    requestGenerateVideo(
      intercomId, 
      firstSelectedDate,
      secondSelectedDate,
    )
  }
  
  return (
    <Container className='b-archive'>
      {
        deviceType !== DeviceTypes.DESKTOP
        &&
          <>
            <h1 className='b-archive__header'>
              Архив
            </h1>
            <Divider />
          </>
      }
      {
        ftpServerId
        ?
          <>
            <div className='b-archive__dates'>
              <small>С</small>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  variant={
                    deviceType === DeviceTypes.MOBILE
                    ?
                      'inline'
                    :
                      'static'
                  }
                  format="dd/MM/yyyy HH:mm"
                  className='b-archive__first-date'
                  value={firstSelectedDate}
                  onChange={handleFirstDateChange}
                />
              </MuiPickersUtilsProvider>
              <small>По</small>
              <span className='b-archive__horizon-divider'>
                __
              </span>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  variant={
                    deviceType === DeviceTypes.MOBILE
                    ?
                      'inline'
                    :
                      'static'
                  }
                  format="dd/MM/yyyy HH:mm"
                  value={secondSelectedDate}
                  onChange={handleSecondDateChange}
                />
              </MuiPickersUtilsProvider>
            </div>
            <button
              className='b-button b-archive__load-btn'
              onClick={handleFindVideoArchiveClick}
            >
              Загрузить
            </button>
            <Tooltip 
              title='Для воспроизведения видеоархива необходимо установить расширение для вашего браузера (HLS плеер)' 
              className='b-archive__tooltip'
            />
            <video id="video"></video>
          </>
        :
          <>
            {
              role === Roles.TENANT
              ?
                <div className='b-archive__unavailable'>
                  <VideocamOffIcon />
                  <p>
                    Извините, архив временно недоступен
                  </p>
                </div>
              :  
                'Необходимо добавить FTP сервер в домофон.'
            }
          </>
      }
    </Container>
  )
}

export default Archive
