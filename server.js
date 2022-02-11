const jsonServer = require('json-server')
const auth = require('json-server-auth')
const port = process.env.PORT || 3001;


const app = jsonServer.create()
const router = jsonServer.router('db.json')

// /!\ Bind the router db to the app
app.db = router.db

// You must apply the auth middleware before the router
app.use(auth)
app.use(router)
app.listen(port,() => {
  console.log('JSON Server is running')
})