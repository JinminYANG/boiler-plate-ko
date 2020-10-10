const express = require('express')  // express 모듈을 가져옴
const app = express()  // 새로운 express app를 만듬
const port = 5000  // 포트 서버
const bodyParser = require('body-parser'); // 다운받은 body-parser을 가져옴

const config =require('./config/key');

const { User } = require("./models/User"); // User 모델만들어 놓은것을 가져옴


//bodyParser는 클라이언트에서 오는 정보를 서버에서 분석해서 가져올수 있게 해주는 것
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extends: true}));
//application/json
app.use(bodyParser.json());



const mongoose = require('mongoose') // 몽고DB를 편하게 사용하는 것을 도와주는 도구
mongoose.connect(config.mongoURI, { // 몽구스에 몽고DB연결
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify:false // 에러같은거 안뜨게 하기위해서 써줌
}).then(() => console.log('MongoDB Connected...')) // 정상적인 연결확인
    .catch(err => console.log(err)) // 연결 실패시 에러 출력


app.get('/', (req, res) => {
    res.send('Hello World!~~')
})

app.post('/register', (req, res) => {

    // 회원 가입 할때 필요한 정보들을 클라이언트에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.

    const user = new User(req.body) // req.body에는 클라이언트에서 작성된 id나 password값이 들어있다.

    user.save((err, userInfo) => { // save는 몽고DB에서 오는 메소드
        if(err) return res.json({success : false, err})
        return res.status(200).json({ // status는 성공을 암시
            success: true
        })
    })

})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})