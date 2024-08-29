const express = require('express')
const cors = require('cors');
require("./db_conn.js");

const app = express();
const port = 5000

//middlewares
app.use(cors())
app.use(express.json())

//Available routes
app.use('/api/auth',require('./routes/userAuth.js'))
app.use('/api/notes',require('./routes/notesAuth.js'))

app.listen(port, () => {
  console.log(`Example app available at http://localhost:${port}`)
})