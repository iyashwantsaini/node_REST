# REST API

Node.js | Express.js | mongoDB | REST API

- REST : Representational State Transfer.
- RESTful API's are Stateless Backends.
- GET, POST, PUT, PATCH, DELETE.
- Data can be JSON, XML, URLEncoded, FormData.

## Contraints

- Client-Server Architecture.
- Stateless.
- Cacheability.
- Layered System.
- Uniform Interface.
- Code on Demand(optional).

## Features

- GET / get
- ADD / post
- UPDATE / patch
- DELETE / delete

## CORS

- CORS : Cross-Origin Resource Sharing
- If CLIENT request is from same SERVER : SUCCESS.
- If CLIENT request is from diff SERVER : FAILURE.
- Send correct headers to overcome CORS.

## .ENV Variables

- Create a new file nodemon.json : 

```
{
    "env":{
        "MONGO_PASS":"_pass",
        "MONGO_DB_NAME":"_dbname"
    }
}
```

## Packages

- express
- nodemon( for autorestart )
- morgan ( for login )
- body-parser( parsing bodies to make them readable )
- mongoose ( unofficial mongo client )
