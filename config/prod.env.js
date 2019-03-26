'use strict'
let HOST = process.argv.slice(2)[0];
module.exports = {
  NODE_ENV: '"production"',
  HOST: '"'+HOST+'"'
}
