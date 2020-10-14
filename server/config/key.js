if(process.env.NODE_ENV === 'production') {   // process.env.NODE_ENV는 환경변수 (local인지 deploy 인지)
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}