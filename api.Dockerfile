FROM node:22-alpine AS build
ENV IS_CONTAINER=true
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/doc/api.yaml ./doc/api.yaml
CMD ["node", "dist/src/main.js"]