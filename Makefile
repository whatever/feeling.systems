EXEC:=go/dist/feeling.systems_linux_amd64_v1/feeling.systems
JS:=js

.PHONY: all docker $(EXEC) $(JS)

all: docker

$(JS): 
	cd js && npm run ayyy

$(EXEC): $(JS)
	cd go && goreleaser --rm-dist --snapshot

docker: $(EXEC)
	docker build -t feeling-systems .
