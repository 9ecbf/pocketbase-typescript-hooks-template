FROM alpine:3 AS base
ARG PB_VERSION=0.19.4
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip && \
    unzip pocketbase_${PB_VERSION}_linux_amd64.zip && \
    chmod +x pocketbase

FROM oven/bun:1 AS build
WORKDIR /pb
COPY package.json bun.lockb ./
RUN bun install --production
COPY migrations migrations
COPY public public
COPY views views
COPY src src
RUN bun run build --minify

FROM alpine:3 AS run
WORKDIR /pb
COPY --from=base /pocketbase /usr/local/bin/pocketbase
COPY --from=build /pb/node_modules node_modules
COPY --from=build /pb/pb_data/pb_migrations pb_migrations
COPY --from=build /pb/pb_public pb_public
COPY --from=build /pb/pb_data/pb_hooks pb_hooks
ENTRYPOINT pocketbase serve --http=:8090 --dir=. --hooksDir=./pb_hooks --migrationsDir=./pb_migrations