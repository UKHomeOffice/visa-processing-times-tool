FROM quay.io/ukhomeofficedigital/hof-nodejs:d690c4de18477ad310889c272b448341fdc27f5c
USER root

# Update Alpine packages with latest security and bug fixes
RUN apk upgrade --no-cache

# Upgrade npm from the base image and patch fixable bundled dependencies.
# `http-cache-semantics` has no published fixed version and requires an exemption.
RUN npm install -g npm@12.1.0 && \
        mkdir -p /tmp/npm-patches \
            /usr/local/lib/node_modules/npm/node_modules/brace-expansion \
            /usr/local/lib/node_modules/npm/node_modules/undici && \
        npm pack --pack-destination /tmp/npm-patches \
            brace-expansion@5.0.12 \
            undici@6.28.1 && \
        rm -rf /usr/local/lib/node_modules/npm/node_modules/brace-expansion \
            /usr/local/lib/node_modules/npm/node_modules/undici && \
        mkdir -p /usr/local/lib/node_modules/npm/node_modules/brace-expansion \
            /usr/local/lib/node_modules/npm/node_modules/undici && \
        tar -xzf /tmp/npm-patches/brace-expansion-5.0.12.tgz \
            --strip-components=1 \
            -C /usr/local/lib/node_modules/npm/node_modules/brace-expansion && \
        tar -xzf /tmp/npm-patches/undici-6.28.1.tgz \
            --strip-components=1 \
            -C /usr/local/lib/node_modules/npm/node_modules/undici && \
        rm -rf /tmp/npm-patches && \
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

USER root

# npm is only needed during image construction. Removing it also removes its
# bundled http-cache-semantics package from the runtime image.
RUN rm -rf /usr/local/lib/node_modules/npm

USER 999

HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
