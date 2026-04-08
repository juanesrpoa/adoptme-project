# usamos la imagen oficial de Node.js
FROM node:20-alpine

# creamos la carpeta de trabajo dentro del contenedor
WORKDIR /app

# aqui copiamos los archivos de dependencias
COPY package*.json ./

# instalamos las dependencias
RUN npm install

# copiamos el resto del proyecto
COPY . .

# se expone el puerto
EXPOSE 8080

# comando para iniciar la app
CMD ["node", "src/app.js"]