import { REGISTER } from './type'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import history from '../common/history'
// import { fromJS } from 'immutable'

function setToken(token) {  
  window.localStorage.setItem('token', token);
  history.push('/')
}

export function register({user, pwd, type}) {  
  return async dispatch => {
    if(!user || !pwd) {
      Toast.fail('please type user or pwd', 1)
    }else {
      try {
        const res = await axios.post('http://localhost:1717/user/register', {user, pwd, type})
        console.log('res', res);
        if(res.status === 200 && res.data.code === 0) {
          dispatch({type: REGISTER, payload: res.data.data})
          setToken(res.data.token)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}