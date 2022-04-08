import { combineReducers } from 'redux';
import LoginReducers from './LoginReducers';
import SignUpReducers from './SignUpReducers';

export default combineReducers({
    replaceMe: () => null,
    userSession: LoginReducers,
    signUpMsg: SignUpReducers
}); 