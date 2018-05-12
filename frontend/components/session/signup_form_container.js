import { connect } from 'react-redux';
import { signup, clearErrors, login } from '../../actions/session_actions';
import SessionForm from './session_form';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.session,
    formType: 'signup'
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let demoUser = {
    username: 'instagram',
    password: 'starwars'
  };
  return {
    demoLogin: () => dispatch(login(demoUser)),
    processForm: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));
