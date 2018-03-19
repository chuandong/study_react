import { combineReducers } from 'redux-immutable';
import UserReducer from './user'


const appReducer = combineReducers({
  user: UserReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer;