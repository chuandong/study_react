import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  user: {
    type: String,
    require: true,
    label: '用户名'
  },
  pwd: {
    type: String,
    require: true,
    label: '密码'
  },
  type: {
    type: String,
    require: true,
    label: '用户类型'
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'allOrders'
  }]
})

export default mongoose.model('user', userSchema)