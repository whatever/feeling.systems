package server

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"sync"
	"time"

	_ "embed"
)

type Touch struct {
	Who   string
	When  time.Time
	Mutex sync.Mutex
}

type TouchResponse struct {
	Who       string `json:"last"`
	When      int64  `json:"when"`
	ThoughtOf bool   `json:"thoughtof"`
}

var LastTouch Touch

func WhoIsFromRequest(r *http.Request) (string, error) {

	host, _, _ := net.SplitHostPort(r.RemoteAddr)
	ua := r.UserAgent()

	return host + "//" + ua, nil
}

//go:embed index.html
var IndexHtml string

//go:embed favicon.ico
var FavIconIco string

func NewServer(waitTime time.Duration) http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/whoami", func(w http.ResponseWriter, r *http.Request) {
		var response TouchResponse
		response.Who, _ = WhoIsFromRequest(r)
		response.When = time.Now().UTC().Unix()
		encoded, _ := json.Marshal(response)
		fmt.Fprint(w, string(encoded))
	})

	mux.HandleFunc("/last", func(w http.ResponseWriter, r *http.Request) {
		var response TouchResponse
		response.Who = LastTouch.Who
		response.When = LastTouch.When.Unix()
		encoded, _ := json.Marshal(response)
		fmt.Fprint(w, string(encoded))
	})

	mux.HandleFunc("/love", func(w http.ResponseWriter, r *http.Request) {

		id, _ := WhoIsFromRequest(r)
		now := time.Now().UTC()
		past := time.Now().UTC().Add(-waitTime)

		lastWho := LastTouch.Who
		lastWhen := LastTouch.When

		// Update
		LastTouch.Mutex.Lock()
		LastTouch.Who = id
		LastTouch.When = now
		LastTouch.Mutex.Unlock()

		// Build response
		resp := TouchResponse{
			Who:       lastWho,
			When:      lastWhen.Unix(),
			ThoughtOf: lastWho != id && lastWhen.After(past),
		}
		encoded, _ := json.Marshal(resp)
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

	return mux
}