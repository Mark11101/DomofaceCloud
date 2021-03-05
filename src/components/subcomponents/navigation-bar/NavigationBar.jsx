import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccountOutlined'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import VideocamIcon from '@material-ui/icons/VideocamOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import VpnKeyIcon from '@material-ui/icons/VpnKeyOutlined'
import FaceIcon from '@material-ui/icons/FaceOutlined'
import CropFreeIcon from '@material-ui/icons/CropFree'

import { ReactComponent as IntercomIcon } from '../../../images/intercom.svg'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'

import './NavigationBar.css'

const NavigationBar = (props) => {
  const {
    tabs,
    children,
    setDisplayedView,
    onChangeTabIndex,
  } = props;

  const deviceType = useDevice();

  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    
    setValue(newValue)
    onChangeTabIndex(newValue)
  };

  const handleChangeIndex = (index) => {
    
    setValue(index)
    onChangeTabIndex(index)
  };

  const handleTabClick = (type) => {

    setDisplayedView(type)
    document.body.className = '';
    document.body.classList.add(type)
  }

  const outputIconTab = (tab) => {
    
    switch (tab) {
      case 'Домофон':
        return <IntercomIcon />

      case 'Управление аккаунтами':
        return <SupervisorAccountIcon />

      case 'Списки':
        return <FormatListBulletedIcon />

      case 'Архив':
        return <VideocamIcon />

      case 'Личный кабинет':
        return <AccountCircleIcon />

      case 'Ключи':
        return <VpnKeyIcon />

      case 'ПИН-коды':
        return <VpnKeyIcon />

      case 'Лица':
        return <FaceIcon />  

      case 'QR-коды':
        return <CropFreeIcon />
            
      default:
        break;
    }
  }

  const getConvertedViewName = (tab) => {

    switch (tab) {
      case 'Домофон':
        return 'intercom-view'

      case 'Управление аккаунтами':
        return 'accounts-view'

      case 'Списки':
        return 'lists-view'

      case 'Архив':
        return 'video-archive-view'

      case 'Личный кабинет':
        return 'personal-area-view'

      case 'Ключи':
        return 'keys-view'

      case 'ПИН-коды':
        return 'pin-codes-view'

      case 'Лица':
        return 'faces-view'

      case 'QR-коды':
        return 'qr-codes-view'
            
      default:
        break;
    }
  }

  const outputTabs = (tabs) => {
    
    return tabs.map((tab, index) => 
      <Tab 
        icon={
          deviceType !== DeviceTypes.DESKTOP
          ?
            outputIconTab(tab)
          :
            tab
        } 
        key={index} 
        onClick={() => handleTabClick(getConvertedViewName(tab))}
      />
    )
  }
  
  return (
    <>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {children}
      </SwipeableViews>
      <div className='b-navbar'>
        <AppBar position="fixed" color="default">
          <Tabs
            value={value}
            className='b-navbar__tabs'
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            TabIndicatorProps={{style: {background:'var(--secondary-color)'}}}
          >
            {outputTabs(tabs)}
          </Tabs>
        </AppBar>
      </div>
    </>
  )
}

export default NavigationBar
