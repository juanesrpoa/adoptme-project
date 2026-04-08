# AdoptMe API

Proyecto de adopcion de mascotas hecho con Node.js y MongoDB.

## Tecnologias

- Node.js
- Express
- MongoDB Atlas
- Swagger
- Docker
- Mocha y Chai para los tests

## Link de la imagen en DockerHub

https://hub.docker.com/r/juanesrpoa/adoptme-project

## Correr con Docker

Bajar la imagen:
docker pull juanesrpoa/adoptme-project

Correr el contenedor:
docker run -p 8080:8080 -e MONGO_URL=tu_mongo_url juanesrpoa/adoptme-project

## Correr sin Docker

Instalar todo:
npm install

Crear el .env con esto:
PORT=8080
MONGO_URL=tu_mongo_url

Iniciar:
npm start

## Tests

npm test

## Rutas

Usuarios:
- GET /api/users
- GET /api/users/:uid
- POST /api/users
- PUT /api/users/:uid
- DELETE /api/users/:uid

Mascotas:
- GET /api/pets
- GET /api/pets/:pid
- POST /api/pets
- PUT /api/pets/:pid
- DELETE /api/pets/:pid

Adopciones:
- GET /api/adoptions
- GET /api/adoptions/:aid
- POST /api/adoptions/:uid/:pid