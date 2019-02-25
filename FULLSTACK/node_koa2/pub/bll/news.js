const newsmodel = require('./../model/news.js')
const commom = require('./../utils/common.js')

const news = {

  /**
   * 注册
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async add ( ctx ) {
    let form = ctx.request.body    
    const args = {
        title: form.title,
        info: form.info
    }        
    let result = {
        code: commom.retCode.Success,    
        data: null
    }    
    //验证非空
    if(!args.title || !args.info){
        result.code = commom.retCode.ArgsError        
        return result
    } 
    //插入数据
    let addResult = await newsmodel.add(args)
    if(addResult.insertId <= 0){
        result.code = commom.retCode.Fail        
        return result
    }
    return result
  },
  async mod ( ctx ) {
    let form = ctx.request.body    
    const args = {
    	id:form.modid,
        title: form.title,
        info: form.info
    }        
    let result = {
        code: commom.retCode.Success,    
        data: null
    }    
    //验证非空
    if(!args.id|| !args.title || !args.info){
        result.code = commom.retCode.ArgsError        
        return result
    }    

    //修改数据
    let modResult = await newsmodel.mod(args)   
    if(modResult.affectedRows <= 0){
        result.code = commom.retCode.Fail        
        return result
    }
    return result
  },
  async del ( ctx ) {
    const args = {id:ctx.query.id}        
    let result = await newsmodel.del(args)     
    return result
  },
  
  async listinfo ( ctx ) {  
    const args = {}        
    let result = await newsmodel.listinfo(args)  
    return result
  },
  async singleinfo ( ctx ) {
    const args = {id:ctx.query.id}        
    let result = await newsmodel.singleinfo(args)     
    return result
  },
  
  

}

module.exports = news