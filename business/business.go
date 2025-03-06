package business

type BusinessEntity struct {
	Id          string
	Name        string
	Phone       string
	Address     string
	ReviewCount int
	Photos      []string
}

type BusinessDetailEntity struct {
	Business BusinessEntity
	IsOpen   bool
	Hours    []Hour
	Reviews  []Review
}

type Hour struct {
	Start string
	End   string
	Day   int
}

type User struct {
	ProfileUrl string
	Name       string
}

type Review struct {
	Id          string
	Rating      string
	Text        string
	TimeCreated string
	User        User
}
