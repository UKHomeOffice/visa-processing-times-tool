FROM node:24.22.2-alpine3.24@sha256:9279cf6e97dd0c1e0ea106153c2847a23a99bac3a588f7eb564d1f54eb3c92af

USER root

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
