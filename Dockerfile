FROM quay.io/ukhomeofficedigital/hof-nodejs:d690c4de18477ad310889c272b448341fdc27f5c
USER root

# Update Alpine packages with latest security and bug fixes
RUN apk upgrade --no-cache

# Upgrade npm from the base image and patch fixable bundled dependencies.
# `http-cache-semantics` has no published fixed version and requires an exemption.
RUN npm install -g npm@12.1.0 && \
        npm install --prefix /usr/local/lib/node_modules/npm --no-save --package-lock=false --ignore-scripts \
            brace-expansion@5.0.12 \
            undici@6.28.1 && \
        npm --version

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
