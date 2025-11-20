import express from "express"

const app = express()

app.get("/", (req, res) => {
  return res.send("ok")
})

app.listen(5000)