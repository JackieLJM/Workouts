//https://cnodejs.org/topic/58ac640e7872ea0864fedf90
//https://www.cnblogs.com/zhongweiv/p/nodejs_koa2_webapp.html
//https://www.jb51.net/article/138158.htm

const Koa = require('koa')
const koaStatic=require('koa-static')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')


const config = require('./pub/config/config.js')



const admin = require('./routes/admin')
const reg = require('./routes/reg')
const login = require('./routes/login')
const logout = require('./routes/logout')


const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))


var keys=[];
for(var i=0;i<100000;i++){
	//keys.push('a_'+Math.random());
	keys[i]='a_'+Math.random();
}
app.keys = keys
const sessionConfig = {
  key: 'koa:sess', 
  maxAge: 86400000,  /*一天*/
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
  renew: false,  /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}
app.use(session(sessionConfig, app))



app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))



// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



// routes
app.use(admin.routes(), admin.allowedMethods())

app.use(reg.routes(), reg.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(logout.routes(), logout.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


app.listen(config.SERVER_PORT, () => {
  console.log(`Starting at port ${config.SERVER_PORT}!`)
});



//module.exports = app
