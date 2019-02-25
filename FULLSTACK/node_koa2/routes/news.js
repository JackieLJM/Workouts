const router = require('koa-router')()
const common = require('../pub/utils/common.js')
const newsBll = require('./../pub/bll/news.js')
const title = '新闻后台管理'

router.prefix('/news')
router.get('/', async (ctx, next) => {   
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

router.post('/', async (ctx, next) => { 
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
