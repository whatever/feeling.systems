package server

import (
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

type Broadcaster struct {
	Connections map[*websocket.Conn]bool
	Mutex       sync.RWMutex
}

// Add stores a connection and keeps it alive.
func (caster *Broadcaster) Add(conn *websocket.Conn) {

	caster.Mutex.Lock()
	caster.Connections[conn] = true
	caster.Mutex.Unlock()

	go func() {
		// Auto-remove
		defer func() {
			log.Println("Closing connection")
			conn.Close()
			caster.Mutex.Lock()
			caster.Connections[conn] = false
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
	for conn, ok := range caster.Connections {
		if ok {
			caster.Send(conn, message)
		}
	}
}

// NewBroadcaster returns ...
//
// ...
func NewBroadcaster() *Broadcaster {
	return &Broadcaster{
		Connections: make(map[*websocket.Conn]bool, 1000),
	}
}
