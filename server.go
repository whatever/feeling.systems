package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"net/http"
	"sync"
	"time"

	_ "embed"
)

type Touch struct {
	Addr  string
	When  time.Time
	Mutex sync.Mutex
}

type TouchResponse struct {
	Last      string `json:"last"`
	Addr      string `json:"addr"`
	When      int64  `json:"when"`
	ThoughtOf bool   `json:"thoughtof"`
}

// Globals

var (
	LastTouch Touch
	port      = flag.Int("port", 80, "number of port")
	waitTime  = flag.Int("wait-time", 69*60, "number of seconds to wait")
)

//go:embed index.html
var IndexHtml string

//go:embed favicon.ico
var FavIconIco string

func main() {

	flag.Parse()

	fmt.Println("port ........", *port)
	fmt.Println("wait time ...", *waitTime)

	mux := http.NewServeMux()

	mux.HandleFunc("/whoami", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, r.RemoteAddr)
	})

	mux.HandleFunc("/last", func(w http.ResponseWriter, r *http.Request) {
		var response TouchResponse
		response.Addr = r.RemoteAddr
		response.Last = LastTouch.Addr
		response.When = LastTouch.When.Unix()
		encoded, _ := json.Marshal(response)
		fmt.Fprint(w, string(encoded))
	})

	mux.HandleFunc("/love", func(w http.ResponseWriter, r *http.Request) {

		last := LastTouch.When
		tenago := time.Now().UTC().Add(-time.Duration(*waitTime) * time.Second)
		lastPerson := LastTouch.Addr

		// Lock and modify last touch
		if r.RemoteAddr != LastTouch.Addr {
			LastTouch.Mutex.Lock()
			LastTouch.Addr = r.RemoteAddr
			LastTouch.When = time.Now().UTC()
			LastTouch.Mutex.Unlock()
		}

		var response TouchResponse
		response.Addr = r.RemoteAddr
		response.Last = lastPerson
		response.When = LastTouch.When.Unix()
		response.ThoughtOf = last.After(tenago)

		encoded, _ := json.Marshal(response)
		fmt.Fprint(w, string(encoded))
	})

	mux.HandleFunc("/favicon.ico", func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprint(w, FavIconIco)
	})

	mux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		if req.URL.Path != "/" {
			http.NotFound(w, req)
			return
		}
		fmt.Fprint(w, IndexHtml)
	})

	http.ListenAndServe(fmt.Sprintf(":%d", *port), mux)
}
