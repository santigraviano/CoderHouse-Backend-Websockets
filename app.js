const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const bootstrap = require('./bootstrap.js')
const routes = require('./routes.js')
const { products, messages } = require('./model/DB.js')

const PORT = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = new Server(server)

bootstrap(app)

app.use('/', routes)

io.on('connection', socket => {
  
  socket.on('post_product', data => {
    const item = JSON.parse(data)

    products.create(item)
    io.emit('product_added', data)
  })

  socket.on('new_message', message => {
    message = JSON.parse(message)
    messages.create(message)
    io.emit('new_message', JSON.stringify(message))
  })
})

server.listen(PORT, err => {
  if (err) console.log(err)
  console.log(`Listening on port ${ PORT }`)
})