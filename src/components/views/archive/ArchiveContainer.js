import { connect } from 'react-redux'

import { requestGenerateVideo } from '../../../redux/actions/VideoArchive'

import Archive from './Archive'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
    archiveUrl: state.videoArchive.archiveUrl,
    ftpServers: state.ftpServers.ftpServers,
    ftpServerId: state.intercomUtils.info.ftp_server_id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestGenerateVideo: (
      intercom_id,
      date_start,
      date_end,
    ) => dispatch(requestGenerateVideo(
      intercom_id,
      date_start,
      date_end,
    ))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Archive)
