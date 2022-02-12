/*const jsonServer = require('json-server')
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
})*/


const jsonServer = require('json-server');
const auth = require('json-server-auth')

const server = jsonServer.create();
const router = jsonServer.router('db.json');

const middlewares = jsonServer.defaults({
         logger: true,
		 noCors  :true
    });

const port = process.env.PORT || 3001;
const origineServer_Prod= ['https://enima-eshopping.herokuapp.com' ];
// /!\ Bind the router db to the app
server.db = router.db

// Add headers

 
/*
server.use((req, res, next) => {

  const allowedOrigins = origineServer_Prod;
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
 */


server.use(function (req, res, next) {
  'use strict';

  res.header('Access-Control-Allow-Origin', ['https://enima-eshopping.herokuapp.com']);

  if (req.headers['access-control-request-method']) {
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  }


  if (req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  }
 
  if (req.method === 'OPTIONS') {
      res.sendStatus(200);
  } else  {
      next();
  }
});


// You must apply the auth middleware before the router
server.use(auth)
server.use(middlewares);
server.use(router);

server.listen(port,() => {
  console.log('JSON Server is running')
}) 
