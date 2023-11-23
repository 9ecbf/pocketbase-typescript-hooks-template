FROM alpine:3 AS base
ARG PB_VERSION=0.19.4
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip && \
    unzip pocketbase_${PB_VERSION}_linux_amd64.zip && \
    chmod +x pocketbase && \
    mv pocketbase /usr/local/bin/

FROM oven/bun:1
COPY --from=base /usr/local/bin/pocketbase /usr/local/bin/pocketbase
RUN apt update && \
    apt install git sqlite3 -y && \
    apt clean