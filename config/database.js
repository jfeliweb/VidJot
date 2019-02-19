if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://jeazy:Feli2046$@ds341825.mlab.com:41825/vidjot-prod'}
} else {
  module.exports = {mongoURI: 'mongodb://mongo:27017/vidjot-dev'}
}