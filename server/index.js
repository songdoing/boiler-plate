const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const {auth} = require("./middleware/auth")
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true})); 
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true,  useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World! I am Jenny.'))

//register를 위한 router
app.post('/api/users/register', (req, res) => {
    //회원가입시 필요한 정보를 client가져오면 db로 넣어준다

    const user =  new User(req.body)//bodyparser에 의해 이 안에 이름,비번들어감
    //mongoDB save함수
    user.save ((err, userInfo) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success : true
        })

    })
})


//login을 위한 router
app.post('/api/users/login', (req,res) => {
    //요청된 이멜이 db에 있는지 찾는다. mongoDB의 findOne함수
    User.findOne({ email : req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess :false,
                message : "No registered email"
            })
        }
    //요청된 이멜이 맞다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess : false, message : "does not matched."})
    //비밀번호까지 맞다면 토큰을 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                //token를 저장(쿠키, 로컬스토리지)장단점있음
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess : true, userId : user._id })
            })

        })
    })    
})

//auth는 middleware임.
//role = 0 이면 일반유저
app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 왔다면, 미들웨어를 통과하고 authentication이 true라는 뜻
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth :true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })
})

//logout router
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id : req.user._id}, 
        {token:""},
        (err, user) => {
            if(err) return res.json({success : false, err});
            return res.status(200).send({
                success : true
            })
        })
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))