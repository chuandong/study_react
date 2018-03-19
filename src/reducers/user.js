import { REGISTER } from '../actions/type'

import { List, Map } from 'immutable'

const initialState = Map({
  user: '',
  type: '',
  id: '',
  path: '',
  orders: List([])
})

export default function (state = initialState, action) {  
  switch (action.type) {
    case REGISTER:
      return state.merge({
        ...action.payload,
        path: action.payload.type === 'customer' ? '/goods' : '/allOrders'
      })
    default:
      break;
  }
  return state;
}