# Usamos una imagen base que incluya Node.js
FROM node:20

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Instalamos las dependencias del proyecto
RUN npm install

# Construimos la aplicación de React para producción
RUN npm run build

# Exponemos el puerto en el que se ejecutará la aplicación de React
EXPOSE 5173

# Comando para iniciar la aplicación de React
CMD ["npm", "start"]