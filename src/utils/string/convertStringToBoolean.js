const convertStringToBoolean = (data) => {
    
  switch (data) {
    case 'true':
      return true
    case 'false':
      return false
    default:
      return data
  }
}

export default convertStringToBoolean
