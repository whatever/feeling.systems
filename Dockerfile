# Self-contained multi-stage build so `docker build .` works from a clean
# checkout without needing goreleaser + npm on the host. The webpack bundle
# under go/server/static/ is committed, so we only need to compile the Go
# binary here.

FROM golang:1.23-alpine AS build
WORKDIR /src
COPY go/ ./go/
WORKDIR /src/go
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/plz ./cmd

FROM scratch
COPY --from=build /out/plz /plz
EXPOSE 80
ENTRYPOINT ["/plz"]
