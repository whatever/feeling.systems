FROM scratch
COPY go/dist/feeling.systems_linux_amd64_v1/feeling.systems plz
CMD ["./plz"]
