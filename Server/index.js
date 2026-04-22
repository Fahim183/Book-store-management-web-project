require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')   // ✅ promise version
const bcrypt = require('bcrypt')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

/* ================= DB CONNECTION (POOL) ================= */
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
})

console.log("MySQL Pool Connected")

/* ================= AUTH ================= */

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).send({ error: "Missing fields" })

    const hashed = await bcrypt.hash(password, 10)

    await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashed]
    )

    res.send({ success: true })

  } catch (err) {
    res.status(400).send({ error: "User already exists" })
  }
})


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).send({ error: "Email and password are required" })

    const [data] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    )

    if (data.length === 0)
      return res.status(404).send({ error: "User not found" })

    const valid = await bcrypt.compare(password, data[0].password)

    if (!valid)
      return res.status(401).send({ error: "Wrong password" })

    res.send({ email: data[0].email })

  } catch (err) {
    console.error('Login error:', err)
    res.status(500).send({ error: "Server error" })
  }
})

app.get('/users/:email', async (req, res) => {
  try {
    const { email } = req.params
    const [data] = await db.query(
      "SELECT id, email FROM users WHERE email = ?",
      [email]
    )

    if (data.length === 0)
      return res.status(404).send({ error: "User not found" })

    res.send(data[0])
  } catch (err) {
    res.status(500).send({ error: "Server error" })
  }
})


/* ================= BLOGS ================= */

app.get('/blogs', async (req, res) => {
  const [data] = await db.query("SELECT * FROM blogs")
  res.send(data)
})

app.get('/blogs/:id', async (req, res) => {
  const [data] = await db.query(
    "SELECT * FROM blogs WHERE id=?",
    [req.params.id]
  )
  res.send(data[0])
})

app.get('/blogs/searched/:title', async (req, res) => {
  const { title } = req.params
  const [data] = await db.query(
    "SELECT * FROM blogs WHERE title LIKE ?",
    [`%${title}%`]
  )
  res.send(data)
})

app.get('/blogs/featured', async (req, res) => {
  const [data] = await db.query("SELECT * FROM blogs")
  res.send(data)
})

app.post('/blogs', async (req, res) => {
  const blog = req.body
  const [result] = await db.query("INSERT INTO blogs SET ?", blog)
  res.send(result)
})

app.delete('/blogs/:id', async (req, res) => {
  const { email } = req.body

  const [data] = await db.query(
    "SELECT * FROM blogs WHERE id=?",
    [req.params.id]
  )

  if (!data[0])
    return res.status(404).send({ error: "Blog not found" })

  if (data[0].userEmail !== email)
    return res.status(403).send({ error: "Not allowed" })

  const [result] = await db.query(
    "DELETE FROM blogs WHERE id=?",
    [req.params.id]
  )

  res.send(result)
})

app.patch('/blogs/:id', async (req, res) => {
  const b = req.body

  const [data] = await db.query(
    "SELECT * FROM blogs WHERE id=?",
    [req.params.id]
  )

  if (!data[0])
    return res.status(404).send({ error: "Blog not found" })

  if (data[0].userEmail !== b.email)
    return res.status(403).send({ error: "Not allowed" })

  const [result] = await db.query(
    `UPDATE blogs SET 
      name=?, title=?, image=?, email=?, short_description=?, 
      detailed_description=?, category=?, userEmail=?, userImg=?, time=? 
      WHERE id=?`,
    [
      b.name, b.title, b.image, b.email,
      b.short_description, b.detailed_description,
      b.category, b.userEmail, b.userImg, b.time,
      req.params.id
    ]
  )

  res.send(result)
})


/* ================= COMMENTS ================= */

app.get('/comments/:blogId', async (req, res) => {
  const [data] = await db.query(
    "SELECT * FROM comments WHERE blogId=?",
    [req.params.blogId]
  )
  res.send(data)
})

app.post('/comments', async (req, res) => {
  const [result] = await db.query(
    "INSERT INTO comments SET ?",
    req.body
  )
  res.send(result)
})


/* ================= WISHLIST ================= */

app.get('/wishlist/:email', async (req, res) => {
  const [data] = await db.query(
    "SELECT * FROM wishlist WHERE wishReq=?",
    [req.params.email]
  )
  res.send(data)
})

app.post('/wishlist', async (req, res) => {
  const [result] = await db.query(
    "INSERT INTO wishlist SET ?",
    req.body
  )
  res.send(result)
})

app.delete('/wishlist/id/:id', async (req, res) => {
  const [result] = await db.query(
    "DELETE FROM wishlist WHERE id=?",
    [req.params.id]
  )
  res.send(result)
})


/* ================= SERVER ================= */

app.get('/', (req, res) => {
  res.send('Server running 🚀')
})

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})