# 1-bosqich: Build qilish
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2-bosqich: Nginx orqali xizmat ko'rsatish
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Agar Nginx config ishlatsangiz pastdagi qatorni oching:
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]