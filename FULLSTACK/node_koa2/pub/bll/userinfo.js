const usermodel = require('./../model/userinfo.js')
const commom = require('./../utils/common.js')

const userinfo = {

  /**
   * 注册
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async register ( ctx ) {
    let form = ctx.request.body
    
    const args = {
        username: form.username,
        userpass: form.userpass
    }
        
    let result = {
        code: commom.retCode.Success,    
        data: null
    }
    
    //验证非空
    if(!args.username || !args.userpass){
        result.code = commom.retCode.ArgsError        
        return result
    }

    //根据用户名得到用户数量
    let userNumResult = await usermodel.getCountByUserName(args)

    //用户名已被注册
    if(userNumResult[0].UserNum > 0){
        result.code = commom.retCode.UserExisted        
        return result
    }

    //插入注册数据
    let userResult = await usermodel.add(args)

    if(userResult.insertId <= 0){
        result.code = retCode.Fail        
        return result
    }

    return result
  },

  /**
   * 登录
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async login ( ctx ) {
    let form = ctx.request.body
    
    const args = {
        username: form.username,
        userpass: form.userpass
    }
        
    let result = {
        code: commom.retCode.Success,    
        data: null
    }
    
    //验证非空
    if(!args.username || !args.userpass){
        result.code = commom.retCode.ArgsError        
        return result
    }

    //根据用户名得到用户信息
    let userResult = await usermodel.getByUserName(args)

    //用户不存在
    if(userResult.length == 0){
        result.code = commom.retCode.UserNotExist        
        return result
    }
    
    //用户名或密码错误
    if(userResult[0].UserName != args.username || userResult[0].UserPass != args.userpass){
        result.code = commom.retCode.UsernameOrPasswordError        
        return result
    }

    //将用户ID存入Session中    
    ctx.session = {id: userResult[0].Id, username: userResult[0].UserName}
    ctx.session.isLogin = true
    return result
  },
  

}

module.exports = userinfo