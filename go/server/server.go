package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"

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

func (msg *Message) Json() []byte {
	var response TouchResponse
	response.Who = msg.Who
	response.When = msg.When.Unix()
	response.Message = msg.Message
	encoded, _ := json.Marshal(response)
	return encoded
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

// Upgrader!
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// NewServer returns a mux-server with all the routes attached.
func NewServer(waitTime time.Duration) http.Handler {
	caster := NewBroadcaster()
	mux := http.NewServeMux()

	mux.HandleFunc("/holding", func(w http.ResponseWriter, r *http.Request) {

		id, _ := WhoIsFromRequest(r)

		log.Printf("/holding by %s", id)

		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			return
		}

		caster.Add(conn)
		caster.Send(conn, LastMessage.Json())
	})

	mux.HandleFunc("/touch", func(w http.ResponseWriter, r *http.Request) {

		id, _ := WhoIsFromRequest(r)

		log.Printf("/touch by %s", id)

		if r.Method != "POST" {
			return
		}

		r.ParseForm()

		var message Message
		var response MessageResponse

		decoder := json.NewDecoder(r.Body)
		decoder.Decode(&message)

		// Get updates ready
		now := time.Now().UTC()
		// past := time.Now().UTC().Add(-waitTime)
		// lastWho := LastTouch.Who
		// lastWhen := LastTouch.When

		// XXX: Only update if it's a new person

		// Update
		LastMessage.Mutex.Lock()
		LastMessage.Who = id
		LastMessage.When = now
		LastMessage.Message = message.Message
		LastMessage.Mutex.Unlock()

		encoded, _ := json.Marshal(response)
		fmt.Fprint(w, string(encoded))

		go func() {
			caster.SendAll(LastMessage.Json())
		}()
	})

	mux.HandleFunc("/whoami", func(w http.ResponseWriter, r *http.Request) {

		id, _ := WhoIsFromRequest(r)

		log.Printf("/whoami by %s", id)

		var response TouchResponse
		response.Who, _ = WhoIsFromRequest(r)
		response.When = time.Now().UTC().Unix()
		encoded, _ := json.Marshal(response)
		fmt.Fprint(w, string(encoded))
	})

	mux.HandleFunc("/last", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, string(LastMessage.Json()))
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
