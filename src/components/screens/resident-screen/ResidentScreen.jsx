import React from 'react'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import NavigationBar from '../../subcomponents/navigation-bar/NavigationBarContainer'
import RouteHandler from '../../route-handler/RouteHandlerContainer'
import ResidentAccountSettings from '../../views/resident-account-settings/ResidentAccountSettingsContainer'
import TabPanel from '../../subcomponents/navigation-bar/TabPanel'
import FacesList from '../../lists/faces-list/FacesListContainer'
import Divider from '../../subcomponents/divider/Divider'
import PinCodesList from '../../lists/pin-codes-list/PinCodesListContainer'
import QrCodesList from '../../lists/qr-codes-list/QrCodesListContainer'
import Roles from '../../../constants/Roles'
import Archive from '../../views/archive/ArchiveContainer'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'

import './ResidentScreen.css'

const ResidentScreen = (props) => {
	const {
    me,
    role,
    isLogged,
    requestFaces,
    requestPinCodes,
    requestQrCodes,
	} = props;
  
  const [tabIndex, setTabIndex] = React.useState(0);

  React.useEffect(() => {

    requestFaces(me.flat_id)
    requestPinCodes(me.flat_id)
    requestQrCodes(me.flat_id)
  }, [
    requestFaces,
    requestPinCodes, 
    requestQrCodes,
    me,
  ])

	if (!isLogged) {
		return (
			<Redirect 
				to={{
				pathname: '/sign-in',
				}}
			/>
		)
	}

  if (role !== Roles.TENANT) {    
    return <RouteHandler />
  }

  const handleChangeTabIndex = (index) => {

    setTabIndex(index)
  }

  return (
    <div className='b-resident-screen'>
      <NavigationBar tabs={['Личный кабинет', 'Лица', 'ПИН-коды', 'QR-коды', 'Архив']} onChangeTabIndex={handleChangeTabIndex}>
        <TabPanel value={tabIndex} index={0}>
          <ResidentAccountSettings />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <View header='Лица'>
            <FacesList flatId={me.flat_id} />
          </View>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <View header='ПИН-коды'>
            <PinCodesList flatId={me.flat_id} />
          </View>
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <View header='QR-коды'>
            <QrCodesList flatId={me.flat_id} />
          </View>
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          <Archive />
        </TabPanel>
      </NavigationBar>
    </div>    
  )
}

const View = (props) => {
  const {
    header,
    children,
  } = props;

  const deviceType = useDevice();

  return (
    <Container className='b-resident-screen__view'>
      {
        deviceType !== DeviceTypes.DESKTOP
        &&
            <>
              <h1>
                {header}
              </h1>
              <Divider />
            </>
      }
      {children}
    </Container>
  )
}

export default ResidentScreen
