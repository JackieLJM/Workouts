const router = require('koa-router')()
const common = require('../pub/utils/common.js')
const newsBll = require('./../pub/bll/news.js')
const title = '后台管理'

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


router.get('/news', async (ctx, next) => {   
  const userInfo=common.userInfo(ctx, next) 
  let showType='add' 
  let modData = null   
  
  if(ctx.query.act && ctx.query.act==='mod' && ctx.query.id && ctx.query.id*1>0){            
      let _data = await newsBll.singleinfo(ctx)
      if (_data.length>0){
          showType='mod'
          modData= _data[0]
      }      
  }else if(ctx.query.act && ctx.query.act==='del' && ctx.query.id && ctx.query.id*1>0){  
      let result = await newsBll.del(ctx)
  }

  let newsList = await newsBll.listinfo(ctx) 
  await ctx.render('news', {title, userInfo, showType, modData, newsList})
})

router.post('/news', async (ctx, next) => { 
   if(ctx.query.act && ctx.query.act==='mod' && ctx.query.id && ctx.query.id*1>0){      
      let result = await newsBll.mod(ctx) 
      console.log(result)
   }
   else{
      let result = await newsBll.add(ctx) 
   }
   ctx.redirect('/admin/news')  
})



module.exports = router
