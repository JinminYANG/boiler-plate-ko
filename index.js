const express = require('express')  // express 모듈을 가져옴
const app = express()  // 새로운 express app를 만듬
const port = 5000  // 포트 서버

const mongoose = require('mongoose') // 몽고DB를 편하게 사용하는 것을 도와주는 도구
mongoose.connect('mongodb+srv://jinmin:aa7594609*@bolier-plate.qbvvx.mongodb.net/<dbname>?retryWrites=true&w=majority', { // 몽구스에 몽고DB연결
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify:false // 에러같은거 안뜨게 하기위해서 써줌
}).then(() => console.log('MongoDB Connected...')) // 정상적인 연결확인
    .catch(err => console.log(err)) // 연결 실패시 에러 출력


app.get('/', (req, res) => {
    res.send('Hello World!~~안녕하세요~')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})