import React from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';


const mapStateToProps = (state) => {
  return {
    userId: state.session.id
  }

};


export default connect(mapStateToProps, null)(Navbar);
