const express = require('express')  // express 모듈을 가져옴
const app = express()  // 새로운 express app를 만듬
const port = 5000  // 포트 서버
const bodyParser = require('body-parser'); // 다운받은 body-parser을 가져옴
const cookieParser = require('cookie-parser'); // 토큰을 저장할 저장소
const config = require('./config/key');

const { auth } = require('./middleware/auth');
const { User } = require("./models/User"); // User 모델만들어 놓은것을 가져옴


//bodyParser는 클라이언트에서 오는 정보를 서버에서 분석해서 가져올수 있게 해주는 것
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extends: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose = require('mongoose') // 몽고DB를 편하게 사용하는 것을 도와주는 도구
mongoose.connect(config.mongoURI, { // 몽구스에 몽고DB연결
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify:false // 에러같은거 안뜨게 하기위해서 써줌
}).then(() => console.log('MongoDB Connected...')) // 정상적인 연결확인
    .catch(err => console.log(err)) // 연결 실패시 에러 출력


app.get('/', (req, res) => {
    res.send('Hello World!~~')
})

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요 ~")
})


app.post('/api/users/register', (req, res) => {

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

app.post('/api/users/login', (req, res) => {

    // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email:req.body.email }, (err, user) => { // findOne()은 몽고DB에서 제공하는 메소드
        if(!user){ // user에 정보가 없다면
            return res.json({
                loginSuccess: false,
                message : "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        // 2. 요쳥된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
        user.comparePassword( req.body.password, (err, isMatch ) => {  // comparePassword는 직접 만든 함수 -> user.js에 생성
            if(!isMatch) // 비밀번호가 맞지 않다면
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

        // 3. 비밀번호 까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // 토큰을 저장한다. 어디에 ? 쿠키, 토컬스토리지 등
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId : user._id })
            })
        })
    })
})

// isAdmin 참고 예시
// role 1 -> Admin       role 2 -> 특정 부서 Admin
// role 0 -> 일반유저      role 0이 아니면 관리자
app.get('/api/users/auth', auth , (req, res) => {

    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })



})


app.get('/api/users/logout', auth, (req, res) => {   // 로그아웃 Routh(라우트)

    User.findOneAndUpdate({ _id : req.user._id },
        { token : ""}
        , (err, user) =>{
        if(err) return res.json({ success : false, err });
        return res.status(200).send({
            success : true
        })
    })

})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})











