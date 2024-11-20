FROM node:22.9-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM node:22.9-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/doc/api.yaml ./doc/api.yaml
CMD ["node", "dist/src/main.js"]