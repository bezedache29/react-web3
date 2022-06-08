import { USER_LOGIN, USER_LOGOUT, USER_ERROR } from './userTypes';
import Cookies from 'js-cookie';

const token = Cookies.get('token');
const userId = Cookies.get('id');


const initialState = {
  connected: token ? true : false,
  token: token,
  id: userId ? userId : ''
};


const isConnectedReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_LOGIN:
      return {
        ...state,
        connected: true,
        token: action.token,
        id: action.id
      };
    case USER_LOGOUT:
      return {
        ...state,
        connected: false,
        token: Cookies.remove('token'),
        id: ''
      };
    default:
      return state;
  }
}

export default isConnectedReducer;