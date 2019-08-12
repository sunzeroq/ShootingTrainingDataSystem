//api
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
//允许跨域
app.use(require('cors')())
//连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gundb', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
})

//建立一个model
const Bullet = mongoose.model('Bullet', new mongoose.Schema({
    name: { type: String, unique: true },
    num: { type: String },
    money: {type: String},
}))
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, unique: true},
    password: { type: String,
    set(val) {
        return require('bcrypt').hashSync(val, 10)
    } 
},
}))
const Form = mongoose.model('Ruleform', new mongoose.Schema({
    name: { type: String },
    devtype: { type: String },
    date1: { type: String },
    date2: { type: String },
    content: { type: String },
    number: { type: String },
    text: { type: String },
}))
const Soldier = mongoose.model('Soldier', new mongoose.Schema({
    name: { type: String },
    ordernumber: { type: String },
    higherClass: { type: String },
    basicClass: { type: String },
    targetType: { type: String },
    targetNum: { type: String },
    targetDronetype: { type: String },
    grade: { type: String },
    domains: { type: Array },
    job: { type: String },
}))
//用户登录状态校验
const auth =  async(req, res, next) => {
    //验证token
    const token = String(req.headers.authorization || '').split(' ').pop()
    if(!token){
        return res.status(401).send({
            message: '请先登录'
        })
    }
    const { id } = jwt.verify(token,'miyao')
    req.user = await User.findById(id)
    console.log(req.user)
    await next()
}


app.post('/api/soldierform', auth, async(req, res) =>{
    const data = req.body
    const soldierforms = await Soldier.create(data)
    res.send(soldierforms)
})
app.get('/api/soldierform', async(req, res) =>{
    const soldierforms = await Soldier.find()
    res.send(soldierforms)
})
app.get('/api/soldierform/:id',  async(req,res) =>{
    const soldierforms = await Soldier.findById(req.params.id)
    res.send(soldierforms)
})      
app.delete('/api/soldierform/:id', auth, async(req, res) =>{
    await Soldier.findByIdAndDelete(req.params.id)
    res.send({
        status:true
    })
})
//流程相关
app.post('/api/ruleform', auth,async(req, res) =>{
    const data = req.body
    const ruleforms = await Form.create(data)
    res.send(ruleforms)
})  
app.get('/api/ruleform', auth,async(req, res) => {
    const ruleforms = await Form.find()
    res.send(ruleforms)
})
//流程删除
app.delete('/api/ruleform/:id', auth,async(req, res) =>{
    await Form.findByIdAndDelete(req.params.id)
    res.send({
        status:true
    })
})
//用户展示
app.get('/api/users', async(req,res) => {
    const users = await User.find()
    res.send(users)
})
//注册
app.post('/api/register', async(req, res) =>{
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
    })
    res.send(user)
})
//登录
app.post('/api/login', async(req, res) =>{
    const user = await User.findOne({
        username: req.body.username
    })
    if(!user) {
        return res.status(422).send({
            message: '用户不存在'
        })
    }
    const isPasswordT = require('bcrypt').compareSync(req.body.password,user.password)
    if(!isPasswordT){
        return res.status(422).send({
            message: '密码错误'
        })
    }
    //生成token
    const token = jwt.sign({
        id: String(user._id),
        expiresIn : 60
    }, 'miyao')
    res.json({
        success: true,
        message: 'success',
        token: token
  });
})


//子弹数据创建
app.post('/api/bullets', auth, async(req, res) =>{
    const data = req.body
    const bullets = await Bullet.create(data)
    res.send(bullets)
})  
//子弹数据展示
app.get('/api/bullets',  async(req, res) => {
    const bullets = await Bullet.find()
    res.send(bullets)
})
//删除
app.delete('/api/bullets/:id', auth,async(req, res) =>{
    await Bullet.findByIdAndDelete(req.params.id)
    res.send({
        status:true
    })
})
//子弹详情页查询
app.get('/api/bullets/:id',  async(req,res) =>{
    const bullet = await Bullet.findById(req.params.id)
    res.send(bullet)
})      
//子弹数据修改
app.put('/api/bullets/:id', auth, async(req, res) =>{
    const bullet = await Bullet.findByIdAndUpdate(req.params.id,req.body)
    res.send(bullet)
})  






app.listen(3001, () => {
    console.log('http://localhost:3001/')
});