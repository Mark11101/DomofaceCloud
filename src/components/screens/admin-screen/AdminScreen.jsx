import React from 'react'
import { Redirect } from 'react-router-dom'
import Collapsible from 'react-collapsible'
import Container from 'react-bootstrap/Container'

import NavigationBar from '../../subcomponents/navigation-bar/NavigationBarContainer'
import TabPanel from '../../subcomponents/navigation-bar/TabPanel'
import CompaniesList from '../../lists/companies-list/CompaniesListContainer'
import AdminAccountsSettings from '../../views/admin-accounts-settings/AdminAccountsSettingsContainer'
import RouteHandler from '../../route-handler/RouteHandlerContainer'
import Divider from '../../subcomponents/divider/Divider'
import Firmwares from '../../lists/firmwares/FirmwaresListContainer'
import Roles from '../../../constants/Roles'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'
import SipServersList from '../../lists/sip-servers-list/SipServersListContainer'
import StunServersList from '../../lists/stun-servers-list/StunServersContainer'
import SyslogServersList from '../../lists/syslog-servers-list/SyslogServersListContainer'
import FtpServersList from '../../lists/ftp-servers-list/FtpServersListContainer'
import TurnServersList from '../../lists/turn-servers-list/TurnServersListContainer'

import './AdminScreen.css'

const AdminScreen = (props) => {
	const {
    role,
    isLogged,
  } = props;

  const deviceType = useDevice();
  
  const [tabIndex, setTabIndex] = React.useState(0);

	if (!isLogged) {
		return (
			<Redirect 
				to={{
				pathname: '/sign-in',
				}}
			/>
		)
  }
  
  if (role !== Roles.ADMINISTRATOR) {    
    return <RouteHandler />
  }

  const handleChangeTabIndex = (index) => {

    setTabIndex(index)
  }
  
  return (
    <div className='b-admin-screen'>
      <NavigationBar tabs={['Списки', 'Управление аккаунтами']} onChangeTabIndex={handleChangeTabIndex}>
        <TabPanel value={tabIndex} index={0}>
          <Container className='b-admin-screen__lists'>
            {
              deviceType !== DeviceTypes.DESKTOP
              &&
                <>
                  <h1 className='b-admin-screen__header'>
                    Списки
                  </h1>
                  <Divider />
                </>
            }
            <Collapsible trigger="Сервисные компании">
              <CompaniesList 
                valuesIndex='organization'
              />
            </Collapsible>
            <Collapsible trigger="Серверы">
              <Collapsible trigger="SIP серверы">
                <SipServersList />
              </Collapsible>
              <Collapsible trigger="STUN серверы">
                <StunServersList />
              </Collapsible>
              <Collapsible trigger="Syslog серверы">
                <SyslogServersList />
              </Collapsible>
              <Collapsible trigger="FTP серверы">
                <FtpServersList />
              </Collapsible>
              <Collapsible trigger="TURN серверы">
                <TurnServersList />
              </Collapsible>
            </Collapsible>
            <Collapsible trigger="Прошивки">
              <Firmwares />
            </Collapsible>
          </Container>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <AdminAccountsSettings />
        </TabPanel>
      </NavigationBar>
    </div>    
  )
}

export default AdminScreen
