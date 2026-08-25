# Etap 1: Instalacja zależności
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# Etap 2: Build aplikacji.
# Brak zmiennych VITE_*/build-arg — URL backendu jest wpisany na stałe
# w src/app.ts (const url_backend), więc build nie zależy od żadnych sekretów.
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN rm -rf dist node_modules/.vite

RUN npm run build

# Etap 3: Serwowanie statyków przez nginx
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY infra/dockerfiles/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
