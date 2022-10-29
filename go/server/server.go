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
	Who     string     `json:"who"`
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

// MessageResponse represents the server response from a Message.
type MessageResponse struct {
	Success bool   `json:"success"`
	Error   string `json:"error"`
}

// TouchResponse ...
type TouchResponse struct {
	Who       string `json:"who"`
	When      int64  `json:"when"`
	Message   string `json:"message"`
	ThoughtOf bool   `json:"thoughtof"`
}

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

	LastMessage := Message{
		Who:     "???",
		Message: "𝒸'𝑒𝓈𝓉 𝓁𝒶 𝓋𝒾𝑒\n\nserver\nrestarted",
		When:    time.Now().UTC().Add(-20 * time.Hour),
	}

	caster := NewBroadcaster()
	mux := http.NewServeMux()

	mux.HandleFunc("/holding", func(w http.ResponseWriter, r *http.Request) {

		id, _ := WhoIsFromRequest(r)

		log.Printf("/holding by %s", id)

		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			return
		}

		caster.Add(conn, id)
		caster.Send(conn, LastMessage.Json())
	})

	mux.HandleFunc("/touch", func(w http.ResponseWriter, r *http.Request) {

		if r.Method != "POST" {
			return
		}

		// r.ParseForm()

		var message Message
		decoder := json.NewDecoder(r.Body)
		decoder.Decode(&message)

		id, _ := WhoIsFromRequest(r)
		id = message.Who

		log.Printf("/touch by %s", id)

		var response MessageResponse

		if message.Who != LastMessage.Who {
			LastMessage.Mutex.Lock()
			LastMessage.Who = id
			LastMessage.When = time.Now().UTC()
			LastMessage.Message = message.Message[0:72]
			LastMessage.Mutex.Unlock()
			response.Success = true
		} else {
			response.Success = false
			response.Error = "nvm"
		}

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
