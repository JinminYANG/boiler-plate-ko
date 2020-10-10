const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema)

module.exports = { User }