# Etapa 1: Construir la aplicación
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código y construir
COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
# Copiar los archivos estáticos construidos desde la etapa 1
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (para soportar React Router SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 (puerto interno estándar de Nginx, EasyPanel lo mapeará)
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
