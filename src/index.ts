import express from 'express'
import UsersRouter from '~/routes/users.Router'
import databaseServices from '~/services/database.services'
const app = express()
const port = 3000

app.use(express.json())
app.use('/users', UsersRouter)
databaseServices.connect()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
