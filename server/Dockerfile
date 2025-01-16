FROM node:20-alpine as builder

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Instalar dependencias de desarrollo necesarias
RUN apk add --no-cache python3 make g++

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar todas las dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --production

# Copiar la build desde la etapa anterior
COPY --from=builder /usr/src/app/dist ./dist

# Crear directorio para logs
RUN mkdir -p logs

# Asegurar permisos correctos
RUN chown -R node:node /usr/src/app

# Cambiar al usuario node por seguridad
USER node

# Exponer el puerto
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]