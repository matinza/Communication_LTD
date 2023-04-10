const express = require("express")
const app = express()
const cors = require("cors")
const db = require('./db/index');

const port = 4000

app.use(express.json())
app.use(cors())

db.connectCommunication_LTD_DB()

app.get("/register", cors(), async (req, res) => {
  result = db.query(`INSERT INTO users 
                        (first_name,
                         last_name,
                         company_id) VALUES
                         ('${req.first_name}',
                          '${req.last_name}',
                           '${req.email}')`);

  result.then(() => {
    res.status(200).json({
      answer: "success"
    })
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})