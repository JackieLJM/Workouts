const mysqlHelper = require('./../db/mysql-helper.js')

const news = {

  /**
   * 增加一条数据
   * @param  {object} args  参数
   * @return {object}       结果
   */
  async add ( args ) {
    let sql = 'INSERT INTO news(title, info) VALUES(?, ?)'
    let params = [args.title, args.info]
    let result = await mysqlHelper.query(sql, params)
    return result
  },
 
  async del( args ){
    let sql = 'DELETE FROM news WHERE Id = ?'
    let params = [args.id]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  async mod( args ){
    //let sql = `update news set title='${args.title}',info='${args.info}' where Id = ${args.id}`    
    let sql = 'update news set title = ?, info = ? where Id = ?' 
    let params = [args.title, args.info, args.id ]
    let result = await mysqlHelper.query(sql, params)
    return result
  }, 
  async singleinfo( args ){
    let sql = 'select * from news where Id = ?'
    let params = [args.id]
    let result = await mysqlHelper.query(sql, params)
    return result
  }, 
  async listinfo( args ){
    let sql = 'select * from news'
    let params = []
    let result = await mysqlHelper.query(sql, params)
    return result
  }, 

}

module.exports = news