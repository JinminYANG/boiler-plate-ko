const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt의 글자수
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, //빈칸 없애주는 역할
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //일반 유저, 관리자 역할 부여
        type: Number,
        default: 0
    },
    image: String,
    token: { // 유효성 관리 역할
        type: String
    },
    tokenExp: { // 토근 유효기간
        type: Number
    }
})

userSchema.pre('save', function (next) { // pre()는 mongoose에서 가져온 메소드 (index.js에서 user.save()하기 전에 실행하겠다.
    var user = this; // 전달받은 정보(아이디, 비밀번호 등)를 변수에 대입

    if(user.isModified('password')){  // 모델 안에 password가 변환될 때만 실행되게 조건

        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) { // bcrypt 사용법 사이트 참조 https://www.npmjs.com/package/bcrypt    => salt를 이용해 함호화  / genSalt()는 salt를 만드는 함수
            //'salt'는 단방향 해시함수에서 다이제스트를 생성할 때 추가되는 바이트 단위의 임의의 문자열
            // salt와 hash를 혼합하여 암호화된 비밀번호를 생성  / hash만 사용할 경우 보안의 위험
            if(err) return next(err) // 에러면 그냥 돌려보냄

            bcrypt.hash(user.password, salt, function (err, hash) { // hash를 이용해 암호화
                if(err) return next(err) // 에러면 그냥 돌려보냄
                user.password = hash // 비밀번호에 암호화된 것을 넣어줌
                next()
            })
        })
    } else { // 비밀번호를 바꾸는게 아니라 다른 것을 바꿀 때
        next()
    }

})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    
    // plainPassword 1234567   암호화된 비밀번호 $2b$10$ULLaJzgYnhR9kLawEJTHT.eU9QbuoVvsYtaWcnW8TlWsVr9zv.6XO  -> plainPassword를 암호화해서 비교
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if(err) return cb(err)  // 비밀번호가 틀릴 경우
        cb(null, isMatch)   // 비밀번호가 맞을 경우
    })
}
userSchema.methods.generateToken = function (cb) {
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString() ,'secretToken')
    // var token = user._id + 'secretToken' = token         // token을 해석할 때
    // ->
    // 'secretToken' -> user._id           //secretToken을 넣으면 user._id가 나와야함

    user.token = token
    user.save(function (err, user) {
        if(err) return cb(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken = function ( token, cb ) {
    var user = this;

    // 토큰을 복호화(decode)하는 과정
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({ "_id" : decoded, "token" : token }, function (err, user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })

}




const User = mongoose.model('User', userSchema);

module.exports = { User }


















