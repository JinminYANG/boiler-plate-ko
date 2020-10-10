const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt의 글자수


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
    }

})


const User = mongoose.model('User', userSchema)

module.exports = { User }