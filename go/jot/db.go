package jot

type Database struct {
	Entries []Entry
}

type Entry struct {
	Message string `json:"message"`
	From    string `json:"from"`
}

// Update last message.
func (db *Database) UpdateLast(message string, from string) error {
	db.Entries[0] = Entry{message, from}
	return nil
}

// Fetch last message.
func (db *Database) FetchLast() (Entry, error) {
	return db.Entries[0], nil
}

// NewDB returns a new database object.
func NewDB() *Database {
	entries := make([]Entry, 1)
	entries[0] = Entry{
		Message: "the first moment of contact is the strongest",
		From:    "nemo",
	}
	return &Database{entries}
}
