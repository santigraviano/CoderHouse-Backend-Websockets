const { products, messages } = require('./model/DB.js')
const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  const items = products.all()
  const chat = messages.all()
  res.render('index', { items, chat })
})

router.post('/productos', (req, res) => {
  products.create(req.body)
  res.redirect('/')
})

router.get('/productos', (req, res) => {
  const items = products.all()
  res.render('items', { items })
})

module.exports = router