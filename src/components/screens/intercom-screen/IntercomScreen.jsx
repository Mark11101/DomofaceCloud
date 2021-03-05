import React from 'react'
import { Redirect } from 'react-router-dom'

import NavigationBar from '../../subcomponents/navigation-bar/NavigationBarContainer'
import Intercom from '../../views/intercom/IntercomContainer'
import Archive from '../../views/archive/ArchiveContainer'
import RouteHandler from '../../route-handler/RouteHandlerContainer'
import TabPanel from '../../subcomponents/navigation-bar/TabPanel'
import Roles from '../../../constants/Roles'

import './IntercomScreen.css'

const IntercomScreen = (props) => {
  const {
    role,
    match,
    isLogged,
  } = props;
  
  const [tabIndex, setTabIndex] = React.useState(0);

  const intercomId = match.params.id;
  
  if (!isLogged) {
    return (
      <Redirect 
        to={{
          pathname: '/sign-in',
        }}
      />
    )
  }

  if (role === Roles.TENANT) {    
    return <RouteHandler />
  }

  const handleChangeTabIndex = (index) => {

    setTabIndex(index)
  }

  return (
    <div className='b-intercom-screen'>
      <NavigationBar tabs={[
        'Домофон', 
        'Архив'
      ]} onChangeTabIndex={handleChangeTabIndex}>
        <TabPanel value={tabIndex} index={0}>
          <Intercom intercomId={intercomId} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Archive intercomId={intercomId} />
        </TabPanel>
      </NavigationBar>
    </div>
  )
}

export default IntercomScreen
