const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const proxy = require('http-proxy-middleware')
const context = [`/*`]

const options = {
  target: 'http://127.0.0.1:1717',
  changeOrigin: true
}

const apiProxy = proxy(options)

const dbUrl = 'mongodb://127.0.0.1:27017/studyReact'

const app = express();

app.use(context, apiProxy)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());

const db = require('./db')

mongoose.connect(dbUrl).then(() => {
  console.log('链接数据库成功');
}).catch(e => {
  throw new Error(`链接数据库失败【${dbUrl}】`)
})

app.get('/test', function (req, res) {
  res.send('this is a test')
})

app.post('/user/register',async function (req,res) {  
  const { user, pwd, type } = req.body;
  console.log('body',req.body);
  await db.users.findOne({user}).then(doc => {
    if(doc) {
      return res.status(200).json({code: 1, msg: '已存在该用户'})
    }
    const code = new db.users({
      user,
      pwd,
      type
    })

    code.save(function(err, doc) {
      if(err || !doc) {
        return res.status(500).json({msg: '后端出错'})
      }
      const { user, type, _id } = doc;
      const token = jwt.sign({ id: _id }, 'chat-buy-react', {
        expiresIn: 60 * 60 * 24 * 7
      })
      return res.status(200).json({code: 0, token, data: {
        user, type, id: _id
      }})
    })
  }).catch(e => {
    return res.status(500).json({ msg: '后端出错' })
  })
})





app.listen(1717, function () {  
  console.log('node app start at port 1717')
})