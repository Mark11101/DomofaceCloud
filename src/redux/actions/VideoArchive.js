export const requestGenerateVideo = (
  intercom_id, 
  date_start,
  date_end,
) => {

  return {
    type: 'REQUEST_GENERATE_VIDEO',
    payload: {
      intercom_id, 
      date_start,
      date_end,
    }
  }
}

export const requestGenerateVideoSuccess = (response, intercom_id) => {

  return {
    type: 'REQUEST_GENERATE_VIDEO_SUCCESS',
    payload: {
      response,
      intercom_id,
    }
  }
}

export const requestGenerateVideoError = (error) => {

  return {
    type: 'REQUEST_GENERATE_VIDEO_ERROR',
    error
  }
}
