EXEC:=go/dist/feeling.systems_linux_amd64_v1/feeling.systems
.PHONY: all docker $(EXEC)

all: docker

$(EXEC):
	cd go && goreleaser --rm-dist --snapshot

docker: $(EXEC)
	docker build -t feeling-systems .
