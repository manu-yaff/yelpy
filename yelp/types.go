package yelp

type GraphqlBody struct {
	Query     string          `json:"query"`
	Variables SearchVariables `json:"variables"`
}

type BusinessSearchResponse struct {
	Data struct {
		Search struct {
			Business []Business `json:"business"`
		} `json:"search"`
	} `json:"data"`
}

type BusinessDetailResponse struct {
	Data struct {
		Business BusinessDetail `json:"business"`
	} `json:"data"`
}

type Business struct {
	Id           string   `json:"id"`
	Name         string   `json:"name"`
	DisplayPhone string   `json:"display_phone"`
	Location     Location `json:"location"`
	ReviewCount  int      `json:"review_count"`
}

type BusinessDetail struct {
	Business
	Hours   []Open   `json:"hours"`
	Photos  []string `json:"photos"`
	Reviews []Review `json:"reviews"`
}

type Review struct {
	Id          string `json:"id"`
	Rating      int    `json:"rating"`
	Text        string `json:"text"`
	TimeCreated string `json:"time_created"`
	User        User   `json:"user"`
}

type Hour struct {
	Start string `json:"start"`
	End   string `json:"end"`
	Day   int    `json:"day"`
}

type Open struct {
	IsOpen bool   `json:"is_open_now"`
	Open   []Hour `json:"open"`
}

type User struct {
	ProfileUrl string `json:"profile_url"`
	Name       string `json:"name"`
}

type Location struct {
	FormattedAddress string `json:"formatted_address"`
}
