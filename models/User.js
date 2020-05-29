const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type:String,
        maxlength : 50
    },
    email : {
        type : String,
        trim:true,
        unique :1
    },
    password : {
        type:String,
        minlength : 5
    },
    lastname : {
        type:String,
        maxlength : 50
    },
    role : {
        type:Number,
        default : 0
    },
    image : String,
    token : {
        type:String
    },
    tokenExp : {
        type:Number
    }

})

//mongoose에서 가져온 pre()함수인데, save함수(index.js) 하기 전에 하겠다
userSchema.pre('save', function(next){
    var user = this;
    //password를 수정할때만 실행한다
    if(user.isModified('password')) {
        //비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                // Store hash in your password DB.
                user.password = hash
                next();
            });
        });
    } else {
        next();
    }    
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    var user = this;
    //plainPassword =  암호화된 비번 인지 확인할 것
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) { 
        if(err) return cb(err);
            cb(null, isMatch);
    }) 
}

userSchema.methods.generateToken = function(cb) {
    var user=this;
    //jsonwebtoken 을 이용해서 token 만들기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
     //user._id +  secretToken = token 이 되고, token과 secretToken으로 user._id를 만들수 있다.
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    })
}

const User = mongoose.model('User', userSchema )

module.exports = {User}