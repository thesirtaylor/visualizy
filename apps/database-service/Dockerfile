FROM node:20-alpine AS base
RUN yarn install

FROM base AS development
ARG APP=database-service
ENV NODE_ENV=development
WORKDIR /usr/src/app/database-service

COPY ./package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build

FROM base AS production
ARG APP=MAIN
ENV NODE_ENV=production
WORKDIR /usr/src/app/database-service
COPY ./package*.json ./
RUN yarn install --prod --frozen-lockfile

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "run", "start:$APP"]
