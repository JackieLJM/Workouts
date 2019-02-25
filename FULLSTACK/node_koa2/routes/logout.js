const router = require('koa-router')()
const retCode = require('./../pub/utils/retcode.js')

router.prefix('/logout')

router.get('/', async (ctx, next) => {
  	ctx.session = null
  	ctx.redirect('/login')
})

router.post('/', async (ctx, next) => {  
  ctx.session = null
  let result = {
    code: retCode.Success,    
    data: null
  }
  ctx.body = result  
})

module.exports = router