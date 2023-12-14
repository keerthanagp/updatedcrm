const express = require('express') 
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const path = require('path')
const PORT = process.env.PORT || 3000
const cors= require('cors')

// Connect to database
connectDB()

const app = express()
app.use(cors())

app.use(express.json())


app.use(express.urlencoded({ extended: false }))

// Routes endpoints
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
 
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend','build','index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' })
  })
}

app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
