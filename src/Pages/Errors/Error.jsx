import PropTypes from 'prop-types'

function Error({ statusCode }) {
  return <div>Error {statusCode}</div>
}

Error.propTypes = {
  statusCode: PropTypes.number || PropTypes.string,
}

export default Error
