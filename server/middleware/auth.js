const { User } = require('../models/User');

let auth = (req, res, next) => {

    // 인증 처리를 하는 곳

    // 1. 클라이언트쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 2. 토큰을 복호화 한후 유저를 찾는다.  (유저 모델에서 메소드를 만들어함)
    User.findByToken(token, (err, user) => {
        // 4. 유저가 없으면 인증 실패
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        // 3. 유저가 있으면 인증 성공
        req.token = token; // 리퀘스트에 넣어주는 이유는 index.js에서 사용할 수 있음
        req.user = user;
        next();

    })

}

module.exports = { auth };