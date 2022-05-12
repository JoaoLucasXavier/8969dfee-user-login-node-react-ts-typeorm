# User login using node, react, typescript and typeorm

User authentication and authorization with node, react, typescript and typeorm

## Features

- Users register
- User login
- Permissions register
- Roles register
- Products register
- Add User Roles
- Add Permission Roles

## Run App

- `docker-compose up -d`
- `docker exec -it node_8969dfee bash`
- `npm run typeorm migration:run`

## Open in browser

- Back-end: `http://localhost:3001/`
- Front-end:` http://localhost:3000/`

## Endpoints

### User Admin

    POST http://127.0.0.1:3001/permissions HTTP/1.1
    content-type: application/json

    {
        "name":"EVERYTHING",
        "description":"Can everything"
    }

    ###

    POST http://127.0.0.1:3001/roles HTTP/1.1
    content-type: application/json

    {
        "name":"ROLE_ADMIN",
        "description":"admin role",
        "permissions": [
            "a47d2c72-d1be-4c24-a609-bee2c17a610c"
        ]
    }

    ###

    POST http://127.0.0.1:3001/users HTTP/1.1
    content-type: application/json

    {
        "name":"John",
        "username":"john",
        "password": "f928264d",
        "roles": [
            "2e4986a5-d245-4910-8650-3372cef4ffb9"
        ]
    }

    ###

    GET http://127.0.0.1:3001/users/roles HTTP/1.1

### Login

    POST http://127.0.0.1:3001/login HTTP/1.1
    content-type: application/json

    {
        "username":"john",
        "password":"f928264d"
    }

### Product

    @authToken = ******************************************************************************

    POST http://127.0.0.1:3001/product HTTP/1.1
    content-type: application/json
    Authorization: Bearer {{authToken}}
    {
        "name":"Cell phone"
    }

    ###

    GET http://127.0.0.1:3001/product HTTP/1.1
    Authorization: Bearer {{authToken}}


    ###

    GET http://127.0.0.1:3001/product/1 HTTP/1.1
    Authorization: Bearer {{authToken}}
