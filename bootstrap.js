const path = require('path')
const express = require('express')
const VIEW_ENGINE = process.env.VIEW_ENGINE || 'handlebars'

module.exports = app => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/static', express.static(path.join(__dirname, 'public')))
  
  const { engine } = require('express-handlebars')
  app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutDir: path.join(__dirname, 'views/handlebars/layouts'),
    partialsDir: path.join(__dirname, 'views/handlebars/partials')
  }))

  app.set('views', path.join(__dirname, `views/${ VIEW_ENGINE }`))
  app.set('view engine', VIEW_ENGINE)
}