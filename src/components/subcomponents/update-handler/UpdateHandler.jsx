import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

import './UpdateHandler.css'

const UpdateHandler = (props) => {
  const {
    isIntercomUtilsLoading,
    isArchiveLoading,
    isCompaniesLoading,
    isHousesLoading,
    isEntrancesLoading,
    isFlatsLoading,
    isIntercomsLoading,
    isResidentsLoading,
    isFacesLoading,
    isRfidKeysLoading,
    isPinCodesLoading,
    isQrCodesLoading,
    isAdminsLoading,
    isAuthLoading,
    isSipAccountsLoading,
    isSipServersLoading,
    isSipCredentialsLoading,
    isStunServersLoading,
    isSyslogServersLoading,
    isFtpServersLoading,
    isTurnServersLoading,
    isFirmwaresLoading,
  } = props;

  const [scrollYPixels, setScrollYPixels] = React.useState('');

  window.addEventListener('scroll', () => {
    
    setScrollYPixels(window.scrollY + '')
  })
  
  return (
    <>
      {
        (
          isIntercomUtilsLoading || isCompaniesLoading     || isSipCredentialsLoading ||
          isHousesLoading        || isEntrancesLoading     || isAdminsLoading ||
          isFlatsLoading         || isAuthLoading          || isResidentsLoading ||
          isRfidKeysLoading      || isSipAccountsLoading   || isFacesLoading ||
          isSipServersLoading    || isPinCodesLoading      || isQrCodesLoading ||
          isFirmwaresLoading     || isSyslogServersLoading || isFtpServersLoading ||
          isTurnServersLoading   || isIntercomsLoading     || isStunServersLoading   ||
          isArchiveLoading
        ) 
        &&
          <div 
            className='b-update-handler' 
            style={
              {
                top: scrollYPixels + 'px',
              }
            }
          >
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
      }
    </>
  )
}

export default UpdateHandler
