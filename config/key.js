if(process.env.NODE_ENV === 'production') { //만약 환경변수가..
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}