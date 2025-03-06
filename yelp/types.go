package yelp

type GraphqlBody struct {
	Query     string          `json:"query"`
	Variables SearchVariables `json:"variables"`
}

type BusinessSearchResponse struct {
	Data struct {
		Search struct {
			Business []BusinessFromYelp `json:"business"`
		} `json:"search"`
	} `json:"data"`
}

type BusinessDetailResponse struct {
	Data struct {
		Business BusinessDetailFromYelp `json:"business"`
	} `json:"data"`
}

type BusinessFromYelp struct {
	Id           string   `json:"id"`
	Name         string   `json:"name"`
	DisplayPhone string   `json:"display_phone"`
	Location     Location `json:"location"`
	ReviewCount  int      `json:"review_count"`
}

type BusinessDetailFromYelp struct {
	BusinessFromYelp
	Hours   []Hour   `json:"hours"`
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

type HourYelp struct {
	Start string `json:"start"`
	End   string `json:"end"`
	Day   int    `json:"day"`
}

type Hour struct {
	IsOpen bool       `json:"is_open_now"`
	Open   []HourYelp `json:"open"`
}

type User struct {
	ProfileUrl string `json:"profile_url"`
	Name       string `json:"name"`
}

type Location struct {
	FormattedAddress string `json:"formatted_address"`
}
