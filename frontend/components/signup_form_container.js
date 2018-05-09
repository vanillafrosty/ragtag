import { connect } from 'react-redux';
import { signup } from '../actions/session_actions';
import SessionForm from './session_form';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  let errors_slice = state.errors.session;
  let errors = errors_slice.length === 0 ? 'none' : errors_slice;
  return {
    errors: errors,
    formType: 'signup'
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    processForm: (user) => dispatch(signup(user))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));
