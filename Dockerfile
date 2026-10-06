FROM quay.io/ukhomeofficedigital/hof-nodejs:d690c4de18477ad310889c272b448341fdc27f5c
USER root

# Update Alpine packages with latest security and bug fixes
RUN apk upgrade --no-cache

# Upgrade npm from the base image to patch vulnerable bundled dependencies.
# npm 12.1.0 bundles tar ^7.5.22 (CVE-2026-73566 is fixed in 7.5.21).
RUN npm install -g npm@12.1.0 && npm --version

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app

COPY --chown=999:998 . /app

RUN yarn install --frozen-lockfile --production && \
    yarn run postinstall \
    && yarn cache clean

HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
