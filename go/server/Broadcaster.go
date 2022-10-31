package server

import (
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

type Broadcaster struct {
	Connections map[*websocket.Conn]string
	Mutex       sync.RWMutex
}

// Add stores a connection and keeps it alive.
func (caster *Broadcaster) Add(conn *websocket.Conn, id string) {

	caster.Mutex.Lock()
	caster.Connections[conn] = id
	caster.Mutex.Unlock()

	go func() {
		// Auto-remove
		defer func() {
			log.Printf("closing connection for %s", id)
			conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(1000, ""))
			conn.Close()
			caster.Mutex.Lock()
			caster.Connections[conn] = ""
			delete(caster.Connections, conn)
			defer caster.Mutex.Unlock()
		}()

		// Block on read-mesage
		for {
			if _, _, err := conn.ReadMessage(); err != nil {
				break
			}
		}
	}()
}

// Send
func (caster *Broadcaster) Send(conn *websocket.Conn, message []byte) {
	conn.WriteMessage(websocket.TextMessage, message)
}

// SendAll
func (caster *Broadcaster) SendAll(message []byte) {
	caster.Mutex.RLock()
	defer caster.Mutex.RUnlock()
	for conn, _ := range caster.Connections {
		caster.Send(conn, message)
	}
}

// NewBroadcaster returns ...
//
// ...
func NewBroadcaster() *Broadcaster {
	return &Broadcaster{
		Connections: make(map[*websocket.Conn]string, 1000),
	}
}
