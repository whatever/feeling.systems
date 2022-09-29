EXEC:=go/dist/feeling.systems_linux_amd64_v1/feeling.systems
JS:=js

.PHONY: all docker $(EXEC) $(JS) exec

all: docker

$(JS): 
	cd js && npm run ayyy

exec: $(EXEC)
	echo > /dev/null

$(EXEC): $(JS)
	cd go && goreleaser --rm-dist --snapshot

docker: $(EXEC)
	docker build -t feeling-systems .
