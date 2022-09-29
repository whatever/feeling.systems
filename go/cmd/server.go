package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/whatever/feeling.systems/go/server"

	_ "embed"
)

// Globals

var (
	port     = flag.Int("port", 80, "number of port")
	waitTime = flag.Int("wait-time", 69*60, "number of seconds to wait")
)

func main() {
	flag.Parse()

	fmt.Println("port ........", *port)
	fmt.Println("wait time ...", *waitTime)

	dur := time.Duration(*waitTime) * time.Second
	handler := server.NewServer(dur)

	log.Println(http.ListenAndServe(fmt.Sprintf(":%d", *port), handler))
}
