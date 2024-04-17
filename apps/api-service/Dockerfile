# Development stage
FROM node:20-alpine AS development
ARG APP=api-service
ENV NODE_ENV=development
WORKDIR /usr/src/app/api-service

COPY ./package*.json ./

COPY . .
RUN yarn install

RUN yarn run build

# Production stage
FROM node:16-alpine AS production
ARG APP=MAIN
ENV NODE_ENV=production
WORKDIR /usr/src/app/api-service

COPY ./package*.json ./
RUN yarn install --prod --frozen-lockfile

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "run", "start:$APP"]
