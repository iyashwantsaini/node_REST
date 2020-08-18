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

## Endpoints

- /products/{get,post}
- /products/\_prodid{patch,delete}
- /orders/{get,post}
- /orders/\_prodid{patch,delete}
- /users/signup{post}

## Features

- GET / get

```
To Access :
{url}/
```

- ADD / post

```
To Access :
{url}/
```

```
To Add :

Eg. Add product :
{
    "name":"_name",
    "price":_price
}

Eg. Add Order :
Due to multer we'll now need to send FORMdata instead
Send file (img) alone
{
    "productID":"_prodid",
    "quantity":_quantity
}

```

- UPDATE / patch

```
To Access :
{url}/_product_id
```

```
To Update :
(pass array as we are iterating it to dynamically get only required params)
[
    {
        "propName":"_prop_you_want_to_edit","value":"_value_of_prop_u_wanna_set"
    }
]
```

```
Eg. Update Book Name :

GoTo : {url}/_product_id

[
    {
        "propName":"Lord Of Rings",
        "value":"Lord Of The Rings"
    }
]

```

- DELETE / delete

```
To Delete :
{url}/_product_id
```

- Add User / signup

```
{
    "email":"test@test.com",
    "password":"tester"
}
```

- Get JWT / login

```
{
    "email":"test@test.com",
    "password":"tester"
}

A JWT is returned which can be saved by the client for further requests.
```

- For all Requests {get/post}
```
Send token with the headers in your request to API.
Authorization: Bearer your_token
```

## Asset Upload

- Using MULTER (img upload)

## User Auth

- REST : Stateless : no "session".
- Client sends auth data.
- Server provides a token.
- Client stores the token.
- Client with a token can access API.
- Client sends a token with every request.
- Token : JSON data + Signature : Json Web Token (JWT)
- Try decoding the received token on [JWT.IO](jwt.io)

## Salting

- Adding random strings to our password before hashing.
- This way no one can search a hash dictionary on internet to get translation for our hash.

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
        "MONGO_DB_NAME":"_dbname",
        "JWT_KEY":"xxxxxxxx"
    }
}
```

## Status Codes

- 200 : operation successful
- 201 : asset created successfully
- 404 : not found
- 500 : unexpected error in fulfilling request
- 409 : conflict
- 422 : unprocessable entity
- 401 : unauthorized client

## Packages

- express
- nodemon( for autorestart )
- morgan ( for login )
- body-parser( parsing bodies to make them readable )
- mongoose ( unofficial mongo client )
- multer( can also parse incoming FormData Bodies having images etc.)
- bcrypt( to hash passwords for security )
- jsonwebtoken( to create a JWT for user auth)
