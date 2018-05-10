import React from 'react';
import { connect } from 'react-redux';
import ProfileInfo from './profile_info';

const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.id]
  };
};


export default connect(mapStateToProps, null)(ProfileInfo);
