const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true})); 
//application/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://songdoing:mui@6397@boilerplate-t4mes.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser : true,  useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World! I am Jenny.'))

//register를 위한 router
app.post('/register', (req, res) => {
    //회원가입시 필요한 정보를 client가져오면 db로 넣어준다

    const user =  new User(req.body)//bodyparser에 의해 이 안에 이름,비번들어감
    //mongoDB save함수
    user.save((err, userInfo) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success : true
        })
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))