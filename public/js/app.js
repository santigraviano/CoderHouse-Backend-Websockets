const socket = io()

// Retorna una función
const get_template = async (url) => {
  const fetch_template = await fetch(url)
  const template = await fetch_template.text()
  return Handlebars.compile(template)
}

socket.on('products', async (products) => {
  products = JSON.parse(products)

  const item_template = await get_template('/static/templates/item.hbs')
  const $tbody = document.getElementById('items_tbody')

  for (const product of products) {
    const $item = document.createElement('tr')
    $item.innerHTML = item_template(product)
    $tbody.appendChild($item)
  }
})

$form = document.getElementById('add_product_form')

$form.addEventListener('submit', e => {
  e.preventDefault()

  product = {}

  product.title = document.getElementById('product_title').value
  product.price = document.getElementById('product_price').value
  product.thumbnail = document.getElementById('product_thumbnail').value

  socket.emit('post_product', JSON.stringify(product))
})

socket.on('product_added', async (product) => {
  product = JSON.parse(product)

  const $tbody = document.getElementById('items_tbody')
  const $item = document.createElement('tr')

  const item_template = await get_template('/static/templates/item.hbs')

  $item.innerHTML = item_template(product)

  $tbody.appendChild($item)
})

$chat_form = document.getElementById('chat_form')

$chat_form.addEventListener('submit', e => {
  e.preventDefault()
  email = document.getElementById('email').value
  $message = document.getElementById('message')
  message = $message.value

  if (!email) {
    alert('Ingresa un correo electrónico.')
    return
  }

  if (!message) {
    alert('Ingresa un mensaje.')
    return
  }

  $message.value = null

  socket.emit('new_message', JSON.stringify({ email, message, date: new Date().toLocaleString() }))
})

socket.on('new_message', async (message) => {
  message = JSON.parse(message)

  $chats = document.getElementById('chats')
  $message = document.createElement('div')

  const message_template = await get_template('/static/templates/message.hbs')

  $message.innerHTML = message_template(message)

  $chats.appendChild($message)
})