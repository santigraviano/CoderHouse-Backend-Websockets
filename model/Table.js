const fs = require('fs')
const path = require('path')

class Table {
  constructor(table) {
    this.id = 0
    this.path = path.join(__dirname, `/db/${table}.json`)

    // If file exists read it and assign its value to this.items
    if (fs.existsSync(this.path)) {
      this.items = JSON.parse(fs.readFileSync(this.path))

      // If there are items assign this.id to be equal to the last item's id
      if (this.items.length > 0) {
        this.id = parseInt(this.items[this.items.length - 1].id)
      }

    }
    // If file does not exists create the file with an empty array
    else {
      fs.writeFileSync(this.path, JSON.stringify([]))
      this.items = []
    }
  }

  persist() {
    fs.writeFileSync(this.path, JSON.stringify(this.items))
  }

  all() {
    return this.items
  }

  create(data) {
    this.id += 1
    const item = {
      id: this.id,
      ...data
    }
    this.items.push(item)
    this.persist()
    return item
  }

  find(id) {
    const item = this.items.find(item => item.id == id)

    if (item) return item
    else throw Error('Item no encontrado')
  }

  edit(id, data) {
    try {
      let item = this.find(id)
      const index = this.items.indexOf(item)
      item = { ...item, ...data }
      this.items.splice(index, 1, item)
      this.persist()
    }
    catch (err) {
      throw Error(err.message)
    }
  }

  delete(id) {
    try {
      const item = this.find(id)
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
      this.persist()
    }
    catch (err) {
      throw Error(err.message)
    }
  }
}

module.exports = Table