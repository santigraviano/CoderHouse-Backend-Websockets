const Table = require('./Table.js')

class DB {
  constructor() {
    this.products = new Table('products')
    this.messages = new Table('messages')
  }
}

module.exports = new DB()