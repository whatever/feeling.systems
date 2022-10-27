package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"sync"
	"time"

	_ "embed"
)

// Message represents a update from a user on the internet.
type Message struct {
	Who     string     `json:"last"`
	When    time.Time  `json:"when"`
	Message string     `json:"message"`
	Nonce   string     `json:"nonce"`
	Mutex   sync.Mutex `json:"-"`
}

// Message represents a update from a user on the internet.
type MessageWrite struct {
	Message string    `json:"message"`
	Who     string    `json:"last"`
	When    time.Time `json:"when"`
	Nonce   string    `json:"nonce"`
}

// MessageResponse represents the server response from a Message.
type MessageResponse struct {
	Success bool   `json:"success"`
	Error   string `json:"error"`
}

// Touch ...
type Touch struct {
	Message string
	Who     string
	When    time.Time
	Mutex   sync.Mutex
}

// TouchResponse ...
type TouchResponse struct {
	Who       string `json:"last"`
	When      int64  `json:"when"`
	Message   string `json:"message"`
	ThoughtOf bool   `json:"thoughtof"`
}

var LastTouch Touch
var LastMessage Message

func WhoIsFromRequest(r *http.Request) (string, error) {
	host, _, _ := net.SplitHostPort(r.RemoteAddr)
	ua := r.UserAgent()
	return host + "//" + ua, nil
}

//go:embed style.css
var StyleCss string

//go:embed feeling-systems.bundled.js
var FeelingSystemsBundledJs string

//go:embed index.html
var IndexHtml string

//go:embed favicon.ico
var FavIconIco string

func NewServer(waitTime time.Duration) http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/touch", func(w http.ResponseWriter, r *http.Request) {

		log.Println("/touch")

		if r.Method != "POST" {
			return
		}

		r.ParseForm()

		var message Message
		var response MessageResponse

		decoder := json.NewDecoder(r.Body)
		decoder.Decode(&message)

		// Get updates ready
		id, _ := WhoIsFromRequest(r)
		now := time.Now().UTC()
		// past := time.Now().UTC().Add(-waitTime)
		// lastWho := LastTouch.Who
		// lastWhen := LastTouch.When

		log.Printf("%s reached out", id)

		// Update
		LastMessage.Mutex.Lock()
		LastMessage.Who = id
		LastMessage.When = now
		LastMessage.Message = message.Message
		LastMessage.Mutex.Unlock()

		log.Println(LastMessage)

		encoded, _ := json.Marshal(response)
		fmt.Fprint(w, string(encoded))
	})

	mux.HandleFunc("/whoami", func(w http.ResponseWriter, r *http.Request) {
		var response TouchResponse
		response.Who, _ = WhoIsFromRequest(r)
		response.When = time.Now().UTC().Unix()
		encoded, _ := json.Marshal(response)
		fmt.Fprint(w, string(encoded))
	})

	mux.HandleFunc("/last", func(w http.ResponseWriter, r *http.Request) {
		var response TouchResponse
		response.Who = LastMessage.Who
		response.When = LastMessage.When.Unix()
		response.Message = LastMessage.Message
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

	mux.HandleFunc("/style.css", func(w http.ResponseWriter, req *http.Request) {
		w.Header().Set("Content-Type", "text/css")
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, StyleCss)
	})

	mux.HandleFunc("/feeling-systems.bundled.js", func(w http.ResponseWriter, req *http.Request) {
		w.Header().Set("Content-Type", "text/javascript")
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, FeelingSystemsBundledJs)
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
