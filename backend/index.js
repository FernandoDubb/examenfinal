const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const multer = require('multer')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/img', express.static('img'))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Barcelona21..',
  database: 'vet_punto_venta'

})


const storage = multer.diskStorage({
  destination: 'img',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, rows) => {
    if (err) return res.json(err)
    res.json(rows)
  })
})

app.post('/productos', upload.single('foto'), (req, res) => {
  const { nombre, descripcion, precio, estado, categoria } = req.body
  const foto = req.file ? req.file.filename : null

  db.query(
    'INSERT INTO productos (nombre, descripcion, precio, estado, categoria, foto) VALUES (?,?,?,?,?,?)',
    [nombre, descripcion, precio, estado, categoria, foto],
    () => res.json({ ok: true })
  )
})

app.delete('/items/:id', (req, res) => {
  db.query(
    'DELETE FROM productos WHERE id = ?',
    [req.params.id],
    () => res.json({ ok: true })
  )
})

app.listen(3000)
