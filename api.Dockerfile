FROM node:23-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM node:23-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/doc/api.yaml ./doc/api.yaml
CMD ["node", "dist/main.js"]