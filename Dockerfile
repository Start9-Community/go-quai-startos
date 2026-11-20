# go-quai for StartOS: built from a pinned upstream tag and its commit.
# The tag is passed from startos/manifest/index.ts (images['go-quai'].source.dockerBuild.buildArgs).
ARG GO_QUAI_VERSION=v0.56.1
ARG GO_QUAI_COMMIT=5917bf5e2ced1d3f1cafdde6bc6fa3345fb71c3e

# Upstream's own Dockerfile uses golang:1.23, but go.mod declares `go 1.24`,
# so build with 1.24 directly instead of relying on a toolchain download.
FROM golang:1.24-alpine AS builder
ARG GO_QUAI_VERSION
ARG GO_QUAI_COMMIT
RUN apk add --no-cache git make gcc musl-dev
WORKDIR /src
RUN git -c advice.detachedHead=false clone --depth 1 --branch "${GO_QUAI_VERSION}" https://github.com/dominant-strategies/go-quai.git . \
 && git checkout -q "${GO_QUAI_COMMIT}" \
 && test "$(git rev-parse HEAD)" = "${GO_QUAI_COMMIT}"
RUN go mod download && make go-quai

FROM alpine:3.22
RUN apk add --no-cache ca-certificates curl tar zstd
# The base image's CA store is only as current as its last release.
RUN apk upgrade --no-cache ca-certificates ca-certificates-bundle \
 && if [ -f /etc/ssl/certs/ca-certificates.crt.apk-new ]; then mv /etc/ssl/certs/ca-certificates.crt.apk-new /etc/ssl/certs/ca-certificates.crt; fi \
 && ! grep -q MIICTjCCAdOgAwIBAgIKPPYHqWhwDtqLhDAKBggqhkjOPQQDAzBr /etc/ssl/certs/ca-certificates.crt

# go-quai reads VERSION and params/*.json relative to its working directory,
# and writes ./nodelogs there too. Keep the binary's files together in
# /opt/go-quai and send nodelogs to the persistent volume.
WORKDIR /opt/go-quai
COPY --from=builder /src/build/bin/go-quai /usr/local/bin/go-quai
COPY --from=builder /src/VERSION ./VERSION
COPY --from=builder /src/params/genesis_alloc.json ./params/genesis_alloc.json
COPY --from=builder /src/params/forfeiture_addresses.json ./params/forfeiture_addresses.json
RUN ln -s /data/nodelogs /opt/go-quai/nodelogs

COPY docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
COPY bootstrap.sh /usr/local/bin/bootstrap.sh
RUN chmod +x /usr/local/bin/docker_entrypoint.sh /usr/local/bin/bootstrap.sh /usr/local/bin/go-quai
