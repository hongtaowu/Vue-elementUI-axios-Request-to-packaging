const client = require('scp2');
const ora = require('ora')
const spinner = ora("uploading for production...");
spinner.start()
client.scp("../byton-web/byton-supplyonline",{
    host:"10.245.38.109",
    username:"covapp",
    password:"123qwe",
    path:"/a01/apps/byton-sol/tomcat/webapps/byton-supplyonline",
  },function(err){
    if(err){
        spinner.stop()
        console.log(err)
    }else{
        spinner.stop()
        console.log('文件上传服务器成功')
    }
  })