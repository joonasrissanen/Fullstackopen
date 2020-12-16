import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (!notification || notification.message === null) {
    return null;
  }

  return (
    <div style={{ ...style, color: notification.isError ? 'red' : 'green' }}>
      {notification.message}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    isError: PropTypes.bool,
  }),
};

const mapStateToProps = ({ notification }) => {
  return {
    notification
  };
};

const connectedNotification = connect(mapStateToProps)(Notification);

export default connectedNotification;
