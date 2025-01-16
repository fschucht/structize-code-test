FROM node:23.6.0 AS base
ARG APP_NAME
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack install
RUN pnpm install --frozen-lockfile
COPY . .

FROM base AS next
ARG APP_NAME
ENV APP_NAME="$APP_NAME"
RUN pnpm run build --filter="$APP_NAME"
RUN cp ./apps/$APP_NAME/.env.docker.example ./apps/$APP_NAME/.env
EXPOSE 3000
CMD pnpm run prod --filter="$APP_NAME"

FROM base AS worker
ARG APP_NAME
ENV APP_NAME="$APP_NAME"
RUN cp ./apps/$APP_NAME/.env.docker.example ./apps/$APP_NAME/.env
CMD pnpm run prod --filter="$APP_NAME"
