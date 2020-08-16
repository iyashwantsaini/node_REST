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
