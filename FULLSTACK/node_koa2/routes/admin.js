const router = require('koa-router')()
const common = require('../pub/utils/common.js')
const newsRouter = require('./news.js')
const title = '后台管理首页'

router.prefix('/admin')
/*
const userAuth = (ctx, next) => {
  let isLogin = ctx.session.isLogin
  if(isLogin){
      return next()
  }else{ctx.redirect('/login')} 
}
router.use('/', userAuth)
*/

router.use('/', common.userAuth)


router.get('/', async (ctx, next) => {  
    const userInfo=common.userInfo(ctx, next)   
    await ctx.render('index', { title,userInfo })
})



router.use(newsRouter.routes(),newsRouter.allowedMethods())



module.exports = router
