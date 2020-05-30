const { User } = require('../models/User');

let auth = (req, res, next) => {

    //1.클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    //2.토큰을 복호화한 후, user를 찾는다.
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth:false, error : true});

        req.token = token; //auth.js에서 받을수 있도록..
        req.user = user;
        next();
    })
    //3. user가 있으면 ok

    //4. 없으면 no
}

module.exports = {auth};