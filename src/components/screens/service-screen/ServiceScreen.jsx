import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import NavigationBar from '../../subcomponents/navigation-bar/NavigationBarContainer'
import TabPanel from '../../subcomponents/navigation-bar/TabPanel'
import HousesList from '../../lists/houses-list/HousesListContainer'
import ServiceAccountsSettings from '../../views/service-accounts-settings/ServiceAccountsSettingsContainer'
import RouteHandler from '../../route-handler/RouteHandlerContainer'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import SipServersList from '../../lists/sip-servers-list/SipServersListContainer'
import StunServersList from '../../lists/stun-servers-list/StunServersContainer'
import SyslogServersList from '../../lists/syslog-servers-list/SyslogServersListContainer'
import FtpServersList from '../../lists/ftp-servers-list/FtpServersListContainer'
import TurnServersList from '../../lists/turn-servers-list/TurnServersListContainer'
import FirmwaresList from '../../lists/firmwares/FirmwaresListContainer'
import Divider from '../../subcomponents/divider/Divider'
import Roles from '../../../constants/Roles'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'

import './ServiceScreen.css'

const ServiceScreen = (props) => {
	const {
		role,
		isLogged,
		companyId,
    requestCompany,
	} = props;

  const deviceType = useDevice();
  
  const [tabIndex, setTabIndex] = React.useState(0);

	const [isHousesModalVisible, setIsHousesModalVisible] = useState(false);
	const [isSipServersModalVisible, setIsSipServersModalVisible] = useState(false);
	const [isStunServersModalVisible, setIsStunServersModalVisible] = useState(false);
	const [isSyslogServersModalVisible, setIsSyslogServersModalVisible] = useState(false);
	const [isFtpServersModalVisible, setIsFtpServersModalVisible] = useState(false);
	const [isTurnServersModalVisible, setIsTurnServersModalVisible] = useState(false);
	const [isFirmwaresModalVisible, setIsFirmwaresModalVisible] = useState(false);


  React.useEffect(() => {

		requestCompany(companyId)
	}, [requestCompany, companyId])
	
	if (!isLogged) {
		return (
			<Redirect 
				to={{
				pathname: '/sign-in',
				}}
			/>
		)
	}

  if (role !== Roles.SERVICE_COMPANY) {    
    return <RouteHandler />
	}

  const handleChangeTabIndex = (index) => {

    setTabIndex(index)
  }
	
	const handleToggleHousesModal = () => {

		setIsHousesModalVisible(!isHousesModalVisible)
	}
	
	const handleToggleSipServersModal = () => {

		setIsSipServersModalVisible(!isSipServersModalVisible)
	}
	
	const handleToggleStunServersModal = () => {

		setIsStunServersModalVisible(!isStunServersModalVisible)
	}
	
	const handleToggleSyslogServersModal = () => {

		setIsSyslogServersModalVisible(!isSyslogServersModalVisible)
	}
	
	const handleToggleFtpServersModal = () => {

		setIsFtpServersModalVisible(!isFtpServersModalVisible)
	}
	
	const handleToggleTurnServersModal = () => {

		setIsTurnServersModalVisible(!isTurnServersModalVisible)
	}

	const handleToggleFirmwaresModal = () => {

		setIsFirmwaresModalVisible(!isFirmwaresModalVisible)
	}

  return (
		<>
			<div className='b-service-screen'>
				<NavigationBar tabs={['????????????', '???????????? ??????????????']} onChangeTabIndex={handleChangeTabIndex}>
					<TabPanel value={tabIndex} index={0}>
						<Container className='b-service-screen__lists'>
							{
								deviceType !== DeviceTypes.DESKTOP
								&&
									<>
										<h4 className='b-service-screen__header'>
											????????????
										</h4>
										<Divider />
									</>
							}
							<button
								className='b-button'
								onClick={handleToggleHousesModal}
							>
								????????
							</button>
							<button
								className='b-button'
								onClick={handleToggleSipServersModal}
							>
								SIP ??????????????
							</button>
							<button
								className='b-button'
								onClick={handleToggleStunServersModal}
							>
								STUN ??????????????
							</button>
							<button
								className='b-button'
								onClick={handleToggleSyslogServersModal}
							>
								Syslog ??????????????
							</button>
							<button
								className='b-button'
								onClick={handleToggleFtpServersModal}
							>
								FTP ??????????????
							</button>
							<button
								className='b-button'
								onClick={handleToggleTurnServersModal}
							>
								TURN ??????????????
							</button>	
							<button
								className='b-button'
								onClick={handleToggleFirmwaresModal}
							>
								????????????????
							</button>	
						</Container>
					</TabPanel>
					<TabPanel value={tabIndex} index={1}>
						<ServiceAccountsSettings />
					</TabPanel>
				</NavigationBar>
			</div>  
			{
				isHousesModalVisible
				&&
					<ModalForm
						title='????????'
						handleCloseModal={handleToggleHousesModal}
					>
						<HousesList companyId={companyId} />
					</ModalForm>
			}  
			{
				isSipServersModalVisible
				&&
					<ModalForm
						title='SIP ??????????????'
						handleCloseModal={handleToggleSipServersModal}
					>
						<SipServersList companyId={companyId} />
					</ModalForm>
			} 
			{
				isStunServersModalVisible
				&&
					<ModalForm
						title='STUN ??????????????'
						handleCloseModal={handleToggleStunServersModal}
					>
						<StunServersList companyId={companyId} />
					</ModalForm>
			}  
			{
				isSyslogServersModalVisible
				&&
					<ModalForm
						title='Syslog ??????????????'
						handleCloseModal={handleToggleSyslogServersModal}
					>
						<SyslogServersList companyId={companyId} />
					</ModalForm>
			}  
			{
				isFtpServersModalVisible
				&&
					<ModalForm
						title='FTP ??????????????'
						handleCloseModal={handleToggleFtpServersModal}
					>
						<FtpServersList companyId={companyId} />
					</ModalForm>
			} 
			{
				isTurnServersModalVisible
				&&
					<ModalForm
						title='TURN ??????????????'
						handleCloseModal={handleToggleTurnServersModal}
					>
						<TurnServersList companyId={companyId} />
					</ModalForm>
			}
			{
				isFirmwaresModalVisible
				&&
					<ModalForm
						title='????????????????'
						handleCloseModal={handleToggleFirmwaresModal}
					>
						<FirmwaresList companyId={companyId} />
					</ModalForm>
			}
		</>
  )
}

export default ServiceScreen
